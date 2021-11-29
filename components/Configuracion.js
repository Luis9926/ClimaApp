import React, { useEffect, useState } from "react";
import { StyleSheet, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, Switch } from "react-native";
import { Text, Avatar, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase/firebaseConfig";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Clima() {
  const [dataClima, setDataClima] = useState([]);

  const [selectedRegistro, setSelectedRegistro] = useState({
    Humedad: 0,
    Presion: 0,
    Temperatura: 0,
  });

  const [configClima, setConfigClima] = useState("C");

  const [configClimaBoolean, setConfigClimaBoolean] = useState(false);
  const [configApiBoolean, setConfigApiBoolean] = useState(false);

  const [configApi, setConfigApi] = useState("M");
  const [configApiTitle, setConfigApiTitle] = useState("Centigrados");
  const [configClimaTitle, setConfigClimaTitle] = useState("Centigrados");

  const [apiData, setApiData] = useState(null);

  const [date, setDate] = useState();
  useEffect(async () => {
    var date = moment().format("MMMM Do HH:m");
    //firebase.saveClimaRegistro();
    setDate(date);

    var confClima = await AsyncStorage.getItem("configClima");

    var confApi = await AsyncStorage.getItem("configApi");

    if (confClima != null) {
      console.log(confClima);
      setConfigClima(confClima);
    }

    if (confApi != null) {
      console.log(confApi);
      setConfigApi(confApi);
    }

    console.log("Config API", configApi);
    console.log("Config CLIMA", configClima);

    //firebase.saveClimaRegistro();
  }, []);

  useEffect(() => {
    console.log("Config API", configApi);
    console.log("Config CLIMA", configClima);
    if (configApi == "M") {
      setConfigApiBoolean(true);
      setConfigApiTitle("Centigrados");
    }
    if (configApi == "I") {
      setConfigApiBoolean(false);
      setConfigApiTitle("Farenheit");
    }

    if (configClima == "C") {
      setConfigClimaBoolean(false);
      setConfigClimaTitle("Centigrados");
    }
    if (configClima == "F") {
      setConfigClimaBoolean(true);
      setConfigClimaTitle("Farenheit");
    }
  }, [configApi]);

  const changeConfigClima = async (value) => {
    if (!configClimaBoolean) {
      AsyncStorage.setItem("configClima", "F");
      setConfigClimaTitle("Farenheit");
    } else {
      AsyncStorage.setItem("configClima", "C");
      setConfigClimaTitle("Centigrados");
    }
    setConfigClimaBoolean(!configClimaBoolean);
  };

  const changeConfigApi = async (value) => {
    if (!configApiBoolean) {
      AsyncStorage.setItem("configApi", "M");
      setConfigApiTitle("Centigrados");
    } else {
      AsyncStorage.setItem("configApi", "I");
      setConfigApiTitle("Farenheit");
    }

    setConfigApiBoolean(!configApiBoolean);
  };

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <RefreshControl />
      <View style={styles.container}>
        <Text h1 h1Style={styles.topText}>
          Configuración
        </Text>

        <View style={styles.estadoContainer}>
          <View style={{ flex: 8 }}>
            <View
              style={{
                marginTop: 5,
                marginLeft: 0,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text h4 style={{ textAlign: "center" }}>
                Usuario
              </Text>
              <Avatar
                source={{
                  uri: "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
                }}
                size={200}
              ></Avatar>
            </View>
          </View>

          <View style={styles.estadoInfo}>
            <View style={{ flex: 100 }}></View>
          </View>
        </View>
      </View>
      <Text h1 h1Style={styles.bottomText}>
        Preferencias
      </Text>
      <View style={styles.bottomContainer}>
        <View>
          <Text h4 h4Style={{ fontWeight: "100", marginBottom: 20 }}>
            Temp C°/F Registros Clima
          </Text>

          <Button
            onPress={() => {
              changeConfigClima();
            }}
            title={configClimaTitle}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <Text h4 h4Style={{ fontWeight: "100", marginBottom: 20 }}>
            Temp C°/F Predicciones
          </Text>

          <Button
            onPress={() => {
              changeConfigApi();
            }}
            title={configApiTitle}
          />
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
    flex: 3,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 20,
    textAlign: "center",
    marginRight: 20,
  },
  topText: {
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 40,
    marginTop: 20,
  },

  bottomText: {
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 40,
    marginTop: 200,
  },
  estadoContainer: {
    borderColor: "#202020",
    flex: 10,
    borderRadius: 15,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
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
    flex: 2,
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
