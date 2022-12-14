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

export default function AppButton({ title, onPress }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
        <Text style={styles.appButtonText}>{title}</Text>
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
