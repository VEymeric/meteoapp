import {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Location from "expo-location"
import axios from "axios"
import CurrentWeather from './components/CurrentWeather'
import Forecasts from './components/Forecasts'
import * as API from './env'

const API_URL = (lat, long) => {
  return 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid='+API.KEY+'&lang=fr&units=metric'
}
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      getWeather(location)
    })();
  }, []);

  const getWeather = async (location) => {
     setLoading(false)
    try{
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
      setData(response.data)
      console.log('Working')
    }catch(error){
      console.log(error)
    }
  }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }
  if(loading == true){
    return <View style={styles.container?styles.container:"test"}>
      <ActivityIndicator/>
    </View>
  }
  if(data != null){
    return (
        <View style={styles.container}>
          <CurrentWeather data={data}/>
          <Forecasts data={data}/>
        </View>
      );
  }
  return <Text> Something is missing ${API.KEY} </Text>
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ccf0f1',
    padding: 8,
  },
});
