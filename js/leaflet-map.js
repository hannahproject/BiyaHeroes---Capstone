//BUTTONS AND INPUTS
const btn1 = document.getElementById('pick-up-btn');
const btn2 = document.getElementById('drop-off-btn');
const pickup = document.getElementById('pick-up');
const dropoff = document.getElementById('drop-off');
const start = document.getElementById('start');
const _stop = document.getElementById('stop');
const msg = document.getElementById('message');

const distance = document.getElementById('distance');
const fare = document.getElementById('fare');
const discount = document.getElementById('discount');

//MAP VARIABLES
geolocator = navigator.geolocation;
CURRENT_LOCATION = null;
var FROM = null;
var TO = null;
var WatchID = null;
var route = null;

//GEOAPIFY
const geoapify = '9a505c840dbb420c94615cc446b4e3fd';

// LEAFLET
var map = L.map('map').setView([14.3391, 121.0840], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    zoom: 13,
    minZoom: 11,
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'images/route-mark.svg',
    iconSize: [12, 12]
});

var group = L.layerGroup().addTo(map);
var route = null;
var polyline = null;

//GEOLOCATION
function Geolocate() {
    
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    }

    if(!geolocator) {
        alert("Your browser do not support geolocation.");
    } else {
        WatchID = geolocator.watchPosition(onSuccess, onError, options);
    }

}

var ARR_CURRENT_LOCS = [];
var unique = [];

function onSuccess(pos) {
    CURRENT_LOCATION = pos.coords;

    var coords = [CURRENT_LOCATION.latitude, CURRENT_LOCATION.longitude];
    
    //PUSH THE COORDINATES TO A MULTIDIMENSIONAL ARRAY
    ARR_CURRENT_LOCS.push(coords);

    if(ARR_CURRENT_LOCS.length > 0) {
        GetCoords();
    }

    var message = 'Your location is currently being observed.';
    PositionA();
    SuccessMessage(message);
}

function onError(err) {
    var message = err.message;
    ErrorMessage(message);
}

var lastChild = null;
var firstChild = null;
var nextChild = null;

function GetCoords() {

    ARR_CURRENT_LOCS.forEach((loc) => {
        if(!unique.includes(loc)) {

            //PUSHES THE NEW COORDINATES
            unique.push(loc);
        } else {

            //DELETES SIMILAR OR REPEATING COORDINATES
            unique.pop(loc);
        }
    });

    //POSITION A
    firstChild = unique[0];

    //POSITION B
    lastChild = unique.slice(-1);

    //NEXT ELEMENT
    for (let i = 0; i < unique.length; i++) {
        nextChild = unique[i-1];
        // console.log(nextChild[0][1]);
    }

    if(firstChild !== null) {
        console.log(nextChild);
    }

    // if(lastChild !== null) {
    //     for (var i = 0; i < unique.length; i++) {
    //         var marker = new L.marker([unique[i][0], unique[i][1]], {icon: myIcon}).addTo(group);
    //     }
    //     var latLngs = [ marker.getLatLng() ];
    //     var markerBounds = L.latLngBounds(latLngs);
    //     map.fitBounds(markerBounds, {maxZoom: 17});
    // }

    DisplayRoute();
}

var locations = {};

function PositionA() {
    FROM = firstChild;
    
    //STORES POSITION A COORDINATES
    locations['FROM_LatLng'] = FROM;
    ReverseGeocodeFrom();
}

function ReverseGeocodeFrom() {

    if('FROM_LatLng' in locations) {
        
        //ADD MARKER A TO MAP
        var MARKER_A = L.marker([locations.FROM_LatLng[0], locations.FROM_LatLng[1]]).addTo(group);
        map.addLayer(MARKER_A);

        var reverse = `https://api.geoapify.com/v1/geocode/reverse?lat=${locations.FROM_LatLng[0]}&lon=${locations.FROM_LatLng[1]}&apiKey=${geoapify}`;

        fetch(reverse).then(result => result.json())
        .then(featureCollection => {
            if(featureCollection.features.length === 0) {
                console.log('Empty');
                return;
            }

            const result = featureCollection.features[0];
            pickup.value = `${result.properties.formatted}`;
        })
        .catch(error => console.log(error));
    }
}

