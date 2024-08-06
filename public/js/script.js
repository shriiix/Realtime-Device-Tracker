const socket = io(); 

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{

        const {latitude, longitude}= position.coords;
        socket.emit("send-location",{latitude,longitude});

    },
    (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        timeout:4000,//milisecond
        maximumAge: 0,
    }
)
}

const map = L.map("map").setView([0, 0],25) //location map

//worldMap 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "shri Map"
}).addTo(map)

const markers = {};

socket.on("recieve-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude])
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
});

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
