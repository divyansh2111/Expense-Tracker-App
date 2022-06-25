import { Button, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

const ErrorScreen = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An Error has Occured !!!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button
        onPress={onConfirm}
        color={GlobalStyles.colors.error50}
        title="Go Back"
      />
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.error500,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
