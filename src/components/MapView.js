import React from 'react';
import './../App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MapView = withScriptjs(withGoogleMap((props) => {

    return (
        <GoogleMap
            defaultZoom={12}
            center={{lat: 39.5700, lng: -105.0250}}>
            {props.parkList.map((park, index) => (
                <Marker
                    position={{lat: park.lat, lng: park.long}}
                    animation={park.animate ? 4 : '0'}
                    key={index}
                    onClick={() => props.handleMarkerOpen(index)}>
                    {props.activeMarker === index &&
                     props.moreInfoList !== undefined &&
                     <InfoWindow
                        onCloseClick={() => props.handleMarkerClose()}>
                         <div>
                             <p>{props.moreInfoList[index].name}</p>
                             {props.moreInfoList[index].location !== undefined &&
                                <div>
                                    <p>{props.moreInfoList[index].location.formattedAddress[0]}</p>
                                </div>
                             }
                             <div>
                                 <img src="powered-by-foursquare-blue.png" alt="Powered by Foursquare" height="8"/>
                             </div>
                         </div>
                     </InfoWindow>
                    }
                </Marker>
            ))}

        </GoogleMap>
    );
}))

export default MapView;
