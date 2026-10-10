import { StyleSheet } from 'react-native'
import {Link} from 'expo-router'

// themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'


const Login = () => {
  return (
   <ThemedView style={styles.container}>


    <Spacer />
    <ThemedText title={true} style={styles.title}>
        Login to your Account
    </ThemedText>

    <Spacer height={100}/>
    <Link href='/register'></Link>
    <ThemedText style={{textAlign: 'center'}}>
        register instead 
    </ThemedText>
   </ThemedView>
  )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30
    },

})

