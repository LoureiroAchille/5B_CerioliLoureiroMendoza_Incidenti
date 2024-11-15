import{upload,download} from "./cache.js";

const createForm=(elem)=>{
    let data;
    let element=elem;
    let callback;
    return{
        setLabels: (labels) => { data = labels; },
        setCallback: (f) => { callback = f; },
        render: () => { 
            element.innerHTML=data.map((line)=>`<div>${line[0]}<input id="${line[0]}" type="${line[1]}"></div>`).join("");
            element.innerHTML += `<button type="button" id="invia"> Invia </button>`;  
            document.getElementById("invia").onclick = () => {
                const result = data.map((name) => {return document.getElementById(name[0]).value});
                callback(result).then((object) => {
                    console.log(object);
                    download().then((places) => {
                        console.log(places);
                        places.push(object);
                        upload(places).then(renderMap);
                        
                    })
                });
            }
        },        
    };
};

let zoom = 12;
let maxZoom = 19;
let map = L.map('map').setView([45.4654219,9.1859243], zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: maxZoom,
attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const renderMap = () => {
    upload([
        {
           name: "Piazza del Duomo",
           coords: [45.4639102, 9.1906426]
        },
        {
           name: "Darsena",
           coords: [45.4536286, 9.1755852]
        },
        {
           name: "Parco Lambro",
           coords: [45.4968296, 9.2505173]
        },
        {
           name: "Stazione Centrale",
           coords: [45.48760768, 9.2038215]
        }
     ]);
    download().then((places) => {
        places.forEach((place) => {
            console.log(place);
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.name}</b>`);
        });
    })
}

export{createForm,renderMap};