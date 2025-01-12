import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from("profiles") 
      .select("*");
    
    if (error) {
      console.error("Error fetching friends:", error);
    } else {
      const session = await supabase.auth.getSession();
      const curFri = data.filter((item) => item.email !== session?.data.session?.user.email);
      setFriends(curFri);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendUsername}>{item.username}</Text>
            <Text style={styles.friendSkills}>{item.skills?.join(', ') || 'No skills listed'}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#e0f7fa',
    padding: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#00796b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  friendItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  friendUsername: {
    fontSize: 20,
    color: '#004d40',
    fontWeight: '600',
  },
  friendSkills: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff7043',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});