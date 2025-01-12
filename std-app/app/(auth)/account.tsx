import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Account = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, username, reg_no, skills, linkedin_url, github_url, bio, updated_at");
    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6347" />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {profile ? (
            <>
              <Text style={styles.header}>Account Information</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{profile.email}</Text>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{profile.full_name}</Text>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{profile.username}</Text>
              <Text style={styles.label}>Registration Number:</Text>
              <Text style={styles.value}>{profile.reg_no}</Text>
              <Text style={styles.label}>Skills:</Text>
              <Text style={styles.value}>{profile.skills?.join(', ') || 'None'}</Text>
              <Text style={styles.label}>LinkedIn:</Text>
              <Text style={styles.value}>{profile.linkedin_url || 'Not provided'}</Text>
              <Text style={styles.label}>GitHub:</Text>
              <Text style={styles.value}>{profile.github_url || 'Not provided'}</Text>
              <Text style={styles.label}>Bio:</Text>
              <Text style={styles.value}>{profile.bio || 'No bio available'}</Text>
              <Text style={styles.label}>Last Updated:</Text>
              <Text style={styles.value}>{new Date(profile.updated_at).toLocaleString()}</Text>
            </>
          ) : (
            <Text style={styles.value}>No profile found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
});

export default Account;
