import React, { useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'


const mapStyle = {
    height: '900px',
    width: '100%'
}


const Map3 = ({token}) => {
    const DEFAULT_ZOOM = 15
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB5XqqsxtwR_QCPE8nNwXuAg8EU2EwsoiA"
    })

    const [map, setMap] = React.useState(null)
    const [markerPosition, setMarkerPosition] = useState({
        lat: 37.235730,
        lng: -80.419470,
    })

    const [defaultLocation, setDefaultLocation] = useState({
        lat: 37.234970,
        lng: -80.423943,
    })

    const onLoad = useCallback((map)=> {
        // const bounds = new window.google.maps.LatLngBounds({
        //     lat: 28.0289837,
        //     lng: 1.6666663,
        // });
        // map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(() =>{
        setMap(null)
    }, [])


    const handelClickOnMap  = ()=> {

    }
    return (
        <div>
            {
                isLoaded ? (
                    <GoogleMap
                        onLoad={onLoad}
                        center={defaultLocation}
                        zoom={DEFAULT_ZOOM}
                        mapContainerStyle={mapStyle}
                        onClick={handelClickOnMap}
                        onUnmount={onUnmount}
                    >
                        <Marker position={markerPosition} />
                    </GoogleMap>
                ) : <></>
            }
        </div>
    )
}

export default Map3