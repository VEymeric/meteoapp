import { useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { isSameDay } from "date-fns"
import GetIcon from './Global'


export default function CurrentWeather({data}) {
  const [currentWeather, setCurrentWeather] =  useState(null)

  useEffect(() => {
    const currentW = data.list.filter(forecast => {
      const today = new Date().getTime() + Math.abs(data?.city?.timezone * 1000)
      const forecastDate = new Date(forecast.dt * 1000)
      return isSameDay(today, forecastDate)
    })
    setCurrentWeather(currentW[0])
  }, [data])
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data?.city?.name}</Text>
      <Text style={styles.today}>Aujoud'hui</Text>
      <Image 
      source = {{uri: GetIcon(currentWeather?.weather[0].icon,4)}}
      style={styles.image}
      />
      <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
      <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    height: "65%"
  },
  city: {
    fontSize: 36,
    fontWeight: "500",
    color: "#54565B"
  },
  today: {
    fontSize: 24,
    fontWeight: "300",
    color: "#54565B"
  },
  temp: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#54565B"
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#54565B"
  },
  image: {
    width:150, 
    height:150,
    marginVertical : 20
  },
});
