import{upload,download} from "./cache.js";
import {getCoordinates} from "./functions.js";
import {createForm,createTable,renderMap,createLogin} from "./components.js";

let places = [];

download().then((data) => {places = data});

const form = createForm (document.getElementById("form"));
form.setLabels([["Luogo","text"],["Targhe","text"],["Data","date"],["Ora","time"],["Feriti","number"],["Morti","number"]]);
form.render();
form.setCallback(getCoordinates);

const log = createLogin (document.getElementById("loginContainer"))
log.setLabels([["Username","text"],["Password","password"]]);
log.render();

console.log(document.cookie)

if (Cookies.get('Username')!="" && Cookies.get('Password')!="") {
  document.getElementById("modale").style.display = "block";
}


createTable();

renderMap();

const modale = document.getElementById("modale");

modale.onclick = () => {
    document.getElementById("form").style.display="block";
    document.getElementById("overlay").style.display="block";
}

const login = document.getElementById("login");

login.onclick = () => {
    document.getElementById("loginContainer").style.display="block";
    document.getElementById("overlay").style.display="block";
}