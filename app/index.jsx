import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>The Number 1</Text>

            <Text style={{ marginTop: 10, marginBottom: 30 }}>Reading List App</Text>

            <View style={styles.card}>
                <Text>Hello, this is a card.</Text>
            </View>

        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    card: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 5,
        boxShadow: '4px 4px rgba(0,0,0,0.1)',
    }
})