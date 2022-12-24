import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";

export default function AppButton({ title, onPress, active }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={
          active
            ? styles.appButtonContainer
            : {
                ...styles.appButtonContainer,
                backgroundColor: "#F6F6F6",
                color: "#BDBDBD",
              }
        }
        onPress={onPress}
      >
        <Text
          style={
            active
              ? styles.appButtonText
              : {
                  ...styles.appButtonText,
                  color: "#BDBDBD",
                }
          }
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
  },
  appButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
