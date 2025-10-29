import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, X, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type DayEntry = {
  symptoms: string[];
  severity: number; // 1-5
  notes?: string;
};

const STORAGE_KEY = 'symptomCalendarEntries';

const SYMPTOM_TAGS = [
  'Hot Flashes',
  'Night Sweats',
  'Mood Changes',
  'Sleep Issues',
  'Vaginal Dryness',
  'Brain Fog',
  'Fatigue',
  'Headache',
];

export default function SymptomCalendarScreen() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [entries, setEntries] = useState<Record<string, DayEntry>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEntries(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  const monthLabel = useMemo(() => {
    return currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }, [currentMonth]);

  const daysGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ date: Date | null }> = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d) });
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push({ date: null });
    return cells;
  }, [currentMonth]);

  const formatKey = (d: Date) => d.toISOString().slice(0, 10);

  const openDay = (d: Date) => {
    const key = formatKey(d);
    setSelectedDate(key);
    const entry = entries[key];
    setSelectedSymptoms(entry?.symptoms ?? []);
    setSeverity(entry?.severity ?? 3);
    setNotes(entry?.notes ?? '');
    setModalVisible(true);
  };

  const toggleSymptom = (tag: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const saveEntry = async () => {
    if (!selectedDate) return;
    const updated: Record<string, DayEntry> = {
      ...entries,
      [selectedDate]: { symptoms: selectedSymptoms, severity, notes: notes.trim() || undefined },
    };
    // Remove empty entries
    if (updated[selectedDate].symptoms.length === 0 && !updated[selectedDate].notes && !updated[selectedDate].severity) {
      delete updated[selectedDate];
    }
    setEntries(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setModalVisible(false);
  };

  const clearEntry = async () => {
    if (!selectedDate) return;
    const updated = { ...entries };
    delete updated[selectedDate];
    setEntries(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setModalVisible(false);
  };

  const goPrev = () => {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };
  const goNext = () => {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };

  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <CalendarIcon size={20} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Calendar & Tracking</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={goPrev} style={styles.navBtn}>
            <ChevronLeft size={18} color="#5A3A5A" />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <TouchableOpacity onPress={goNext} style={styles.navBtn}>
            <ChevronRight size={18} color="#5A3A5A" />
          </TouchableOpacity>
        </View>

        {/* Weekday Header */}
        <View style={styles.weekRow}>
          {weekdayLabels.map((wd) => (
            <Text key={wd} style={styles.weekday}>{wd}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.grid}>
          {daysGrid.map((cell, idx) => {
            if (!cell.date) return <View key={idx} style={styles.cell} />;
            const key = formatKey(cell.date);
            const entry = entries[key];
            const hasEntry = !!entry;
            return (
              <TouchableOpacity key={idx} style={[styles.cell, hasEntry && styles.cellWithEntry]} onPress={() => openDay(cell.date!)}>
                <Text style={styles.cellText}>{cell.date.getDate()}</Text>
                {hasEntry && (
                  <View style={styles.dotRow}>
                    <View style={[styles.dot, { backgroundColor: '#EC4899' }]} />
                    {entry.severity ? <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} /> : null}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#EC4899' }]} />
            <Text style={styles.legendText}>Logged symptoms</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Severity added</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedDate}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
            <X size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.sectionTitle}>Select Symptoms</Text>
          <View style={styles.tagsWrap}>
            {SYMPTOM_TAGS.map((tag) => {
              const active = selectedSymptoms.includes(tag);
              return (
                <TouchableOpacity key={tag} onPress={() => toggleSymptom(tag)} style={[styles.tag, active && styles.tagActive]}>
                  <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
                  {active && <Check size={14} color="#FFFFFF" />}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Severity (1-5)</Text>
          <View style={styles.severityRow}>
            {[1,2,3,4,5].map((n) => (
              <TouchableOpacity key={n} style={[styles.severityDot, severity === n && styles.severityDotActive]} onPress={() => setSeverity(n)}>
                <Text style={[styles.severityNum, severity === n && styles.severityNumActive]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Notes</Text>
          <TextInput
            placeholder="Add any notes (optional)"
            placeholderTextColor="#9CA3AF"
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.clearBtn} onPress={clearEntry}>
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={saveEntry}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F7' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#8B5A8F', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16,
  },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  content: { padding: 20 },

  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  navBtn: { padding: 8, backgroundColor: '#F9F5F9', borderRadius: 8, borderWidth: 1, borderColor: '#E8D5E8' },
  monthLabel: { fontSize: 18, fontWeight: '700', color: '#5A3A5A' },

  weekRow: { flexDirection: 'row', marginBottom: 6 },
  weekday: { flex: 1, textAlign: 'center', fontSize: 12, color: '#6B7280', fontWeight: '600' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#F3F4F6', borderRadius: 12, overflow: 'hidden' },
  cell: { width: `${100/7}%`, aspectRatio: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6', padding: 6 },
  cellWithEntry: { backgroundColor: '#FFF5F7' },
  cellText: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  dotRow: { flexDirection: 'row', gap: 4, marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  legend: { flexDirection: 'row', gap: 16, marginTop: 12 },
  legendItem: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  legendText: { fontSize: 12, color: '#6B7280' },

  modalHeader: { backgroundColor: '#8B5A8F', paddingTop: 50, paddingBottom: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },

  modalContent: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 10 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F9F5F9', borderWidth: 1, borderColor: '#E8D5E8' },
  tagActive: { backgroundColor: '#8B5A8F', borderColor: '#8B5A8F' },
  tagText: { fontSize: 12, color: '#5A3A5A', fontWeight: '600' },
  tagTextActive: { color: '#FFFFFF' },

  severityRow: { flexDirection: 'row', gap: 8 },
  severityDot: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F9F5F9', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E8D5E8' },
  severityDotActive: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  severityNum: { fontSize: 14, color: '#5A3A5A', fontWeight: '700' },
  severityNumActive: { color: '#FFFFFF' },

  notesInput: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#E8D5E8', padding: 12, minHeight: 90, color: '#111827' },

  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 16 },
  clearBtn: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB' },
  clearBtnText: { fontSize: 14, fontWeight: '700', color: '#374151' },
  saveBtn: { flex: 1, backgroundColor: '#8B5A8F', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
});
