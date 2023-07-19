import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { db } from '../../firebase/config';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

// import icons
import { Feather } from '@expo/vector-icons';

import { collection, query, where, getDocs } from "firebase/firestore";

import { authSignOutUser } from '../../redux/auth/authOpration';
  
export default function ProfileScreen() {
  const { login, userId } = useSelector(state => state.auth);
  const [userPosts, setUserPosts] = useState();

  // useEffect(() => {
  //   getUserPosts();
  // }, []);

  const getUserPosts = async () => {
    try {
      const posts = [];

      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));

      const sortedPostsByDate = posts.sort(
        (firstPost, secondPost) => firstPost.date - secondPost.date
      );
      
      setUserPosts(sortedPostsByDate);
    } catch (error) {
      console.log(error);
    } 
  };
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  { isFocused && getUserPosts() };

  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1} style={styles.post}>
      {/* photo */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
      </View>
      {/* label */}
      <Text style={styles.postLabel}>{item.label}</Text>
      {/* links */}
      <View style={styles.postControls}>
        {/* link to comments */}
        <TouchableOpacity
          style={styles.postLink}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(
              "Comments",
              { photoSource: item.photo, idPost: item.id }
            )
          }}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" style={{ transform: [{ rotateY: '180deg' }] }} />
          <Text style={{ ...styles.textLink, color: "#BDBDBD", textDecorationLine: "none" }}>0</Text>
        </TouchableOpacity>
        {/* likes */}
        <View style={styles.postLink}>          
          <Feather name="thumbs-up" size={24} color="#FF6C00" />
          <Text style={{ ...styles.textLink, textDecorationLine: "none" }}>200</Text>
        </View>
        {/* link to map */}
        <TouchableOpacity
          style={{...styles.postLink, flex: 1, justifyContent: "flex-end"}}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(
              "Map",
              { location: item.location, label: item.label, place: item.place }
            )
          }}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.textLink}>{item.place}</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );  


  
  
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
            onPress={() => dispatch(authSignOutUser())}
          >
            <Feather name="log-out" size={25} color="#BDBDBD" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>{login}</Text>
          </View>

          <View style={styles.posts}>
          <FlatList
            data={userPosts}            
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            inverted={true}
          />

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
  
  posts: {
    flex:1,
    paddingTop: 32,
  },

   post: {
    marginBottom: 32,
  },

  photoContainer: {
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
  
  postLabel: {
    marginTop: 8,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  postControls: {
    marginTop: 11,
    flexDirection: "row",
    gap: 24    
  },
  
  postLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textLink: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: 'underline',
  },
});