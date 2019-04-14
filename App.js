import React, {Component} from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDog} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import SideBar from './components/SideBar'
import MapView from './components/MapView'
import cloneDeep from 'lodash/cloneDeep';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faDog);
library.add(faChevronLeft);

const theList = [
    {name: "Chatfield Dog Park", lat: 39.5616, long: -105.0562, animate: false},
    {name: "Wynekta Ponds", lat: 39.6101, long: -105.0389, animate: false},
    {name: "Redstone Dog Park", lat: 39.5476, long: -105.0220, animate: false},
    {name: "Englewood Canine Coral", lat: 39.6281, long: -105.0051, animate: false},
    {name: "David Lorenz Dog Park", lat: 39.5650, long: -104.9309, animate: false}
];

class App extends Component {

    state = {
        sideBarOpen: true,
        dogParkList: [],
        moreInfoList: [], // Parallel Array
        markerId: '',
        isLoaded: false
    };

    getDogParks() {
        this.setState({dogParkList: theList});
    }

    // Uses Foursquare
    moreInfoRequest (park) {
        var clientID = 'BHNBPXSTKBDREPVO42FHGOETHNZLO0Z4G40YGKSMSLSW2N4B';
        var clientSecret = 'EXRWW3V2G3PZRAD2APGZ5TSCONTIYLHPJRLPHDLCSNLOCB1K';

        var reqURL = 'https://api.foursquare.com/v2/venues/search?ll=' + park.lat + ',' + park.long + '&client_id=' +
            clientID + '&client_secret=' + clientSecret + '&v=20160118&query=' + park.name + '&radius=150';
        return fetch(reqURL).then(response=>response.json());
    }

    componentDidMount() {
        this.getDogParks();
        let promiseArray = [];
        for (let i = 0; i < theList.length; i++) {
            let apiRequest = this.moreInfoRequest(theList[i]);
            promiseArray.push(apiRequest);
        }
        Promise.all(promiseArray).then(responses => {
            let responseData = responses.map(r => r.response.venues[0]);
            this.setState({moreInfoList: responseData});
        }).catch(() => {
            console.log('failed to get more info for parks');
            let notifyFailureList = [];
            for (let i = 0; i < theList.length; i++) {
                notifyFailureList.push({name: "Sorry, we could not contact Foursquare to get more info"});
            }
            this.setState({moreInfoList: notifyFailureList});
        });
    }

    clickHamburger = () => {
        this.setState({sideBarOpen: !this.state.sideBarOpen});
    }

    selectPark = (index) => {
        this.setState({markerId: index});
        this.animateMarker(index);
    }

    handleMarkerOpen = (index) => {
        this.setState({markerId: index})
        this.animateMarker(index);
    }

    handleMarkerClose = () => {
        this.setState({markerId: ''})
    }

    filterParks = (userInput) => {
        let filteredList = [];
        if (userInput === '') {
            this.getDogParks();
        } else {
           theList.forEach(function(park) {
               if (park.name.toLowerCase().includes(userInput.toLowerCase())) {
                  filteredList.push(park);
               }
           });
           this.setState({dogParkList: filteredList});
        }
    }

    animateMarker = (index) => {
        let listWithAnimatedMarker = cloneDeep(this.state.dogParkList);
        // First reset all to false
        listWithAnimatedMarker.forEach( function (park) {
            park.animate = false;
        });
        this.setState({dogParkList: listWithAnimatedMarker});
        // Now trigger the animation by going from false to true
        listWithAnimatedMarker[index].animate = true;
        this.setState({dogParkList: listWithAnimatedMarker});
    }

    render() {
        return (
            <div className="App">
                <section className="App-header">
                    <button title={this.state.sideBarOpen ? "Close Menu" : "Open Menu"} onClick={this.clickHamburger}>
                        <FontAwesomeIcon icon="dog" flip={this.state.sideBarOpen ? "horizontal" : ""} size="lg"/>
                    </button>
                    <div className="App-title">Southwest Denver Dog Parks</div>
                </section>
                <section className={this.state.sideBarOpen ? "App-sidebar" : "App-sidebar-closed"}>
                  <SideBar dogParkList={this.state.dogParkList}
                           selectPark={this.selectPark}
                           clickHamburger={this.clickHamburger}
                           filterParks={this.filterParks}/>
                </section>
                <section className={this.state.sideBarOpen ? "App-mapView" : "App-mapView-expanded"}>
                    <MapView handleMarkerOpen={this.handleMarkerOpen}
                             handleMarkerClose={this.handleMarkerClose}
                             activeMarker={this.state.markerId}
                             parkList={this.state.dogParkList}
                             moreInfoList={this.state.moreInfoList}
                             googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyBRQdKl46-TQJvyTgz_84HH_3cEn4dSwB8&v=3.exp'}
                             loadingElement={<div style={{ height: `100%` }} />}
                             containerElement={<div style={{ height: '100vh' , width: `100%` }} />}
                             mapElement={<div style={{ height: `100%` }} /> }
                    />
                </section>
            </div>
        );
    }
}

export default App;
