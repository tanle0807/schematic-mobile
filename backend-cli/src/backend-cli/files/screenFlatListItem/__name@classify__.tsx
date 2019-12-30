import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

interface <%= classify(name) %>Props { }


interface <%= classify(name) %>State { }


class <%= classify(name) %> extends Component<<%= classify(name) %>Props, <%= classify(name) %>State> {
    constructor(props: <%= classify(name) %>Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Text>Item</Text>
        );
    }
}


const styles = StyleSheet.create({});


export default <%= classify(name) %>;
