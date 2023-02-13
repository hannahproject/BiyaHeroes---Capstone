// BUTTONS
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');

//INPUTS
const A = document.getElementById('point-a');
const B = document.getElementById('point-b');

//P TAGS
const fare_counter = document.getElementById('fare-counter');
const distance_counter = document.getElementById('distance-counter');
const total_fare = document.getElementById('total');
const discounted = document.getElementById('discount');
const current_base = document.getElementById('current-base');
const current_succeeding = document.getElementById('current-succeeding');

//GLOBAL VARIABLES
geolocator = navigator.geolocation;
let CURRENT_LOCATION = null;
let WatchID = null;
let watchPosCoords = [];
let firstCoords = [];
let _FARE = null;
let DISCOUNTED_FARE = null;
let off = null;

//GEOAPIFY
const geoapify = '9a505c840dbb420c94615cc446b4e3fd';

function Geolocate() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    }

    if(!geolocator) {
        alert("Your browser do not support geolocation.");
    } else {
        WatchID = geolocator.watchPosition(onSuccess, onError, options);
        stop.disabled = false;
    }
}

function onSuccess(pos) {
    CURRENT_LOCATION = pos.coords;
    var coords = [CURRENT_LOCATION.latitude, CURRENT_LOCATION.longitude];
    watchPosCoords.push(coords);
    PositionA();
    CalculateDistance();
}

function PositionA() {
    firstCoords = watchPosCoords[0];

    if(firstCoords !== null) {
        ReverseGeocodeA();
    }
}

function onError(err) {
    var message = err.message;
    console.log(message);
}

function between(x, min, max) {
    return x >= min && x <= max;
}

function ReverseGeocodeA() {
    var reverse = `https://api.geoapify.com/v1/geocode/reverse?lat=${firstCoords[0]}&lon=${firstCoords[1]}&apiKey=${geoapify}`;

    fetch(reverse).then(result => result.json())
    .then(featureCollection => {
        if(featureCollection.features.length === 0) {
            console.log('Empty');
            return;
        }

        const result = featureCollection.features[0];
        A.value = `${result.properties.formatted}`;
    })
    .catch(error => console.log(error));
}

function CalculateDistance() {

    const dist = geolib.getPreciseDistance(
        {
            latitude: firstCoords[0], 
            longitude: firstCoords[1]
        },
        {
            latitude: CURRENT_LOCATION.latitude, 
            longitude: CURRENT_LOCATION.longitude
        }
    );

    let KM = geolib.convertDistance(dist, 'km'); 
    let roundKM = Math.round(100* KM) / 100;

    distance_counter.innerHTML = roundKM;

    const SUCCEEDING_FARE = parseInt(current_succeeding.innerText);
    const BASE_FARE = parseInt(current_base.innerText);
    const DISCOUNT_RATE = 0.2;

    let S = null;
    let compute_fare = null;

    if(roundKM == 0) {
        fare_counter.innerHTML = 0;
    }else if(between(roundKM, 0, 1.2)) {
        S = (roundKM - 1) * SUCCEEDING_FARE;
        compute_fare = S + BASE_FARE;

        _FARE = compute_fare;

        fare_counter.innerHTML = _FARE;
        off = BASE_FARE * DISCOUNT_RATE;
        DISCOUNTED_FARE = _FARE - off;
    } else {
        //MINUS 1KM NOT IMPLEMENTED
        S = Math.ceil(roundKM) * SUCCEEDING_FARE;
        console.log(S);
        compute_fare = S + BASE_FARE;

        console.log(compute_fare);
        _FARE = Math.ceil(compute_fare);

        fare_counter.innerHTML = _FARE;
        off = BASE_FARE * DISCOUNT_RATE;
        DISCOUNTED_FARE = _FARE - off;
    }
}

function StopTrip() {
    total_fare.innerHTML = _FARE;
    discounted.innerHTML = DISCOUNTED_FARE;

    var reverse = `https://api.geoapify.com/v1/geocode/reverse?lat=${CURRENT_LOCATION.latitude}&lon=${CURRENT_LOCATION.longitude}&apiKey=${geoapify}`;

    fetch(reverse).then(result => result.json())
    .then(featureCollection => {
        if(featureCollection.features.length === 0) {
            console.log('Empty');
            return;
        }

        const result = featureCollection.features[0];
        B.value = `${result.properties.formatted}`;

        if(B.value != null) {
            geolocator.clearWatch(WatchID);
            stop.disabled = true;
        }
    })
    .catch(error => console.log(error));
}

function ClearMeter() {
    geolocator.clearWatch(WatchID);
    fare_counter.innerHTML = 0;
    distance_counter.innerHTML = 0;
    discounted.innerHTML = 0;
    total_fare.innerHTML = 0;
    A.value = "";
    B.value = "";
    CURRENT_LOCATION = null;
    WatchID = null;
    watchPosCoords = [];
    firstCoords = [];
    _FARE = null;
    DISCOUNTED_FARE = null;
    off = null;
}

start.addEventListener('click', Geolocate);
stop.addEventListener('click', StopTrip);
clear.addEventListener('click', ClearMeter);