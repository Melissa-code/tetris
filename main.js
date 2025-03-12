import PlateauJeu from "./models/PlateauJeu.js";
import Vue from "./Vue.js";

let plateauJeu = new PlateauJeu(10, 20); // largeur, hauteur
let vue = new Vue(plateauJeu, document, 30); // plateauJeu, document, tailleCarreau
