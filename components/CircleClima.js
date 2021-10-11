import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Svg, { Circle } from "react-native-svg";
export default function CircleClima() {
  return (
    <View>
      <AnimatedCircularProgress
        size={300}
        width={30}
        fill={60}
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
              <Circle cx="200" cy="200" r="120" fill="#6099DE"></Circle>
            </Svg>

            <View
              style={{
                position: "absolute",
                transform: [{ translateX: 0 }, { translateY: 170 }],
                alignItems: "center",
              }}
            >
              <Text style={styles.BigcircleText}>27°C</Text>
              <Text style={styles.SmallcircleText}>Sensacion Térmica 25°C</Text>
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
