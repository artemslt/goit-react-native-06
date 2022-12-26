import { useState, useEffect } from "react";
import {
  Image,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import SendIcon from "../../assets/imgs/Vector.svg";

const CommentsScreen = ({ route }) => {
  console.log(route.params.photo);

  return (
    // <ScrollView>
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Image
          source={{ uri: route.params.photo }}
          style={{ height: 240, borderRadius: 8 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 8,
          }}
        >
          <Image
            source={require("../../assets/imgs/UserPhoto.jpg")}
            style={{
              width: 34,
              height: 34,
              borderRadius: 100,
              marginRight: 8,
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              padding: 16,
              fontFamily: "Roboto-Regular",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                color: "#212121",
              }}
            >
              loreee ghbsdfsdfsdf
            </Text>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 12,
                color: "#DBDBDB",
                textAlign: "right",
              }}
            >
              Date date date
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TextInput
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
            marginBottom: 16,
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
        >
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default CommentsScreen;
