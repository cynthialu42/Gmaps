$(document).ready(function(){


    $(".submit").on("click", function(){
        event.preventDefault();
        let locationRaw = $("#location").val().trim();
        //console.log(location);
        let location = encodeURIComponent(locationRaw);
        let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDFI1PVBKzK3688DW0a84-Q4Kta5qpIQuU";
        //let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600%20Amphitheatre%20Parkway,%20Mountain%20View,%20CA&key=AIzaSyDFI1PVBKzK3688DW0a84-Q4Kta5qpIQuU";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            let lat = response.results[0].geometry.location.lat;
            let lng = response.results[0].geometry.location.lng;
            let latLng = {lat: lat, lng: lng};
            console.log(latLng);
            initMap(latLng);
        });
    });


    var map;
    var infowindow;

    function initMap(latLng) {
      var pyrmont = latLng;
      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 17
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['restaurant']
      }, callback);
    }

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
});
