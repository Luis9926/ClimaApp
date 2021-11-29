import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function CircleClima(props) {
  console.log("Props", props);

  const IconoHumedad = () => {
    if (props.data[1].Humedad >= 80) {
      return <Ionicons name={"rainy"} size={60} color={"#a7d4e7"} />;
    } else {
      return <Ionicons name={"sunny"} size={60} color={"#F3D642"} />;
    }
  };

  const RegistroTemperatura = () => {
    if (props.data.config == "F") {
      return (
        <View>
          <Text style={styles.BigcircleText}>
            {props.data[1].Temperatura.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °F
          </Text>
          <Text style={styles.SmallcircleText}>
            Sensacion Térmica{" "}
            {(props.data[1].Temperatura - 2).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °F
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.BigcircleText}>
            {props.data[1].Temperatura.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °C
          </Text>
          <Text style={styles.SmallcircleText}>
            Sensacion Térmica{" "}
            {(props.data[1].Temperatura - 2).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            °C
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <AnimatedCircularProgress
        size={300}
        width={30}
        fill={props.data[1].Humedad}
        tintColor="#DAE6F4"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#ffff"
        tintColorSecondary="#094996"
        rotation={225}
        arcSweepAngle={270}
        duration={1000}
      >
        {(fill) => (
          <View style={styles.TextContainer}>
            <Svg height="400" width="400">
              <Circle cx="200" cy="200" r="120" fill="#585858"></Circle>
            </Svg>

            <View
              style={{
                position: "absolute",
                transform: [{ translateX: 0 }, { translateY: 115 }],
                alignItems: "center",
              }}
            >
              <IconoHumedad></IconoHumedad>

              <RegistroTemperatura></RegistroTemperatura>
            </View>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  BigcircleText: {
    fontSize: 40,
    paddingBottom: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  SmallcircleText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "100",
  },
  TextContainer: {
    alignItems: "center",
  },
  CircleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  TopText: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 15,
  },
  screen: {},
});
