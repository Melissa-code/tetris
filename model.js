const couleurs = {
  RED: "red",
  YELLOW: "yellow",
  CYAN: "cyan",
  GREEN: "green",
  PINK: "pink",
  PURPLE: "purple",
  BLACK: "black",
};



class Bloc {
  constructor(forme, couleur, x, y) {
    this.forme = forme;
    this.couleur = couleur;
    this.x = x;
    this.y = y;
  }

  rotateClockWise() {
    // (i,j => j, nblignes-1-i    }
    let nblignes = this.forme.length;
    let nbcolonnes = this.forme[0].length;
    let rotatedForm = [];

    for (let i = 0; i < nbcolonnes; i++) {
      let ligne = [];
      for (let j = 0; j < nblignes; j++) {
        ligne.push(this.forme[nblignes - 1 - j][i]);
      }
      rotatedForm.push(ligne);
    }
    this.forme = rotatedForm;
  }

  //faire rotation d'autres blocs

  // faire sens inverse
  rotateReverseClockWise() {
    let nblignes = this.forme.length;
    let nbcolonnes = this.forme[0].length;
    let rotatedForm = [];

    for (let i = 0; i < nbcolonnes; i++) {
      let ligne = [];
      for (let j = 0; j < nblignes; j++) {
        ligne.push(this.forme[j][nbcolonnes - 1 - i]);
      }
      rotatedForm.push(ligne);
    }
    this.forme = rotatedForm;
  }
}

class Fabrique {
  nomFormes = ["L", "J", "T", "I", "N", "Z", "O"];

  /**
   * Prend le nom de la forme aléatoirement depuis nomFormes[]
   */
  randomForm() {
    // 0.99999999999999 => ]0,1[ * N => 0..N
    let indiceRandomForme = Math.floor(Math.random() * this.nomFormes.length);
    let nomFormeRandom = this.nomFormes[indiceRandomForme];

    return this.fabriquer(nomFormeRandom);
  }

  /**
   * Crée la forme (7 formes possibles)
   */
  fabriquer(nomForme) {
    if (!this.nomFormes.includes(nomForme)) {
      throw new Error("Forme inconnue");
    }

    let f = [];

    switch (nomForme) {
      case "L":
        f = [
          [1, 0],
          [1, 0],
          [1, 1],
        ];
        break;
      case "J":
        f = [
          [0, 1],
          [0, 1],
          [1, 1],
        ];
        break;
      case "T":
        f = [
          [1, 1, 1],
          [0, 1, 0],
        ];
        break;
      case "I":
        f = [[1], [1], [1], [1]];
        break;
      case "N":
        f = [
          [1, 0],
          [1, 1],
          [0, 1],
        ];
        break;
      case "Z":
        f = [
          [0, 1],
          [1, 1],
          [1, 0],
        ];
        break;
      case "O":
        f = [
          [1, 1],
          [1, 1],
        ];
        break;
      default:
        console.log("Erreur: forme ", nomForme, " inconnue.");
    }
    return f;
  }
}

class PlateauJeu {
  /**
   * Grille de jeu
   * et grille de tas
   */

  constructor(largeur, hauteur) {
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.blocQuiTombent = null;
    this.tas = [];
    for (let i = 0; i < hauteur; i++) {
      let rowTas = [];
      for (let j = 0; j < largeur; j++) {
        rowTas.push(couleurs[BLACK]);
      }
      this.tas.push(rowTas);
    }
  }

  /**
   * Crée la grille de jeu
   **/
  creerGrille() {
    let grid = document.getElementById("grid");
    let table = document.createElement("table");
    table.classList.add("tetris-grid");

    for (let i = 0; i < hauteur; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < largeur; j++) {
        let cell = document.createElement("td");
        cell.classList.add("cell");
        cell.id = i + "-" + j;
        cell.textContent = "";
        row.append(cell);
      }
      table.append(row);
    }
    grid.append(table);
  }

  /**
   * Vérifie si une ligne du tas est complète
   * si oui la supprime
   **/
  verifierSiLigneTasComplete() {
    for (let i = 0; i < this.hauteur; i++) {
      // marqueur
      let ligneComplete = true;

      for (let j = 0; j < this.largeur; j++) {
        if (this.tas[i][j] == couleurs[BLACK]) {
          ligneComplete = false;
          break;
        }
      }

      // Supprime la ligne si true
      if ((ligneComplete = true)) {
        // supprime 1 element du tableau (sur la ligne)
        this.tas.slice(i, 1);

        // Crée une ligne (un tableau)
        let nouvelleLigne = [];
        for (let k = 0; k < this.largeur; k++) {
          nouvelleLigne.push(0);
        }
        // Ajoute une ligne au debut du tableau (haut de la ligne)
        this.tas.unshift(nouvelleLigne);
      }
    }
  }

  // Gestion du tas: vider les grilles complètes
  // la forme tombe -> devient tas
  // vérifier si une ligne est complète
  /* 
        8 8 8 8 8 ajout d'une ligne vide en haut quand ligne supprimée 
        8 8 8 8 8
        8 8 8 8 8
        8 8 8 8 8
        1 1 1 1 1 ligne complète à supprimer en gardant la hauteur
        8 8 1 1 1 
        1 1 8 1 8 ligne mixte
    */

  placerBlocDansTas(bloc) {
    // le met dans le tas
    for (let i = 0; i < bloc.forme.length; i++)
      for (let j = 0; j < bloc.forme[i].length; j++) {
        if (bloc.forme[i][j] == 1) {
          this.tas[bloc.x + i][bloc.y + j] = bloc.couleur;
        }
      }
  }

  jouerBloc(action)
  {
    // modifier la position et la forme du bloc selon l'action
    // dans la limite du correct
    // action : gauche, droite, bas, rotation , rotation inverse


  }

  detecterCollision(bloc)
  {
    // teste de debordement grille
    let bloc_l = bloc.forme[0].length;
    let bloc_h = bloc.length;

    if (bloc.x<0 || bloc.y<0)
        return true;
    if ((bloc.y+bloc_h) >= this.hauteur || ((bloc.x+bloc_l)>= this.largeur))
        return true;

    // DEV teste de collision avec le tas DEV

  }
  // DEV faire un test en console du jeu 


  avancerBloc()
  {
    // avance le bloc et detecte une collision de tas

    // c'est lui qui fait appel a placerBlocDansTas

  }

  finDuJeu() {
    // tester si le tas est au bout
  }
}


