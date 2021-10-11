import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
export default function Clima() {
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <View>
        <Text>Textox</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
