import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase/firebaseConfig";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Clima() {
  const [dataClima, setDataClima] = useState([]);

  const [configClima, setConfigClima] = useState("C");
  const [configApi, setConfigApi] = useState("M");
  const [configApiLetter, setConfigApiLetter] = useState("C");

  const [apiData, setApiData] = useState(null);

  const [selectedRegistro, setSelectedRegistro] = useState({
    Humedad: 0,
    Presion: 0,
    Temperatura: 0,
  });

  const [date, setDate] = useState();
  useEffect(async () => {
    var date = moment().format("MMMM Do HH:m");
    //firebase.saveClimaRegistro();
    setDate(date);

    var confClima = await AsyncStorage.getItem("configClima");
    console.log(confClima);

    var confApi = await AsyncStorage.getItem("configApi");
    console.log(confApi);

    if (confClima != null) {
      await setConfigClima(confClima);
    }

    if (confApi != null) {
      await setConfigApi(confApi);
    }

    if (configApi == "M") {
      setConfigApiLetter("C");
    } else {
      setConfigApiLetter("F");
    }

    try {
      await axios
        .get(
          "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=34000&country=MX&units=" +
            configApi +
            "&days=3&lang=es&key=ea18174391c84575839398e0d334f6e2"
        )
        .then((res) => {
          setApiData(res.data);
          console.log(res.data);
        });
    } catch (error) {}

    try {
      firebase.getClimaData().then((res) => {
        res = Object.entries(res);
        res = res.slice(1).slice(-5);
        var reg = res[res.length - 1];
        console.log("CLIMA CONF", configClima);
        if (configClima == "F") {
          reg.Temperatura = reg.Temperatura * 1.8 + 32;
          console.log("REG", reg);
        }
        setSelectedRegistro(reg[1]);
        console.log("DATA CLIMA SET", res[1]);
        setDataClima(res);
      });
    } catch (error) {
      console.log(error);
    }

    //firebase.saveClimaRegistro();
  }, []);

  useEffect(() => {
    if (configApi == "M") {
      setConfigApiLetter("C");
    } else {
      setConfigApiLetter("F");
    }
    try {
      axios
        .get(
          "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=34000&country=MX&units=" +
            configApi +
            "&days=3&lang=es&key=ea18174391c84575839398e0d334f6e2"
        )
        .then((res) => {
          setApiData(res.data);
          console.log(res.data);
        });
    } catch (error) {}

    try {
      firebase.getClimaData().then((res) => {
        res = Object.entries(res);
        res = res.slice(1).slice(-5);
        var reg = res[res.length - 1];

        console.log("CLIMA CONF", configClima);

        if (configClima == "F") {
          reg.Temperatura = reg.Temperatura * 1.8 + 32;
        }

        setSelectedRegistro(reg[1]);
        console.log("DATA CLIMA SET", res[1]);
        setDataClima(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [configApi]);
  // const targetPath = "C:UsersLuisDesktopUNIEstadiasAppClimaPoliClimaApp\files";
  // const sourcePath = "https://smn.conagua.gob.mx/webservices/?method=1";

  // unzip(sourcePath, targetPath, "UTF-8")
  //   .then((path) => {
  //     console.log(`unzip completed at ${path}`);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const IconoHumedad = () => {
    if (selectedRegistro.Humedad >= 80) {
      return <Ionicons name={"rainy"} size={50} color={"#589FF9"} />;
    } else {
      return <Ionicons name={"sunny"} size={50} color={"#F3D642"} />;
    }
  };

  const RegistroTemperatura = () => {
    if (configClima == "F") {
      return (
        <Text style={{ fontSize: 35, fontWeight: "100" }}>
          {selectedRegistro.Temperatura * 1.8 + 32}°F
        </Text>
      );
    } else {
      return (
        <Text style={{ fontSize: 35, fontWeight: "100" }}>
          {selectedRegistro.Temperatura}°C
        </Text>
      );
    }
  };

  const ApiInfo = () => {
    if (apiData != null) {
      return (
        <View style={styles.semanalContainer}>
          {apiData.data.map((data, index) => {
            var newDate = new Date(data.valid_date);
            var weeknumb = newDate.getDay();

            var weekday = "";

            if (weeknumb == 0) weekday = "Lunes";
            if (weeknumb == 1) weekday = "Martes";
            if (weeknumb == 2) weekday = "Miercoles";
            if (weeknumb == 3) weekday = "Jueves";
            if (weeknumb == 4) weekday = "Viernes";
            if (weeknumb == 5) weekday = "Sabado";
            if (weeknumb == 6) weekday = "Domingo";

            return (
              <View key={index} style={styles.semanalInfoContainer}>
                <View
                  style={{
                    height: "100%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    h4
                    h4Style={{
                      textAlign: "center",
                      fontWeight: "100",
                      fontSize: 20,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  >
                    {weekday}
                  </Text>
                  <Ionicons name="rainy" size={40} color="#589FF9"></Ionicons>

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#202020",
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      Humedad {data.rh}%
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      Temp Max {data.max_temp} {configApiLetter}°
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      Temp Min {data.min_temp} {configApiLetter}°
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      Precipitación
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      Viento {data.wind_spd}km/h
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <ActivityIndicator></ActivityIndicator>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <RefreshControl />
      <View style={styles.container}>
        <Text h1 h1Style={styles.topText}>
          Clima Hoy
        </Text>

        <View style={styles.estadoContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 5, marginLeft: 20 }}>
              <Text h4>Estado Meteorológico</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#202020",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></View>
          <View style={styles.estadoInfo}>
            <View style={{ flex: 100 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "17%",
                }}
              >
                <View style={{ flex: 4 }}>
                  <IconoHumedad></IconoHumedad>
                </View>
                <View style={{ flex: 6 }}>
                  <RegistroTemperatura></RegistroTemperatura>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: "100" }}>
                    Precipitacion
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "100" }}>
                    Presión Atm.
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "100" }}>30%</Text>
                  <Text style={{ fontSize: 15, fontWeight: "100" }}>
                    {selectedRegistro.Presion} P
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#202020",
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            <View
              style={{
                flex: 100,
                flexDirection: "row",
                marginTop: "9%",
                marginLeft: 12,
              }}
            >
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>Humedad</Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>
                  Temp.Max
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>
                  Temp.Min
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>
                  Vel.Viento
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>
                  {selectedRegistro.Humedad} %
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}> 30°C </Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}> 20°C </Text>
                <Text style={{ fontSize: 17, fontWeight: "100" }}>10km</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text h1 h1Style={styles.topText}>
          Clima Semanal
        </Text>
        <View style={styles.climaContainer}>
          <View style={{ marginLeft: 10, marginRight: 10, height: "100%" }}>
            <ApiInfo></ApiInfo>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 2,
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: "column",
    flex: 3,
    marginTop: 20,
    marginBottom: 30,
  },
  topText: {
    textAlign: "center",
    fontWeight: "100",
  },
  estadoContainer: {
    borderColor: "#202020",
    flex: 5,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  climaContainer: {
    borderColor: "#202020",
    flex: 5,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    backgroundColor: "#3C75D8",
  },

  estadoInfo: {
    flexDirection: "row",
    flex: 4,
    marginLeft: 20,
    marginRight: 20,
  },
  semanalContainer: {
    flexDirection: "row",
    height: "100%",
  },
  semanalInfoContainer: {
    flex: 1,
    borderRadius: 15,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#202020",
    borderWidth: 2,
    backgroundColor: "#ffff",
    flexDirection: "column",
  },
});
