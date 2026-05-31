import React, { useMemo, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";

const Map = ({ apiKey, latitude, longitude, customStyles }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "", // Fallback to empty string if not provided
  });

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "450px",
    borderRadius: "20px",
    overflow: "hidden",
  };

  const center = useMemo(() => ({
    lat: Number(latitude) || 37.7749,
    lng: Number(longitude) || -122.4194,
  }), [latitude, longitude]);

  // Modern, clean map style matching brand colors (subtle purples/greys)
  const options = useMemo(() => ({
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{ "weight": "2.00" }]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#9c9c9c" }]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{ "visibility": "on" }]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#eeeeee" }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#7b7b7b" }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{ "visibility": "simplified" }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{ "color": "#7065f0" }, { "visibility": "on" }, { "opacity": 0.1 }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#7065f0" }, { "lightness": 88 }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true,
  }), []);

  if (loadError) return <div style={{ height: "450px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", borderRadius: "20px", color: "#6c757d" }}>Map could not be loaded. Please check your API key.</div>;
  if (!isLoaded) return <Skeleton height={450} borderRadius={20} />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={options}
    >
      <Marker
        position={center}
        icon={{
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: "#7065f0",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
          scale: 2,
          anchor: { x: 12, y: 22 }
        }}
      />
    </GoogleMap>
  );
};

export default Map;

