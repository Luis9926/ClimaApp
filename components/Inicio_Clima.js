import React from "react";
import { StyleSheet, useWindowDimensions, View, useState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import CircleClima from "./CircleClima";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

export default function Inicio_Clima() {
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://37mrrq7phk.execute-api.us-east-2.amazonaws.com/dev/getUltimosRegistros"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <LinearGradient
        colors={["#bddeff", "#4273ca"]}
        style={styles.background}
      />
      <View style={styles.CircleContainer}>
        <Text style={styles.TopText}>07:23 p.m</Text>
        <CircleClima></CircleClima>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
          marginTop: 40,
        }}
      >
        <View style={{ flex: 1, height: 7, backgroundColor: "white" }} />
        <View>
          <Text
            style={{
              width: 220,
              textAlign: "center",
              fontSize: 25,
              color: "white",
            }}
          >
            Ultimos Registros
          </Text>
        </View>
        <View style={{ flex: 1, height: 7, backgroundColor: "white" }} />
      </View>
      <View style={styles.dataClimaContainer}>
        <View style={styles.dataRectangle}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            1 AM
          </Text>
          <View style={{ height: "90%", paddingTop: 200 * 0.95 }}>
            <Ionicons name={"sunny"} size={35} color={"#F3D642"} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              33°C
            </Text>
          </View>
        </View>
        <View style={styles.dataRectangleDark}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            2 AM
          </Text>
          <View style={{ height: "90%", paddingTop: 200 * 0.99 }}>
            <Ionicons name={"sunny"} size={35} color={"#F3D642"} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              33°C
            </Text>
          </View>
        </View>
        <View style={styles.dataRectangle}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            3 AM
          </Text>
          <View style={{ height: "90%", paddingTop: 200 * 0.8 }}>
            <Ionicons name={"sunny"} size={35} color={"#F3D642"} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              33°C
            </Text>
          </View>
        </View>
        <View style={styles.dataRectangleDark}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            4 AM
          </Text>
          <View style={{ height: "90%", paddingTop: 200 * 0.7 }}>
            <Ionicons name={"sunny"} size={35} color={"#F3D642"} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              33°C
            </Text>
          </View>
        </View>
        <View style={styles.dataRectangle}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            5 AM
          </Text>
          <View style={{ height: "90%", paddingTop: 200 * 0.5 }}>
            <Ionicons name={"sunny"} size={35} color={"#F3D642"} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
              }}
            >
              33°C
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "120%",
  },
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
    flex: 1,
  },
  TopText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 15,
    color: "#FFF",
  },
  screen: {
    height: "100%",
  },
  dataClimaContainer: {
    flex: 1,
    flexDirection: "row",

    marginBottom: 20,
  },
  dataRectangle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#424242",
    marginLeft: 4,
    marginRight: 4,
    alignItems: "center",
  },
  dataRectangleDark: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#585858",
    marginLeft: 1,
    marginRight: 1,
    alignItems: "center",
  },
});
