import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LoginSignupScreen from './LoginSignupScreen';
import HomeScreen from './HomeScreen';
import CreateShopScreen from './CreateShopScreen';
import AboutUsScreen from './AboutUsScreen';
import ExploreScreen from './ExploreScreen';
import ChatScreen from './ChatScreen';
import AppointmentsScreen from './AppointmentsScreen';
import SettingsScreen from './SettingsScreen';
import UserScreen from './UserScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateShop" component={CreateShopScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UserProfile" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
