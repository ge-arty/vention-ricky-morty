// Reusable Spinner component

import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface SpinnerProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

//  Default props values
const Spinner: React.FC<SpinnerProps> = ({
  message = "Loading...",
  size = "large",
  color = "#0000ff",
}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
    {message && <Text style={styles.message}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Spinner;
