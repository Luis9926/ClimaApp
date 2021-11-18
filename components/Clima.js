import React, {useEffect, useState}from "react";
import { StyleSheet, View, RefreshControl} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../firebase/firebaseConfig';
import moment from "moment";


export default function Clima() {


  const [dataClima, setDataClima] = useState([]);

  const [selectedRegistro, setSelectedRegistro] = useState({
    humedad:0,
    presion:0,
    temperatura:0
  });

  const [date, setDate] = useState();
  useEffect(()=>{
    var date = moment().format('MMMM Do HH:m');
    //firebase.saveClimaRegistro();
    setDate(date);

    try {
     firebase.getClimaData().then((res)=>
     {
       
       res = Object.entries(res);
       res = res.slice(1).slice(-5);
       var reg =  res[res.length-1]
       setSelectedRegistro(reg[1]);
       console.log("DATA CLIMA SET",res[1]);
       setDataClima(res);
     });

    } catch (error) {
      console.log(error);
    }
    
    //firebase.saveClimaRegistro();
  },[]);

  const IconoHumedad = ()=>{
    if(selectedRegistro.humedad >= 80){
      return(
        <Ionicons name={"rainy"} size={50} color={"#589FF9"} />
      )
    }else{
      return(
        
        <Ionicons name={"sunny"} size={50} color={"#F3D642"} />
      )
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <RefreshControl/>
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
                  <Text style={{ fontSize: 35, fontWeight: "100" }}>{selectedRegistro.temperatura}°C</Text>
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
                  <Text style={{ fontSize: 15, fontWeight: "100" }}>{selectedRegistro.presion} P</Text>
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
                <Text style={{ fontSize: 17, fontWeight: "100" }}> {selectedRegistro.humedad} % </Text>
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
            <View style={styles.semanalContainer}>
              <View style={styles.semanalInfoContainer}>
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
                    Lunes
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
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Humedad 30%
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Max 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Min 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Precipitación
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Viento 10km/h
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.semanalInfoContainer}>
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
                    Lunes
                  </Text>
                  <Ionicons name="sunny" size={40} color="#F9E131"></Ionicons>

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
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Humedad 30%
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Max 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Min 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Precipitación
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Viento 10km/h
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.semanalInfoContainer}>
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
                    Lunes
                  </Text>
                  <Ionicons name="cloudy" size={40} color="#9D9D9D"></Ionicons>

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
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Humedad 30%
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Max 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Temp Min 30°
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Precipitación
                    </Text>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}
                    >
                      Viento 10km/h
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
