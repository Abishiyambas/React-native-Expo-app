import { StyleSheet, Text, View, useColorScheme  } from 'react-native'
import {Colors} from "../constants/Colors"
import React from 'react'
import { Slot, Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Rootlayout = () => {
    const colorScheme = useColorScheme()
   const theme = Colors[colorScheme] ?? Colors.light //default



  return (
    <>
    <StatusBar style="auto" />
        <Stack screenOptions = {{
            headerStyle: { backgroundColor: theme.navBackground},
            headerTintColor: theme.title,
        }}>

<Stack.Screen name="(auth)" options = {{headerShown: false}} /> 
<Stack.Screen name="(dashboard)" options={{headerShown: false}} /> 
<Stack.Screen  name ="index" options={{title: 'Home'}}/>
        
        

        </Stack>
        </>
  )
}

export default Rootlayout

const styles = StyleSheet.create({})