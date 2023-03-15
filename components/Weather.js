import { Text, View, StyleSheet, Image } from 'react-native';

import GetIcon from './Global'

export default function Weather({forecast}) {
  return (
    <View style = {styles.container}>
        <Text></Text>
        <Text>{forecast.hour}h</Text>
        <Image 
          source = {{uri: GetIcon(forecast?.icon,2)}}
          style={styles.image}
        />
        <Text style = {styles.temp}>{forecast.temp}°C</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 140,
    width: 75,
    paddingVertical : 6,
    justifyContent : "center",
    alignItems : "center",
    marginRight : 10,
    borderRadius : 50
  },
  image: {
    width : 50,
    height : 50
  },
  temp : {
    fontSize: 24,
    fontWeight: "bold",
    color: "#54565B"
  }
});
