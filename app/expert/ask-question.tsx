import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MessageCircle, Send, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function AskQuestionScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'symptoms', label: 'Symptoms', color: '#EF4444' },
    { id: 'hrt', label: 'HRT', color: '#EC4899' },
    { id: 'lifestyle', label: 'Lifestyle', color: '#10B981' },
    { id: 'mental-health', label: 'Mental Health', color: '#6366F1' },
    { id: 'other', label: 'Other', color: '#8B7280' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask a Question</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <MessageCircle size={24} color="#10B981" />
          <Text style={styles.infoText}>
            Our menopause specialists will respond within 24 hours
          </Text>
        </View>

        <Text style={styles.label}>Select Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                category === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
              ]}
              onPress={() => setCategory(cat.id)}
            >
              <Text style={[
                styles.categoryText,
                category === cat.id && { color: '#FFFFFF' }
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Your Question</Text>
        <TextInput
          style={styles.questionInput}
          placeholder="Describe your symptoms, concerns, or questions in detail..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          value={question}
          onChangeText={setQuestion}
        />

        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!question || !category) && styles.submitButtonDisabled
          ]}
          disabled={!question || !category}
        >
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Send Question</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  header: {
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  questionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    padding: 16,
    fontSize: 15,
    color: '#1F2937',
    minHeight: 180,
    marginBottom: 24,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

