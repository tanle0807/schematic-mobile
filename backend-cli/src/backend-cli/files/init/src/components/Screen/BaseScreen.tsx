import React from "react";

import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { Container } from "native-base";

import { observer } from "mobx-react";
interface IAppProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  loading?: boolean;
}

const Screen = observer(({ style, header, children, loading }: IAppProps) => (
  <Container style={[{ flex: 1, backgroundColor: "transparent" }, style]}>
    <StatusBar barStyle="dark-content" />

    {header}
    {children}

    {loading && (
      <View
        style={{
          zIndex: 99,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.0)"
        }}
      >
        <View
          style={[
            {
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.7)"
            }
          ]}
        >
          <ActivityIndicator size="large" color={"#fff"} />
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              color: "white"
            }}
          >
            {" "}
            Loading...{" "}
          </Text>
        </View>
      </View>
    )}
  </Container>
));

export default Screen;
