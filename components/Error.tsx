// Reusable Error component

import { StyleSheet, Text, View } from "react-native";

interface ErrorProp {
  error: string;
}

const Error: React.FC<ErrorProp> = ({ error }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Error: {error}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
