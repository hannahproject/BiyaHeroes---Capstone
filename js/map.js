const displayMap = document.querySelector('#map');
const from = document.querySelector('#from_places');
const to = document.querySelector('#to_places');
const displayDistance = document.querySelector('#display-distance');
const calculate = document.querySelector('#calculate');
const stop = document.querySelector('#stop');
// const pickupBtn = document.querySelector('#pick-up-btn');
// const dropoffBtn = document.querySelector('#drop-off-btn');

const btns = document.getElementsByClassName('geo-btn');

//BINAN COORDINATES
//DEFAULT MAP LOCATION UPON THE PAGE LOADING
const defaultLoc = {
    lat: 14.3036,
    lng: 121.0781
};

const options = {
    zoom: 12,
    center: defaultLoc
};

function initMap(latitude, longitude) {

    var map = new google.maps.Map(displayMap, options);
    //TO CONVERT THE COORDS INTO NUMBERS
    var start = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));

    //CHECKS IF BROWSER SUPPORTS GEOLOCATION
    if(navigator.geolocation) {
        //IF THE BROWSER SUPPORTS GEOLOCATION, CLICKING THE CALCULATE EVENT WILL FIRE UP THE GEOLOCATION FUNCTION
        for (var btn of btns) {
            btn.addEventListener('click', geolocation);
        }

        //ADDS MARKER TO THE MAP BASED ON THE USER'S CURRENT POSITION
        var marker = new google.maps.Marker({
            position: start
        });
    
        marker.setMap(map);

    } else {
        console.error("Your browser does not support geolocation.");
    }
}

function geolocation() {

    var lat;
    var lng;
    var coords;

    const successCallback = (position) => {
        //GETS THE COORDINATES OF THE CURRENT POSITIONS
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        initMap(lat,lng);
    }

    const errorCallback = (error) => {
        //CODE 1 MEANS THE USER DENIED/BLOCKED THE ACCESS
        if(error.code == 1) {
            console.log("Permission Denied.");
        }
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}