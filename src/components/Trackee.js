import React from 'react';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import PubNubReact from 'pubnub-react';


const LATITUDE = 9.4927;
const LONGITUDE = 76.7084;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-7c6559aa-4b15-443a-8042-05dab8d19c07',
      subscribeKey: 'sub-c-5d94ee5c-c23b-11eb-95c9-dee3de5eea22',
    });

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      errorMsg: '',
      coordinate: new AnimatedRegion({
        latitude: 9.4927,
        longitude: 76.7084,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };

    this.pubnub.init(this);
  }

  // code to receive messages sent in a channel
  async componentDidMount() {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      {Location.hasServicesEnabledAsync ? this.watchLocation() :
        this.setState({errorMsg: 'Permission to access location was denied'})}
      } 
    )();
  };

  componentDidUpdate(prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        channel: "location"
      });
    }
  }

  async watchLocation() {
     
    this.watchID = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 10
      },
      position => {
        const { latitude, longitude } = position.coords;
        console.log("Position is" +position.coords.latitude);


        this.setState({
          latitude,
          longitude
        });
        console.log(position);
      }
    )
  };

  componentWillUnmount() {
    this.watchID.remove();
  }


  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      //<SafeAreaView style={{ flex: 1 }}>
        <View>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            //ref={c => (this.map = c)}
            region={this.getMapRegion()}
          >
            <Marker.Animated
              coordinate={this.state}
            />
          </MapView>
        </View>
      //</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 250,
    borderWidth: 170
  },
});

export default Map