import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';

const MainStack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }; 

  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='Login' component={LoginScreen} />
            <MainStack.Screen name='Register' component={RegistrationScreen} />
            <MainStack.Screen name='Home' component={Home} />
          </MainStack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
