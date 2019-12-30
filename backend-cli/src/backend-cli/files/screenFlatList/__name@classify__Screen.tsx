import React, { Component } from "react";
import {
    View,
    FlatList,
    StyleSheet
} from "react-native";
import { observer } from "mobx-react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import <%= classify(name) %>FlatListItem from './<%= classify(name) %>FlatListItem'


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

    pullToRefresh = async () => {
        this.setState({ isRefreshing: true });

        this.setState({ isRefreshing: false });
    };

    loadMore = async () => {
        this.setState({ isRefreshing: true });

        this.setState({ isRefreshing: false });
    };

    render() {
        return (
            <View style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                    onRefresh={() => { this.pullToRefresh() }}
                    refreshing={this.state.isRefreshing}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={null}
                    onEndReached={() => { this.loadMore() }}
                    onEndReachedThreshold={0.4}
                    renderItem={({ item, index }) => <<%= classify(name) %>FlatListItem/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({ });


export default <%= classify(name) %>Screen;
