import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import BaseScreen from "@/components/Screen/BaseScreen";

interface HomeProps {}

interface HomeState {}

class HomeScreen extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BaseScreen style={{ flex: 1 }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text>HELLO NEETEAM</Text>
        </View>
      </BaseScreen>
    );
  }
}

const styles = StyleSheet.create({});

export default HomeScreen;
