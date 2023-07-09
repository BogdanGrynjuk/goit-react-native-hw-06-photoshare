import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      {/* photo */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.photoSource }} style={styles.photo} />
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
              { photoSource: item.photoSource }
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

    </View>
  );  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.wrapPhoto}></View>
        <View>
          <Text style={styles.textName}>Natali Romanova</Text>
          <Text style={styles.textEmail}>email@example.com</Text>
        </View>
      </View>

      <View style={styles.posts}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />        

      </View>
    </View>
  );
}

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
  },

  textName: {
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 15,
    textAlign: "center",
    color: "#212121",
  },

  textEmail: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13,
    textAlign: "center",
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