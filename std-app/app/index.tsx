import { Text, View, Image, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <Image
        src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fschool%2Fbv-raju-institute-of-technology-bvrit-%2F&psig=AOvVaw2yIn5vW7ljZfooY5vpRLJf&ust=1736872464225000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKinn6SQ84oDFQAAAAAdAAAAABAE"}
        style={{
          width: 200,
          height: 60,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />
      
      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
      }}>
        Discover Your{"\n"}Peer Inside{"\n"}Your College
      </Text>

      <Text style={{
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 30,
      }}>
        Find Some minded people{"\n"}all over your college
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: "#ddd",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{color: "#444"}}>continue with google</Text>
      </TouchableOpacity>
    </View>
  );
}
