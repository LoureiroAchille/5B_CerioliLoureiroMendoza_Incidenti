import{upload,download} from "./cache.js";
import {getCoordinates} from "./functions.js";
import {createForm,createTable,renderMap,createLogin} from "./components.js";

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
const loginContainer = document.getElementById("loginContainer");
const login = createLogin(loginContainer);
login.render();

const addIncidentButton = document.getElementById("modale");
if (!login.isUserLoggedIn()) {
  addIncidentButton.style.display = "none";
}



if (login.isUserLoggedIn()) {
    document.getElementById("modale").style.display = "block";
  }
  