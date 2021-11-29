import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import CircleClima from "./CircleClima";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import firebase from "../firebase/firebaseConfig";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Inicio_Clima() {
  const [dataClima, setDataClima] = useState([]);

  const [selectedRegistro, setSelectedRegistro] = useState(null);

  const [reseted, setReseted] = useState(0);

  const [date, setDate] = useState();

  const [configClima, setConfigClima] = useState("C");

  useEffect(async () => {
    var date = moment().format("MMMM Do HH:m");

    setDate(date);

    var confClima = await AsyncStorage.getItem("configClima");
    console.log(confClima);

    if (confClima != null) {
      await setConfigClima(confClima);
    }

    try {
      firebase.getClimaData().then((res) => {
        res = Object.entries(res);
        res = res.slice(1).slice(-5);

        res.forEach((element) => {
          if (configClima == "F") {
            element[1].Temperatura = element[1].Temperatura * 1.8 + 32;
          }
        });

        setDataClima(res);
        setSelectedRegistro(res[res.length - 1]);
        console.log("DATA CLIMA SET", res);

        console.log("CONFIG", configClima);
      });
    } catch (error) {
      console.log(error);
    }

    //firebase.saveClimaRegistro();
  }, []);

  useEffect(() => {
    try {
      firebase.getClimaData().then((res) => {
        res = Object.entries(res);
        res = res.slice(1).slice(-5);

        res.forEach((element) => {
          if (configClima == "F") {
            element[1].Temperatura = element[1].Temperatura * 1.8 + 32;
          }
        });

        setDataClima(res);
        setSelectedRegistro(res[res.length - 1]);
        console.log("DATA CLIMA SET", res);

        console.log("CONFIG", configClima);
      });
    } catch (error) {
      console.log(error);
    }
  }, [configClima]);
  const CircleLoader = () => {
    if (selectedRegistro == null) {
      return <ActivityIndicator size="large" style={{ paddingTop: 100 }} />;
    } else {
      var tempSel = selectedRegistro;
      tempSel.config = configClima;
      return <CircleClima data={tempSel}></CircleClima>;
    }
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      setReseted(reseted);
    });
  }, []);

  const changeData = (data) => {
    console.log(data);
    setSelectedRegistro(data);
  };

  const RegistroTemperatura = (params) => {
    if (configClima == "F") {
      return (
        <View
          style={{
            height: "90%",
            paddingTop: 700 * (12 / params.data),
          }}
        >
          <Ionicons name={"sunny"} size={35} color={"#F3D642"} />

          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            {params.data.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °F
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: "90%",
            paddingTop: 200 * (12 / params.data),
          }}
        >
          <Ionicons name={"sunny"} size={35} color={"#F3D642"} />

          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
            }}
          >
            {params.data.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °C
          </Text>
        </View>
      );
    }
  };

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
        <Text style={styles.TopText}>{date}</Text>
        <CircleLoader></CircleLoader>
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
        {dataClima.map((data, index) => {
          var style =
            index % 2 ? styles.dataRectangle : styles.dataRectangleDark;
          return (
            <View key={index} style={style}>
              <TouchableOpacity onPress={() => changeData(data)}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  {index + 1} AM
                </Text>

                <RegistroTemperatura
                  data={data[1].Temperatura}
                ></RegistroTemperatura>
              </TouchableOpacity>
            </View>
          );
        })}
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
