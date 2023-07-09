import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

// import icons
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* background */}
      <ImageBackground
        source={require("../../assets/images/image-bg.jpg")}       
        style={styles.imageBackground}
      >

        <View style={styles.wrapper}>

          <View style={styles.avatar}>
            <TouchableHighlight
              style={styles.avatarBtn}
              activeOpacity={0.8}
              underlayColor="#ffffff"
            >
              <Feather name="x-circle" size={25} color="#BDBDBD" />
            </TouchableHighlight>
          </View>

          <TouchableOpacity
            style={styles.btnLogOut}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" size={25} color="#BDBDBD" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Natali Romanova</Text>
          </View>

        </View>

      </ImageBackground>
      
    </View>
  );
};

const styles = StyleSheet.create({

   container: {
    flex: 1,
    backgroundColor: '#fff',   
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  wrapper: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 16,
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },

  avatar: {
    position: "relative",
    top: 0,
    left: "50%",
    width: 120,
    height: 120,
    marginLeft: -60,
    marginTop: -60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  avatarBtn: {
    position: "absolute",      
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    marginBottom: 12.5,
    marginRight: -12.5,
    borderRadius: 16,
    backgroundColor: "#FFFFFF"
  },

  btnLogOut: {
    position: "absolute",
    top: 22,
    right: 16,    
  },

  title: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",  
  }, 
});