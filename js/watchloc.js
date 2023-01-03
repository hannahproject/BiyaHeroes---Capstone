const displayMap = document.querySelector('#map');
const btns = document.getElementsByClassName('geo-btn');
const pickupbtn = document.querySelector('#pick-up-btn');
const dropoffbtn = document.querySelector('#drop-off-btn');

const distance = document.querySelector('#display-distance');
const KM = document.querySelector('#km');
const calculate = document.querySelector('#calculate');
const discount = document.querySelector('#discount');

var CURRENT_LOC = null;

const defaultLoc = {
    lat: 14.3036,
    lng: 121.0781
};

const options = {
    zoom: 12,
    center: defaultLoc
};

function initMap() {
    var map = new google.maps.Map(displayMap, options);
    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();

    pickupbtn.addEventListener('click', function() {
        getLocs(map, geocoder, directionsService);
    })

    dropoffbtn.addEventListener('click', function() {
        getLocs(map, geocoder, directionsService);
    })
}

//COORDINATES VALUES WILL BE STORED HERE
var storage = [];

function getLocs(map, geocoder, directionsService) {

    const successCallback = (pos) => {
        CURRENT_LOC = pos.coords;
        var lat = CURRENT_LOC.latitude;
        var lng = CURRENT_LOC.longitude;

        reverse (lat, lng);
    }

    const reverse = (lat, lng) => {
        var A = null;
        var B = null;

        const pointA = document.querySelector('#latlng-pickup');
        const pointB = document.querySelector('#latlng-dropoff');

        const latlng = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        }

        geocoder.geocode({location:latlng})
                .then((response) => {
                if (response.results[0]) {
            
                    const marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                    });

                    //PUSH THE RESULTS INSIDE THE STORAGE
                    storage.push(response.results);

                    //THE FIRST VALUE INSIDE THE STORAGE IS THE POINT A
                    if(storage.length === 1) {
                        document.getElementById('pick-up').setAttribute('value', storage[0][0].formatted_address);
                        pointA.value = storage[0][0].formatted_address;
                    } else {
                        //THE NEXT VALUE TO BE PUSHED INSIDE THE STORAGE IS THE POINT B
                        document.getElementById('drop-off').setAttribute('value', storage[1][0].formatted_address);
                        pointB.value = storage[1][0].formatted_address;
                    }

                    if(pointA.value !== "") {

                        //DISABLES THE PICKUP BTN ONCE IT HAS A VALUE
                        pickupbtn.disabled = true;

                        //DROPOFF BTN IS NULL AND CAN ONLY BE ENABLED WHEN POINT IS ALREADY SET
                        dropoffbtn.disabled = false;
                    } 
                    
                    if(pointB.value !== "") {

                        //DISABLES THE DROPOFF BTN ONCE IT HAS A VALUE
                        dropoffbtn.disabled = true;
                    } 
                    
                    if (pointA.value !== "" && pointB.value !== "") {
                        A = pointA.value;
                        B = pointB.value;
                        getRoute(A,B);
                    }
                    
                } else {
                    window.alert("No results found");
                }
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e)); 
    }

    const getRoute = (A,B) => {
        var render = new google.maps.DirectionsRenderer({suppressMarkers: true});

        render.setMap(map);

        var request = {
            origin: A,
            destination: B,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(request, (result, status) => {
            if(status == 'OK') {
                render.setDirections(result);

                const COMPUTED_DISTANCE = result.routes[0].legs[0].distance.text;
                distance.innerHTML = COMPUTED_DISTANCE;
                KM.value = COMPUTED_DISTANCE;

                calculateFare(COMPUTED_DISTANCE);
            }
        });
    }

    const errorCallback = (err) => {
        console.log(err);
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    if(navigator.geolocation) {
        const watchID = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

        const clr = document.querySelector('#clear');
        clr.addEventListener('click', function() {
            console.log("Hi!");
            navigator.geolocation.clearWatch(watchID);
        })
    } else {
        alert("Not Supported");
    }
}

function calculateFare(COMPUTED_DISTANCE) {
    //REMOVES THE KM SIGN AT THE END OF THE COMPUTED_DISTANCE
    var NEW_COMPUTED_DISTANCE = COMPUTED_DISTANCE.slice(0, -2);
    var METER = 1000;
    const display_fare = document.querySelector('#fare');

    //CONVERTS DISTANCE TO METERS
    var CONVERTED_DIST = NEW_COMPUTED_DISTANCE * METER; 

    var FARE = null;
    var DISCOUNTED_FARE = null;
    const FIRST_MTR = 0.015;
    const SUCCEEDING_MTRS = 0.002;
    const BASE_FARE = 15;
    const DISCOUNT_RATE = 0.2;

    calculate.addEventListener('click', function() {

        if(CONVERTED_DIST <= 1000) {
            display_fare.innerHTML = BASE_FARE;
        } else {
            var EXCESS = CONVERTED_DIST - METER;
            FARE = (EXCESS * SUCCEEDING_MTRS) + BASE_FARE;
            var off = FARE * DISCOUNT_RATE;
            DISCOUNTED_FARE = FARE - off;

            display_fare.innerHTML = Math.ceil(FARE);
            discount.innerHTML = Math.ceil(DISCOUNTED_FARE);
        }

    });
}





