import React, { Component } from "react";
import {
    View,
    FlatList
} from "react-native";
import { observer } from "mobx-react";
import { NavigationStackScreenProps } from "react-navigation-stack";

interface <%= classify(name) %>Props extends NavigationStackScreenProps { }
interface <%= classify(name) %>State {
    isRefreshing: boolean;
}


@observer
class <%= classify(name) %>Screen extends Component<<%= classify(name) %>Props, <%= classify(name) %>State> {
    focusListener: any;
    constructor(props: <%= classify(name) %>Props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    componentDidMount() {
    }

    onRefreshList = async () => {
        this.setState({ isRefreshing: true });

        this.setState({ isRefreshing: false });
    };

    render() {
        return (
            <View style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                    onRefresh={() => { this.onRefreshList() }}
                    refreshing={this.state.isRefreshing}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={null}
                    onEndReached={() => { }}
                    onEndReachedThreshold={0.4}
                    renderItem={({ item, index }) => null}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({ });


export default <%= classify(name) %>;
