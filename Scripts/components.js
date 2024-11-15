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
    /*upload([
   {
      name: "Piazza del Duomo",
      coords: [45.4639102, 9.1906426],
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
]);*/
    download().then((places) => {
        places.forEach((place) => {
            console.log(place);
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.name}</b><b>${place.name}</b><b>${place.name}</b>`);
        });
    })
}

function createTable() {
    const container = document.getElementById('form');
  
    // Scarica dati
    download().then((places) => {
      //Crea la tabella
      let tableHtml = `
        <input type="text" id="FiltroInput" placeholder="Cerca per indirizzo">
        <button id="Button">Filtra</button>
        <table>
          <thead>
            <tr>
              <th>Indirizzo</th>
              <th>Data e Ora</th>
              <th>Targhe Coinvolte</th>
              <th>Feriti</th>
              <th>Morti</th>
            </tr>
          </thead>
          <tbody id="tabella_aggiornata">
            ${places.map((place) => `
              <tr>
                <td>${place.name}</td>
                <td>${place.date}</td>
                <td>${(place.plates).join(', ')}</td>
                <td>${place.injured}</td>
                <td>${place.dead}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      container.innerHTML = tableHtml;
  
      // filtra i dati della tabella
      document.getElementById('Button').onclick = () => {
        const filter = document.getElementById('FiltroInput');
        const filteredPlaces = posti.filter(place => place.name.includes(filter));
  
        //tabella aggiornata
        const tbody = document.getElementById('tabella_aggiornata');
        tbody.innerHTML = filteredPlaces.map((place) => `
          <tr>
            <td>${place.name}</td>
            <td>${place.date}</td>
            <td>${(place.plates).join(', ')}</td>
            <td>${place.injured}</td>
            <td>${place.dead}</td>
          </tr>
        `).join('');
      };
    });
  }




export{createForm,renderMap,createTable};