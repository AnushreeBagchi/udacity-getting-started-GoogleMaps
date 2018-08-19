var map;

function initmap(){
    map=new google.maps.Map(document.getElementById('map'),{
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom:13
    });
    var tribeca={lat: 40.719526,lng:-74.0089934} ;
    var marker = new google.maps.Marker ({
        position : tribeca,
        map: map,
        title: 'First marker'
    });

    var infowindow= new google.maps.InfoWindow({
        content: 'Random content for infowindow'
    });
    marker.addListener('click', function (){
        infowindow.open(map,  marker);
    });
}

initmap();