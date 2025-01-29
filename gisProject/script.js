var distance, duration, price;

var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var prices = 1.7;

map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: -6.2989261,
        lng: 107.1659952
    },
    zoom: 16
});
directionsDisplay.setMap(map);

const nbhaha = { lat: -6.298635, lng: 107.1661247 }; 
const pupr = { lat: -6.285163, lng: 107.1707159 }; 
const marker = new google.maps.Marker({  position: nbhaha,  map: map, });
const marker2 = new google.maps.Marker({  position: pupr,  map: map, });

var start = document.getElementById('start');
var searchStart = new google.maps.places.SearchBox(start);
var end = document.getElementById('end');
var searchEnd = new google.maps.places.SearchBox(end);
var nama = document.getElementById('nama');
var phone = document.getElementById('phone');
var product = document.getElementById('product');

var province = document.getElementById('province');

var detail = document.getElementById('detail');

var pesanStart = document.getElementById('check-btn');

// var originpoint = 

function findRoute() {
    var startAddress = start.value;
    var endAddress = end.value;
    console.log(startAddress);
    var namee = nama.value;
    var phonee = phone.value;
    var productt = product.value;
    var provinces = province.value;

    var request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            // console.log(result);
            // console.log(result.routes[0].legs[0].distance.text);
            // console.log(result.routes[0].legs[0].distance.value);

            distance = document.getElementById('distance').innerHTML = result.routes[0].legs[0].distance.text;
            console.log('Distance: ' + distance);
            duration = document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;
            console.log('Duration: ' + duration);
            price = document.getElementById('price').innerHTML = result.routes[0].legs[0].distance.value *
                prices;
                console.log('Price: ' + price);

            detail.style.display = 'block';
        } else {
            detail.style.display = 'none';
            alert('Directions failed to load, please enter the correct address!');
        }
        console.log('Price: ' + price);


        // Function mengirim data input user ke file php
    fetch('saveOrder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'nama': namee,
            'phone': phonee,
            'product': productt,
            'start': startAddress,
            'end': endAddress,
            'distance': distance,
            'duration': duration,
            'price': price,
            'province': provinces,
            
            
        }),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

    });
}

check.addEventListener("click", function (event) {
    if (start.value.trim() != "" && end.value.trim() != "") {
        event.preventDefault();
        findRoute();
    }
});