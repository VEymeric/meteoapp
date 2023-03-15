import { useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import Weather from './Weather'

export default function Forecasts({data}) {
  const [forecasts, setForecasts] =  useState([])

  useEffect(() => {
    const forecastData = data.list.map(forecast => {
      const forecastDate = new Date(forecast.dt * 1000)
      return ({
        date: forecastDate,
        hour: forecastDate.getHours(),
        temp : Math.round(forecast.main.temp),
        icon : forecast.weather[0].icon,
        name: format(forecastDate, "EEEE", { locale : fr})
      })
    })
    let newForecastData = forecastData.map(forecast => {
      return forecast.name
    }).filter((day, index, self)=> {
      return self.indexOf(day) === index
    }).map((day) => {
      return {
        day, data:forecastData.filter((forecast) => forecast.name === day)
      }
    })
    console.log(newForecastData)
    setForecasts(newForecastData)

  }, [data])

  if(forecasts != []){
    return (
        <ScrollView 
          horizontal 
          style={styles.scroll}
        >
        
          {forecasts.map(f => (
              <View>
                <Text style = {styles.day}>{f.day.toUpperCase()}</Text>
                <View style = {styles.container}>
                  {f.data.map(w => <Weather forecast={w}/>)}
                </View>
              </View>
          ))}
        </ScrollView>
      );
  }return (
    <View>
      <Text>le tableau Forecasts est vide</Text>
    </View>)
  
}

const styles = StyleSheet.create({
  scroll: {
    height: "35%",
    width : "100%",
  },
  day: {
    fontSize : 16,
    fontWeight : "bold",
    marginBottom: 10,
    marginLeft : 20,
  },
  container : {
    flexDirection:"row",
    marginLeft : 5,
    marginRight : 25
  }
});
