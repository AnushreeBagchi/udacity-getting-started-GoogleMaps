var map;

var markers=[];

function initmap(){
    map=new google.maps.Map(document.getElementById('map'),{
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom:13,
        styles:[{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ],
        mapTypeControl: false
    });
    
    var locations = [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ];   

    var largeInfowindow= new google.maps.InfoWindow();
    var bounds= new google.maps.LatLngBounds();
    var defaulticon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    var hovericon ='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    
    for (var i =0;i<locations.length;i++){
        var  position = locations[i].location;
        var  title= locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            title: title,
            position: position,
            animation: google.maps.Animation.DROP,
            icon: defaulticon
            // icon: {
            //     path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            //     strokeColor: "red",
            //     scale: 3
            // }
        });
        markers.push(marker);
        bounds.extend (marker.position);
        marker.addListener('click',function (){
            populateInfoWindow(this, largeInfowindow);
        });
        marker.addListener('mouseover',  function (){
            this.setIcon(hovericon);
        });
        marker.addListener('mouseout',function (){
            this.setIcon(defaulticon);
        });
        //map.fitBounds(bounds);
     }
     document.getElementById('zoom-to-area').addEventListener('click',function (){
       zoomToArea();
     });
     document.getElementById('search-within-time').addEventListener('click', function (){
      searchWithinTime();
     });

     function zoomToArea(){
      var geocoder = new google.maps.Geocoder();
      var address=  document.getElementById('zoom-to-area-text').value;
      console.log('Address='+address);
      if (address==''){
        window.alert('You must provide an address');
      }
      else{
        geocoder.geocode(
          {address:address,
          componentRestrictions : {locality:'New York'}},
          function (result, status){
            if (status== google.maps.GeocoderStatus.OK){
              formattedAddress=result[0].formatted_address;
              var  latitude=result[0].geometry.location.lat() ;
              var longitude=result[0].geometry.location.lng();

              var fa = document.getElementById('formattedAddress');
              fa.innerHTML += `Formatted Address= ${formattedAddress}`;
              var latlng= document.getElementById('latlng');
              latlng.innerHTML +=`Latitude=${latitude} , Longitude=${longitude}`;

              
              map.setCenter(result[0].geometry.location);
              map.setZoom(15);
            }else{
              window.alert('Address not reachable');
            }
          }
           );
      }
    };
    function populateInfoWindow (marker, infoWindow){
        if (infoWindow.marker!=marker)
        {
            infoWindow.marker=marker;
            infoWindow.setContent('<div>'+marker.position+'</div>');
            infoWindow.open (map, marker);
            infoWindow.addListener('click',function (){
            infoWindow.setMarker(null);
            });
            var streetViewService=  new google.maps.StreetViewService();
            var radius=50;
            streetViewService.getPanaromaByLocation (marker.position, radius,getstreetview);

            function getstreetview(){
                var nearStreetViewLocation =data.location.latlng;
                var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation,marker.position);
            }
        }
    }
    function searchWithinTime(){
        var distanceMatrixService= new google.maps.DistanceMatrixService();
        var address= document.getElementById('search-within-time-text').value;
        if (address==''){
          window.alert('Please enter an address');
        }
        else{
          var origins=[];
          for (var i=0;i<markers.length;i++){
            origins[i]=markers[i].position ;
          }
          var destination =address;
          var mode= document.getElementById('mode').value;
          distanceMatrixService.getDistanceMatrix({
            origins:origins,
            destinations:[destination],
            travelMode:   google.maps.TravelMode[mode],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          }, function (response, status){
            if(status!=google.maps.DistanceMatrixStatus.OK){
              console.log(status);
              window.alert('error was: '+status);
            }else{
              displayMarkersWithinTime(response);
            }
          });
        }
    };

    function displayMarkersWithinTime(response){
      var maxDuration = document.getElementById('max-duration').value;
      var origin = response.originAddresses;
      var destination= response.destinationAddresses;
      var atleastOne=false;
      for (var i=0;i<origin.length;i++){
        var results= response.rows[i].elements;
        for (var j=0;j<results.length;j++){
          var element = results[j];
          if (element.status==='OK'){
            var distanceText = element.distance.text;
            var duration =  element.duration.value/60;
            var durationText=element.duration.text;
            if (duration <= maxDuration){
              markers[i].setMap(map);
              atleastOne=true;
              var infowindow = new google.maps.InfoWindow({
                content: durationText + ' away, ' + distanceText +
                  '<div><input type=\"button\" value=\"View Route\" onClick =' +
                  '\"displayDirections(&quot;' + origin[i] + '&quot;);\"></input></div>'
              });
              // document.getElementById('viewRoute').addEventListener('click',function (){
              //     displayDirections(origins[i]);
              // })
              infowindow.open(map,markers[i]);
              markers[i].infowindow=infowindow;
              google.maps.event.addListener(markers[i], 'click', function() {
                this.infowindow.close();
              });
            }
          }
        }

      } }
  };
  function displayDirections(origin){
    var directionsService = new google.maps.DirectionsService();
    var destinationAddress=document.getElementById('search-within-time-text').value;
    var mode= document.getElementById('mode').value;
    directionsService.route({
      origin:origin,
      destination:destinationAddress,
      travelMode: google.maps.TravelMode[mode]
    }, function (response, status){
      if (status===google.maps.DirectionsStatus.OK)
      {
        var directionsDisplay= new google.maps.DirectionsRenderer({
          map:map,
          directions:response,
          draggabble:true,
          polylineOPtions: {strokeColor: 'green'
          }
        });
      }else{
        window.alert('direction request failed due to '+status);
      }
    });

  };


initmap();
