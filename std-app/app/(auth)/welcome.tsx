import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

export default function Welcome() {
  const router = useRouter();
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    reg_no: '',
    skills: '',
    linkedin_url: '',
    github_url: '',
    bio: '',
  });

  useEffect(() => {
    if (!session?.user?.email) return;
    
    supabase.from('profiles').select('*').eq('email', session.user.email).then((res) => {
      if (res.data?.[0]) {
        router.replace('/home');
      }
    });
  }, [session]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: session.user.id,
            email: session.user.email,
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim()),
            updated_at: new Date(),
          },
        ]);
      
      if (error) throw error;
      router.replace('/home');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving your profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome! 👋</Text>
      <Text style={styles.subtitle}>Let's set up your profile</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.full_name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, full_name: text }))}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
            placeholder="Choose a username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            style={styles.input}
            value={formData.reg_no}
            onChangeText={(text) => setFormData(prev => ({ ...prev, reg_no: text }))}
            placeholder="Enter your registration number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Skills</Text>
          <TextInput
            style={styles.input}
            value={formData.skills}
            onChangeText={(text) => setFormData(prev => ({ ...prev, skills: text }))}
            placeholder="Enter skills (comma-separated)"
          />
          <Text style={styles.hint}>Example: React Native, TypeScript, Node.js</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>LinkedIn URL</Text>
          <TextInput
            style={styles.input}
            value={formData.linkedin_url}
            onChangeText={(text) => setFormData(prev => ({ ...prev, linkedin_url: text }))}
            placeholder="https://linkedin.com/in/username"
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GitHub URL</Text>
          <TextInput
            style={styles.input}
            value={formData.github_url}
            onChangeText={(text) => setFormData(prev => ({ ...prev, github_url: text }))}
            placeholder="https://github.com/username"
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={formData.bio}
            onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          title={isSubmitting ? "Saving..." : "Complete Profile"}
          onPress={handleSubmit}
          disabled={isSubmitting || !formData.full_name || !formData.username || !formData.reg_no}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
}); 