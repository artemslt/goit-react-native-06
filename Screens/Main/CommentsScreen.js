// import { useState, useEffect } from "react";
// import {
//   Image,
//   Text,
//   ScrollView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
// } from "react-native";

// import SendIcon from "../../assets/imgs/Vector.svg";

// const CommentsScreen = ({ route }) => {
//   console.log(route.params.photo);

//   return (
//     // <ScrollView>
//     <View
//       style={{
//         flex: 1,
//         paddingHorizontal: 16,
//         marginTop: 8,
//         justifyContent: "space-between",
//       }}
//     >
//       <View>
//         <Image
//           source={{ uri: route.params.photo }}
//           style={{ height: 240, borderRadius: 8 }}
//         />
//       </View>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "flex-start",
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginVertical: 8,
//           }}
//         >
//           <Image
//             source={require("../../assets/imgs/UserPhoto.jpg")}
//             style={{
//               width: 34,
//               height: 34,
//               borderRadius: 100,
//               marginRight: 8,
//             }}
//           />
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: "rgba(0, 0, 0, 0.03)",
//               padding: 16,
//               fontFamily: "Roboto-Regular",
//               borderTopRightRadius: 6,
//               borderBottomRightRadius: 6,
//               borderBottomLeftRadius: 6,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 13,
//                 lineHeight: 18,
//                 color: "#212121",
//               }}
//             >
//               loreee ghbsdfsdfsdf
//             </Text>
//             <Text
//               style={{
//                 fontSize: 10,
//                 lineHeight: 12,
//                 color: "#DBDBDB",
//                 textAlign: "right",
//               }}
//             >
//               Date date date
//             </Text>
//           </View>
//         </View>
//       </View>
//       <View>
//         <TextInput
// style={{
//   position: "relative",
//   fontFamily: "Roboto-Medium",
//   fontSize: 16,
//   lineHeight: 19,
//   color: "#BDBDBD",
//   backgroundColor: "#F6F6F6",
//   borderWidth: 1,
//   borderColor: "#E8E8E8",

//   borderRadius: 100,
//   padding: 16,
//   marginBottom: 16,
// }}
//         />
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             top: 14,
//             right: 16,
//             backgroundColor: "#FF6C00",
//             width: 34,
//             height: 34,
//             borderRadius: 16,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <SendIcon />
//         </TouchableOpacity>
//       </View>
//     </View>
//     // </ScrollView>
//   );
// };

// export default CommentsScreen;

import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { fsbase } from "../../firebase/config";

import SendIcon from "../../assets/imgs/Vector.svg";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllcomments] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { login, myImage } = useSelector((state) => state.auth);

  //   завантаження коментарів на firebase
  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const dbRef = doc(fsbase, "posts", postId);
      await addDoc(collection(dbRef, "comments"), {
        comment,
        login,
        date,
        time,
      });
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const createComment = () => {
    sendCommentToServer();
    setComment("");
    keyboardHide();
  };

  const getAllComents = async () => {
    try {
      const dbRef = doc(fsbase, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) =>
        setAllcomments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      console.log(`getAllComents`, error);
    }
  };

  useEffect(() => {
    getAllComents();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  // const renderItem =

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 320 : 30 }}
      >
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />

        <FlatList
          data={allComments}
          keyExtractor={allComments.id}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  marginTop: 32,
                  flexDirection: "row",
                }}
              >
                <View style={styles.comment}>
                  <Text style={{ fontSize: 16 }}>User: {login}</Text>
                  <Text>{item.comment}</Text>
                  <Text style={styles.date}>
                    {item.date}|{item.time}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        <View>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add comment"
            onFocus={() => setIsShowKeyboard(true)}
            style={{
              position: "relative",
              fontFamily: "Roboto-Medium",
              fontSize: 16,
              lineHeight: 19,
              color: "#BDBDBD",
              backgroundColor: "#F6F6F6",
              borderWidth: 1,
              borderColor: "#E8E8E8",

              borderRadius: 100,
              padding: 16,
            }}
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              backgroundColor: "#FF6C00",
              width: 34,
              height: 34,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={createComment}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  imageIcon: {
    height: 38,
    width: 38,
    borderRadius: 100,
  },
  comment: {
    marginLeft: 16,

    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "#E8E8E8",
  },
  sendIcon: {
    position: "absolute",

    right: 15,
    bottom: 8,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
});

export default CommentsScreen;