function PositionB() {
    TO = CURRENT_LOCATION;

    locations['TO_LatLng'] = TO;
    ReverseGeocodeTo();

    var message = 'Press Stop button to turn off Geolocation.';
    SuccessMessage(message);
}

function ReverseGeocodeTo() {

    if('TO_LatLng' in locations) {
        //ADD MARKER B TO MAP
        var MARKER_B = L.marker([locations.TO_LatLng.latitude, locations.TO_LatLng.longitude], {}).addTo(group);
        map.addLayer(MARKER_B);  

        var reverse = `https://api.geoapify.com/v1/geocode/reverse?lat=${locations.TO_LatLng.latitude}&lon=${locations.TO_LatLng.longitude}&apiKey=${geoapify}`;

        fetch(reverse).then(result => result.json())
        .then(featureCollection => {
            if(featureCollection.features.length === 0) {
                console.log('Empty');
                return;
            }

            const result = featureCollection.features[0];
            dropoff.value = `${result.properties.formatted}`;
        })
        .catch(error => console.log(error));
    }
}

var dist = null;
var KM = null;
var roundKM = null;
var _FARE = null;
var DISCOUNTED_FARE = null;

var line = null;

function DisplayRoute() {

    if('FROM_LatLng' in locations) {

        route = L.Routing.control({
            waypoints: [
                //POINT A
                L.latLng(nextChild),
                //POINT B
                L.latLng(lastChild[0][0], lastChild[0][1])
            ],
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            lineOptions: {
                styles: [{
                    color: '#FD5F00', 
                    opacity: 1, 
                    weight: 3}]
             },
             createMarker: function () {
                return false;
             }
        }).addTo(map);

        const dist = geolib.getPreciseDistance(
            {
                latitude: locations.FROM_LatLng[0], 
                longitude: locations.FROM_LatLng[1]
            },
            {
                latitude: lastChild[0][0], 
                longitude: lastChild[0][1]
            }
        );

        KM = geolib.convertDistance(dist, 'km'); 
        roundKM = Math.round(KM * 100) / 100;
        distance.innerHTML = roundKM;

        const SUCCEEDING_MTRS = 0.002;
        const BASE_FARE = 15;
        const DISCOUNT_RATE = 0.2;
        _FARE = null;
        DISCOUNTED_FARE = null;
    
        //THE FARE METER WILL ONLY START CALCULATING IF POSITION B HAS BEEN SET
        if(lastChild !== null) {
            if(dist <= 1050) {
                fare.innerHTML = BASE_FARE;
                var off = BASE_FARE * DISCOUNT_RATE;
                DISCOUNTED_FARE = BASE_FARE - off;
        
                discount.innerHTML = Math.ceil(DISCOUNTED_FARE);
            } else {
        
                var METER = 1000;
        
                var EXCESS = dist - METER;
                _FARE = (EXCESS * SUCCEEDING_MTRS) + BASE_FARE;
        
                var off = _FARE * DISCOUNT_RATE;
                DISCOUNTED_FARE = _FARE - off;
        
                fare.innerHTML = Math.ceil(_FARE);
                discount.innerHTML = Math.ceil(DISCOUNTED_FARE);
            }
        }

    } else {
        console.log('Waiting for Position A to be set');
    }
}

function Clear() {
    
    geolocator.clearWatch(WatchID);
    map.setView([14.3391, 121.0840], 13);

    CURRENT_LOCATION = null;
    unique = [];
    nextChild = null;
    lastChild = [];
    ARR_CURRENT_LOCS = [];

    if(group != null) {
        group.clearLayers();
    }

    if(route != null) {
        map.removeControl(route);
    }

    dist = null;
    KM = null;
    roundKM = null;
    _FARE = null;
    DISCOUNTED_FARE = null;

    distance.innerHTML = 0;
    fare.innerHTML = 0;
    discount.innerHTML = 0;

    var message = 'Turn on your Geolocator to monitor your distance and fare.';
    DefaultMessage(message);
}

function SuccessMessage(message) {
    msg.className = 'on';
    msg.innerHTML = message;
}

function ErrorMessage(message) {
    msg.className = 'off';
    msg.innerHTML = message;
}

function DefaultMessage(message) {
    msg.className = 'default';
    msg.innerHTML = message;
}

btn1.addEventListener('click', Geolocate);
btn2.addEventListener('click', PositionB);
_stop.addEventListener('click', Clear);