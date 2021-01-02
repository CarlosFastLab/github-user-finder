import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

const WrappedMap = withScriptjs(withGoogleMap(GMap));

function GMap({ lat, lng }) {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: lat, lng: lng }}
            center={{ lat: lat, lng: lng }}
        >
            {lat && lng !== null ? (<Marker position={{ lat: lat, lng: lng }} />) : false}
        </GoogleMap>
    )
}

export { WrappedMap };