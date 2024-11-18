import{upload,download} from "./cache.js";
import { addMarker } from "./functions.js";
const createForm = (elem) => {
  let data;
  let element = elem;
  let callback;

  return {
      setLabels: (labels) => { data = labels; },
      setCallback: (f) => { callback = f; },
      render: () => {
          element.innerHTML = data.map((line) => 
              `<div>${line[0]}<input id="${line[0]}" type="${line[1]}"></div>`
          ).join('');
          element.innerHTML += `<button type="button" id="chiudi">Chiudi</button>`;
          element.innerHTML += `<button type="button" id="invia">Invia</button>`;

          document.getElementById("chiudi").onclick = () => {
            elem.style.display="none";
            document.getElementById("overlay").style.display="none";
          }
          
          document.getElementById("invia").onclick = () => {
              const result = data.map((name) => {
                  return document.getElementById(name[0]).value;
              });
              elem.style.display="none";
              document.getElementById("overlay").style.display="none";

              // Chiamata al callback per ottenere le coordinate 
              callback(result).then((object) => {
                  console.log(object);

                  
                  download().then((places) => {
                      places.push(object); // Aggiungiunta incidente
                      upload(places).then(() => {
                          renderMap();
                          alert("Incidente aggiunto con successo!");
                          data.map((line)=>
                            document.getElementById(line[0]).value=""
                          );
                      });
                  });
              });
          };
      },
  };
};



  /*let places = [
    {
       name: "Piazza del Duomo",
       date: "2022-03-25",
       time: "9:00",
       plates: ["AA123BB"],
       injured: 1,
       dead: 1,
       coords: [45.4639102, 9.1906426],
    }
 ];
  upload(places);*/
  let zoom = 12;
  let maxZoom = 19;
  let map = L.map('map').setView([45.4654219,9.1859243], zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: maxZoom,
  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
const renderMap = () => {
      download().then((places) => {
        places.forEach((place) => {
          const marker = L.marker(place.coords).addTo(map);
          marker.bindPopup(`
              <b>${place.name}</b><br>
              <b>Data:</b> ${place.date}<br>
              <b>Ora:</b> ${place.time}<br>
              <b>Feriti:</b> ${place.injured}<br>
              <b>Morti:</b> ${place.dead}`);
        });
      })
  }
/* 
  download().then((places) => {
    console.log(places);
      const map = L.map('map').setView([45.4654219, 9.1859243], 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  });
};*/



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
  /*const handleAddIncident = () => {
    const formContainer = document.getElementById('form');

    const formHtml = `
        <div id="incidentForm">
            <h3>Inserisci Nuovo Incidente</h3>
            <div>Indirizzo: <input id="address" type="text"></div><br>
            <div>Targhe Coinvolte: <input id="plates" type="text"></div><br>
            <div>Data e Ora: <input id="dateTime" type="datetime-local"></div><br>
            <div>Feriti: <input id="injured" type="number"></div><br>
            <div>Morti: <input id="dead" type="number"></label><br>
            <button id="saveIncidentButton">Salva Incidente</button>
        </div>
    `;

    formContainer.innerHTML = formHtml;

    document.getElementById('saveIncidentButton').onclick = () => {
        const newIncident = {
            name: document.getElementById('address').value,
            plates: document.getElementById('plates').value.split(','),
            date: document.getElementById('dateTime').value,
            injured: parseInt(document.getElementById('injured').value),
            dead: parseInt(document.getElementById('dead').value),
            coords: [45.4654219, 9.1859243], // Coordinate di default (Milano)
        };

        download().then((places) => {
            places.push(newIncident);
            console.log(places);
            upload(places).then(() => {
                addMarker(places[length(places)-1]);
                alert("Incidente aggiunto con successo!");
            });
        });
    };
};
*/

// Esporta la funzione per essere utilizzata in script.js




export{createForm,renderMap,createTable};