/*import { ENGINE_METHOD_ALL } from "constants";*/


let map = L.map('map').setView([44.4773, -73.214], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    
    
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([43.942425, -72.697804]).addTo(map);

fetch("all.json")
.then(connection => {return connection.json()} )
.then(json => {
    json.map(j => fetch(`${j}.json`)
                    .then(result => {return result.json()})
                    .then(r => addResturants(r)));
});



function addResturants(displayResturant) {
    const resturant = document.getElementById('addResturant')
    const resturantName = document.createElement('h2')
    const resturantStreet = document.createElement('h5')
    const resturantCity = document.createElement('h3')
    const resturantState = document.createElement('h4')
    const resturantPhone = document.createElement('h4')
    const resturantEmail = document.createElement('h4')
    const resturantWebsite = document.createElement('h5')
    const resturantHours = document.createElement('h3')
      
     resturantName.textContent = displayResturant.name;
     resturantStreet.textContent = displayResturant.street;
     resturantCity.textContent = displayResturant.city;
     resturantState.textContent = displayResturant.state;
     resturantPhone.textContent = displayResturant.phone;
     resturantEmail.textContent = displayResturant.email;
     resturantWebsite.textContent = displayResturant.website;
     resturantHours.textContent = displayResturant.hours;
     
     resturant.appendChild(resturantName)
     resturant.appendChild(resturantStreet)
     resturant.appendChild(resturantCity)
     resturant.appendChild(resturantState)
     resturant.appendChild(resturantPhone)
     resturant.appendChild(resturantEmail)
     resturant.appendChild(resturantWebsite)
     resturant.appendChild(resturantHours)

     addMarkers(displayResturant);
}
function addMarkers(restaurant){
    console.log('running addMarkers')
    fetch(`https://nominatim.openstreetmap.org/search/?q=${restaurant.address}&format=json`)
    .then(response => { return response.json() } ) 
    .then(json => {
        console.log(json[0].lat);
        let lat = json[0].lat; 
        let lon = json[0].lon;
        let latLon = [lat, lon];
        restaurant.latLon = latLon;
        console.log(restaurant)
        let marker = L.marker(latLon).addTo(map);
        marker.bindPopup(`<b>${restaurant.name}</b>`)
    })
}



