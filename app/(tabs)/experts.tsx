import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { ArrowLeft, Filter, Calendar, MessageCircle, Video } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  avatar: string;
  flag?: string;
  availableSlots: string[];
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Rimsha Ahmed',
    specialty: 'OB-GYN',
    languages: ['English'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    availableSlots: ['10:40 pm', '10:50 pm', '11:00 pm', '11:10 pm']
  },
  {
    id: '2',
    name: 'Susana Vega',
    specialty: 'Midwife',
    languages: ['Spanish', 'English'],
    avatar: 'https://images.unsplash.com/photo-1594824388852-8a7b1b4b8b8b?w=150&h=150&fit=crop&crop=face',
    availableSlots: ['9:20 pm']
  },
  {
    id: '3',
    name: 'Sankalpa Suryawanshi',
    specialty: 'OB-GYN',
    languages: ['Hindi', 'Marathi', 'English'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    flag: '🇮🇳',
    availableSlots: ['8:00 pm', '8:10 pm', '8:20 pm', '8:30 pm']
  }
];

export default function ExpertsScreen() {
  const router = useRouter();

  const TARGET_PHONE_E164 = '918118898113'; // +91 8118898113 in E.164 without plus

  const openWhatsApp = (provider: Provider, timeSlot?: string) => {
    const message = timeSlot 
      ? `Hi Dr. ${provider.name}, I'd like to book a consultation for ${timeSlot}. I found you through easeMyPreg app.`
      : `Hi Dr. ${provider.name}, I'd like to book a consultation. I found you through easeMyPreg app.`;

    // Target specific phone for chat
    const url = `whatsapp://send?phone=${TARGET_PHONE_E164}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      // Fallback to web WhatsApp if app is not installed
      const webUrl = `https://wa.me/${TARGET_PHONE_E164}?text=${encodeURIComponent(message)}`;
      Linking.openURL(webUrl);
    });
  };

  const startWhatsAppVideoCall = () => {
    // Try undocumented video call scheme first (may fail on some devices)
    const tryVideo = `whatsapp://video?phone=${TARGET_PHONE_E164}`;
    const tryVoice = `whatsapp://call?phone=${TARGET_PHONE_E164}`;
    const tryDialer = `tel:+${TARGET_PHONE_E164}`;

    Linking.openURL(tryVideo)
      .catch(() => Linking.openURL(tryVoice))
      .catch(() => Linking.openURL(tryDialer))
      .catch(() => {});
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>12:30</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.statusText}>5G</Text>
          <Text style={styles.statusText}>📶</Text>
          <Text style={styles.statusText}>18%</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available providers</Text>
        <TouchableOpacity>
          <Filter size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSection}>
        <TouchableOpacity style={styles.dateButton}>
          <Calendar size={16} color="#10B981" />
          <Text style={styles.dateText}>Today, {getCurrentDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>BOOK A VIDEO CALL</Text>

      {/* Providers List */}
      <ScrollView style={styles.providersList} showsVerticalScrollIndicator={false}>
        {providers.map((provider) => (
          <View key={provider.id} style={styles.providerCard}>
            <View style={styles.providerInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: provider.avatar }} style={styles.avatar} />
              </View>
              <View style={styles.providerDetails}>
                <View style={styles.nameRow}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  {provider.flag && <Text style={styles.flag}>{provider.flag}</Text>}
                </View>
                <Text style={styles.specialty}>{provider.specialty}</Text>
                <Text style={styles.languages}>
                  Speaks {provider.languages.join(', ')}
                </Text>
              </View>
            </View>

            {/* Time Slots */}
            <View style={styles.timeSlotsContainer}>
              {provider.availableSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.timeSlot}
                  onPress={() => openWhatsApp(provider, slot)}
                >
                  <Text style={styles.timeSlotText}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Actions Row */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={startWhatsAppVideoCall}
              >
                <Video size={16} color="#ffffff" />
                <Text style={styles.videoText}>Video Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => openWhatsApp(provider)}
              >
                <MessageCircle size={16} color="#25D366" />
                <Text style={styles.whatsappText}>WhatsApp Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* View All Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  providersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  providerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  providerDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  flag: {
    fontSize: 16,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  languages: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  timeSlot: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#25D366',
  },
  whatsappText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#25D366',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  videoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 8,
  },
  videoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
  },
  viewAllButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});
