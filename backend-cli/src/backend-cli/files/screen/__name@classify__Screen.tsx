import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import BaseScreen from "@/components/Screen/BaseScreen";

interface <%= classify(name) %>Props { }

interface <%= classify(name) %>State { }

class <%= classify(name) %>Screen extends Component<<%= classify(name) %>Props, <%= classify(name) %>State> {
    constructor(props: <%= classify(name) %>Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BaseScreen
                style={{ flex: 1 }}
            >
                <View></View>
            </BaseScreen>
        );
    }
}


const styles = StyleSheet.create({});


export default <%= classify(name) %>;
