import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Star, User, Calendar, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Gynecologist',
    experience: '15 years',
    rating: 4.9,
    consultations: '2500+',
    availability: 'Today, 4:00 PM',
    price: '₹800',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Dr. Anjali Mehta',
    specialization: 'Nutritionist',
    experience: '10 years',
    rating: 4.8,
    consultations: '1800+',
    availability: 'Tomorrow, 10:00 AM',
    price: '₹500',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    status: 'Available'
  },
  {
    id: 3,
    name: 'Dr. Rahul Desai',
    specialization: 'Therapist',
    experience: '12 years',
    rating: 4.7,
    consultations: '1200+',
    availability: 'Today, 6:00 PM',
    price: '₹600',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
    status: 'Available'
  },
  {
    id: 4,
    name: 'Dr. Sunita Patel',
    specialization: 'Yoga Expert',
    experience: '8 years',
    rating: 4.9,
    consultations: '900+',
    availability: 'Tomorrow, 2:00 PM',
    price: '₹400',
    image: 'https://images.unsplash.com/photo-1594824388852-8a7b4b4b4b4b?w=100&h=100&fit=crop&crop=face',
    status: 'Available'
  }
];

const categories = ['All', 'Gynecologist', 'Nutritionist', 'Therapist', 'Yoga Expert'];

export default function ExpertScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Expert Consultations</Text>
        <Text style={styles.subtitle}>Connect with certified specialists</Text>
      </View>

      {/* Special Offer Banner */}
      <View style={styles.offerBanner}>
        <View style={styles.offerBadge}>
          <Text style={styles.offerBadgeText}>SPECIAL OFFER</Text>
        </View>
        <Text style={styles.offerTitle}>First Consultation Free!</Text>
        <Text style={styles.offerDescription}>Book your first expert consultation at no cost</Text>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimButtonText}>Claim Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Book Consultation Section */}
      <View style={styles.consultationSection}>
        <Text style={styles.sectionTitle}>Book Consultation</Text>
        
        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Doctor Cards */}
      <View style={styles.doctorsSection}>
        {doctors
          .filter(doctor => selectedCategory === 'All' || doctor.specialization === selectedCategory)
          .map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <View style={styles.doctorHeader}>
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
                </View>
                <View style={styles.availableTag}>
                  <Text style={styles.availableTagText}>{doctor.status}</Text>
                </View>
              </View>

              <View style={styles.doctorStats}>
                <View style={styles.statItem}>
                  <User size={16} color="#6b7280" />
                  <Text style={styles.statText}>{doctor.experience}</Text>
                </View>
                <View style={styles.statItem}>
                  <Star size={16} color="#6b7280" />
                  <Text style={styles.statText}>{doctor.rating}</Text>
                </View>
                <View style={styles.statItem}>
                  <Calendar size={16} color="#6b7280" />
                  <Text style={styles.statText}>{doctor.consultations}</Text>
                </View>
              </View>

              <View style={styles.availabilitySection}>
                <Text style={styles.availabilityLabel}>Next Available</Text>
                <Text style={styles.availabilityTime}>{doctor.availability}</Text>
              </View>

              <View style={styles.doctorFooter}>
                <View style={styles.priceSection}>
                  <Text style={styles.priceText}>{doctor.price}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7F7',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  offerBanner: {
    margin: 20,
    backgroundColor: '#EC4899',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
  },
  offerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F472B6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  offerBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
    opacity: 0.9,
  },
  claimButton: {
    backgroundColor: '#F472B6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  claimButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  consultationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  categoryScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  categoryContainer: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategoryButton: {
    backgroundColor: '#6b7280',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedCategoryButtonText: {
    color: '#ffffff',
  },
  doctorsSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  availableTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  doctorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  availabilitySection: {
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  availabilityTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSection: {
    flex: 1,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  bookButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
