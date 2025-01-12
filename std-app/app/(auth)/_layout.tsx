import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import { useRouter } from "expo-router";

const _layout = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Text style={{ fontSize: 16, color: '#333' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/account')}>
          <Text style={{ fontSize: 16, color: '#333' }}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default _layout;
