import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";

type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Rick and Morty Characters" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
