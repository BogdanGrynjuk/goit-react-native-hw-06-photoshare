import { useRoute } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Feather } from '@expo/vector-icons';

export default function CommentsScreen() {
  const { params: { photoSource } } = useRoute();

  console.log("photoSource: ", photoSource)
  
  return (
    <KeyboardAvoidingView 
      style={{ flex:1, justifyContent: "flex-end"}}
      behavior={Platform.OS === 'ios' ? 'padding' : "heigth"}
    >
    <View
        style={styles.container}
      >
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoSource }} style={styles.photo} />
        </View>

        <View style={{flex: 1, backgroundColor: "red"}}>
          <Text>Comment box</Text>
        </View>

        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder='Коментувати...'
            placeholderTextColor="#BDBDBD"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
          >
            <Feather name="arrow-up" size={24} color="#ffffff" />

          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 32,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "flex-end"
    
  },

  photoContainer: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },

  photo: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },

  input: {
    padding: 16,
    paddingRight: 60,
    marginBottom: 16,    
    textAlign: 'left',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,   
    borderRadius: 50,
    borderColor: "#E8E8E8"
  },

  btn: {
    position: "absolute",
    top: 15,
    right: 16,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  }


})