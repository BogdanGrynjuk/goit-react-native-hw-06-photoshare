import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useSelector } from "react-redux";

import { collection, getDocs, doc } from 'firebase/firestore'; 
import { db } from '../../firebase/config';

export default function PostsScreen() {
  const {login, email, avatar} = useSelector(state => state.auth)
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    getPosts();

    const timerId = setInterval(() => {
      
      getPosts();
      
    }, 6000);
   
    return () => clearInterval(timerId);
    
  }, []);


  const getPosts = async () => {
    try {
      const allPosts = [];

      const snapshot = await getDocs(collection(db, 'posts'));
      snapshot.forEach((doc) => allPosts.push({ ...doc.data(), id: doc.id }));

      const sortedPostsByDate = allPosts.sort(
        (firstPost, secondPost) => firstPost.date - secondPost.date
      );

      setPosts(sortedPostsByDate);
    } catch (error) {
      console.log(error);
    }
  };

  // const getNumberOfComments = async () => {
  //   try {
  //     const comments = [];
  //     const refPost = doc(db, "posts", idPost);

  //     const snapshot = await getDocs(collection(refPost, 'comments'));
  //     snapshot.forEach((doc) => comments.push({ ...doc.data() }));
      
  //     setCounterComments(comments.length);      
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };  
  
  const navigation = useNavigation();  

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
        {/* link to map */}
        <TouchableOpacity
          style={styles.postLink}
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
      <View style={styles.header}>
        <View style={styles.wrapPhoto}>
          {avatar && <Image source={{ uri: avatar }}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover"
            }} />}
          
        </View>
        <View>
          <Text style={styles.textName}>{login}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>

      <View style={styles.posts}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted={true}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 32,
  },

  wrapPhoto: {
    marginRight: 8,
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden"
  },

  textName: {
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 15,
    color: "#212121",
  },

  textEmail: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },

  posts: {
    paddingTop: 32,
    paddingBottom: 64,
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
    justifyContent: "space-between",
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