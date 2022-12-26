import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  useEffect(() => {
    if (!route) {
      return;
    }
    setLocation(route.params.location);
    setLocationName(route.params.locationName);
    setName(route.params.name);
  }, [route]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={location}
        mapType="standard"
        minZoomLevel={5}
      >
        <Marker title={name} coordinate={location} description={locationName} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
