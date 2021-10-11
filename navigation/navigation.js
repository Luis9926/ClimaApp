import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Clima from "../components/Clima";
import Configuracion from "../components/Configuracion";
import Inicio_Clima from "../components/Inicio_Clima";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { TabActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const Tab = createBottomTabNavigator();

const jumpToAction = TabActions.jumpTo("Inicio");

export default function Navigation() {
  const navigation = useNavigation();

  const translation = useState(new Animated.Value(-10))[0];

  const index = useNavigationState((state) => state.routes);

  const [Screen, setScreen] = useState("Inicio");

  function iconUp() {
    Animated.spring(translation, {
      toValue: -20,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }
  function iconDown() {
    Animated.spring(translation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let screen;
          console.log(index);
          if (index[0].state != null) {
            screen = index[0].state.index;
            console.log(screen);

            if (screen == 0) {
              iconDown();
            }
            if (screen == 1) {
              iconUp();
            }
            if (screen == 2) {
              iconDown();
            }
          } else {
            iconUp();
          }
          if (route.name === "Clima") {
            iconName = focused ? "thermometer" : "thermometer-outline";
            color = focused ? "#F4ED20" : color;

            size = 30;
          } else if (route.name === "Inicio") {
            iconName = focused ? "sunny" : "sunny-outline";

            size = 60;
          } else if (route.name === "Configuracion") {
            iconName = focused ? "settings" : "settings-outline";
            color = focused ? "#ffff" : color;
            size = 30;
          }

          if (route.name === "Inicio") {
            return focused ? (
              <Animated.View
                style={{
                  position: "absolute",
                  transform: [{ translateY: translation }],
                  height: 100,
                  width: 100,
                  borderRadius: 60,
                  backgroundColor: "#5a95ff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    iconUp();
                  }}
                >
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={color}
                    style={{ marginLeft: 1 }}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  position: "absolute",
                  transform: [{ translateY: translation }],
                  height: 100,
                  width: 100,
                  borderRadius: 60,
                  backgroundColor: "#5a95ff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Navigation", {
                      screen: "Inicio",
                    });
                  }}
                >
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={color}
                    style={{ marginLeft: 3 }}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#F3D642",
        tabBarInactiveTintColor: "white",

        tabBarBackground: () => (
          <LinearGradient
            colors={["#3C6FC9", "#FFF"]}
            style={styles.backgroundBar}
          />
        ),
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen name="Clima" component={Clima} options={{ title: "Clima" }} />
      <Tab.Screen
        name="Inicio"
        component={Inicio_Clima}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Configuracion"
        component={Configuracion}
        options={{ title: "Configuracion" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  backgroundBar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
