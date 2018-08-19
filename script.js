var map;

var markers=[];

function initmap(){
    map=new google.maps.Map(document.getElementById('map'),{
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom:13
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

    for (var i =0;i<locations.length;i++){
        var  position = locations[i].location;
        var  title= locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            title: title,
            position: position
        });
        console.log(marker.title);
        markers.push(marker);
        bounds.extend (marker.position);
        marker.addListener('click',function (){
            populateInfoWindow(this, largeInfowindow);
        });
        //map.fitBounds(bounds);
     }
    console.log(markers);
    function populateInfoWindow (marker, infoWindow){
        if (infoWindow.marker!=marker)
        {
            infoWindow.marker=marker;
            infoWindow.setContent('<div>'+marker.title+'</div>');
            infoWindow.open (map, marker);
            infoWindow.addListener('click',function (){
                infoWindow.setMarker(null);

            });
        }
    }
}

initmap();