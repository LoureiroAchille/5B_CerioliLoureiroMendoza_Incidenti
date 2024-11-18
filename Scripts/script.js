import{upload,download} from "./cache.js";
import {getCoordinates} from "./functions.js";
import {createForm,createTable,renderMap} from "./components.js";

let places = [];

download().then((data) => {places = data});

const form = createForm (document.getElementById("form"));
form.setLabels([["Luogo","text"],["Targhe","text"],["Data","date"],["Ora","time"],["Feriti","number"],["Morti","number"]]);
form.render();
form.setCallback(getCoordinates);

createTable();

renderMap();

const modale = document.getElementById("modale");

modale.onclick = () => {
    document.getElementById("form").style.display="block";
    document.getElementById("overlay").style.display="block";

}