import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LikeScreen from '../screens/LikeScreen';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} />
                <Stack.Screen name='Like' component={LikeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AppRouter; 