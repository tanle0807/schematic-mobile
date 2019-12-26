import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "@/screens/Home/HomeScreen";
// import AuthStack from './AuthStack';
// import BottomTabsStack from './BottomTabsStack';

const RootNavigator = createSwitchNavigator({
  HomeScreen
  // AuthStack,
  // BottomTabsStack
});

export default createAppContainer(RootNavigator);
