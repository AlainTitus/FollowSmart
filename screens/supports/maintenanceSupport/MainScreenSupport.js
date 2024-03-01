import React, { useEffect, useState } from 'react';
import RouteSupport from './RouteSupport';
import MapSupports from './MapSupports';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMaintenance from './HomeMaintenance';
import Supports from '../Supports';

const Stack = createNativeStackNavigator();

const MainScreenSupport = ({ HandleBack }) => {

    return (
 
        <Stack.Navigator initialRouteName='Support screen'>
            <Stack.Screen 
                name='Support screen'
                component={Supports}
                options={{
                headerShown: false
            }} 
            />
            <Stack.Screen 
                name='Main support'
                component={HomeMaintenance}
                options={{
                headerShown: false
            }} 
            />
            <Stack.Screen 
                name='Route support'
                component={RouteSupport} 
                options={{
                headerShown: false
            }} 
            />
            <Stack.Screen 
                name='Map support'
                component={MapSupports}
                options={{
                headerShown: false
            }} 
            />
        </Stack.Navigator>
    )
}

export default MainScreenSupport;

