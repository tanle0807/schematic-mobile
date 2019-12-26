import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "@/router";

import { Navigation } from "@/utils/Navigation";
import { SCREEN_WIDTH } from "@/constants/dimensions";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { AppLoading, Notifications } from "expo";
import { AppearanceProvider } from "react-native-appearance";
import { LocalStorage } from "@/utils/LocalStorage";

EStyleSheet.build({ $rem: SCREEN_WIDTH / 414 });

interface IAppState {
  appIsReady: boolean;
}

interface IAppProps {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      appIsReady: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      // "text-bold": require("@/assets/fonts/VL-SOFIAPROSOFT-BOLD.ttf"),
      // "text-light": require("@/assets/fonts/VL-SOFIAPROSOFT-LIGHT.ttf")
    });
    this.setState({ appIsReady: true });
    // this.getPermissionAsync();
    // this.registerForPushNotificationsAsync();
  }

  getPermissionAsync = async () => {
    // var { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== "granted") {
    //   this.setState({ appIsReady: false });
    // } else {
    //   this.setState({ appIsReady: true });
    // }
  };

  handleNotification = (notification: any) => {
    console.log("notification", notification);
  };

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    LocalStorage.set("expoToken", token);

    Notifications.addListener(this.handleNotification);
  }

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return (
      <AppearanceProvider>
        <StatusBar barStyle="light-content" />
        <AppNavigator
          ref={navigatorRef => {
            Navigation.setTopLevelNavigator(navigatorRef);
          }}
        ></AppNavigator>
      </AppearanceProvider>
    );
  }
}
