import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CircleClima from "./CircleClima";
import { StatusBar } from "react-native";
export default function Inicio_Clima() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <View style={styles.CircleContainer}>
        <Text style={styles.TopText}>07:23 p.m</Text>
        <CircleClima></CircleClima>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BigcircleText: {
    fontSize: 40,
    paddingBottom: 10,
  },
  SmallcircleText: {
    fontSize: 15,
  },
  TextContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  CircleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  TopText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 15,
    color: "#FFF",
  },
  screen: {
    backgroundColor: "#83AFE2",
    height: "100%",
  },
});
