import React, { useState } from "react";
import { useRoute, useIsFocused } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";

import { Feather } from '@expo/vector-icons';

import { addDoc, collection, doc, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase/config';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const convertDateToString = (number) => {
  const date = new Date(number);
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const resultString = `${day} ${month}, ${year} | ${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes}`;

  return resultString;
};

const renderItem = ({ item }) => (
  <TouchableOpacity activeOpacity={1} style={styles.commentContainer}>
    <View style={styles.avatar}></View>
    <View style={styles.commentInfo}>
      <Text style={styles.commentText}>{item.comment}</Text>
      <Text style={styles.commentDate}>{convertDateToString(item.date)}</Text>
    </View>
  </TouchableOpacity>
);

export default function CommentsScreen() {
  const { params: { photoSource, idPost } } = useRoute();
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]); 

  useEffect(() => {
    getComments();
  }, []);  

  const { login } = useSelector(state => state.auth);  
  
  const createComment = async () => {
    const date = new Date().getTime();
    try {
      
      const refPost = doc(db, "posts", idPost);
      await addDoc(collection(refPost, "comments"), {
        date, login, comment
      });      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
    
  const getComments = async () => {
    try {
      const comments = [];
      const refPost = doc(db, "posts", idPost);

      const snapshot = await getDocs(collection(refPost, 'comments'));
      snapshot.forEach((doc) => comments.push({ ...doc.data(), id: doc.id }));
      
      const sortedCommentsByDate = comments.sort((
        firstComment, secondComment) => firstComment.date - secondComment.date
      );

      setAllComments(sortedCommentsByDate);
    } catch (error) {
      console.log(error);
    }
  };  
  
  const addComment = () => {
    Keyboard.dismiss();
    createComment();    
    setComment('');    
  };
  
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, justifyContent: "flex-end"}}
      behavior={Platform.OS === 'ios' ? 'padding' : "heigth"}
    >
    <View
        style={styles.container}
      >
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoSource }} style={styles.photo} />
        </View>

        <View style={styles.commentsContainer}>
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>

        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder='Коментувати...'
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={value => setComment(value)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={addComment}
            disabled={comment === ""}
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

  commentsContainer: {
    flex: 1,    
  },

  commentContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24
  },

  avatar: {
    width: 28,
    height: 28,
    backgroundColor: "blue",
    borderRadius: 50,
  },

  commentInfo: {
    flex: 1,
    gap: 8,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)" 
  },

  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
  },

  commentDate: {
    color: "#BDBDBD",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
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