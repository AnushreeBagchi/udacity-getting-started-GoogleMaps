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
    
    var locations =[{title: 'Park Ave Penthouse', location :{lat:40.7713024 ,lng:-73.9632393 }},  
      {title: 'tribeca', location :{lat:40.719526,lng:-74.0089934}},
      {title:'Bondi Beach',location :{lat:-33.890542,lng:151.274856}},
      {title:'Cronulla Beach',location :{lat:-34.028249,lng: 151.157507}},
      {title:'Manly Beach',location :{lat:-33.80010128657071,lng:151.28747820854187}},
      {title:'Maroubra Beach',location :{lat:-33.950198,lng:151.259302}},
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
    function populateInfoWindow (marker, infoWindow){
        if (infoWindow.marker!=marker)
        {
            infoWindow.marker=marker;
            infoWindow.setContent('<div>'+marker.position+'</div>');
            infoWindow.open (map, marker);
            infoWindow.addListener('click',function (){
            infoWindow.setMarker(null);

            });
        }
    }
}

initmap();