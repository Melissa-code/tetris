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

  /**
   * Tourne le bloc dans le sens des aiguilles d'une montre 
   */
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

   /**
   * Tourne le bloc dans le sens inverse des aiguilles d'une montre 
   */
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


/**
 * grille du jeu, où les blocs tombent, se déplacent et se fixent dans un tas 
 */
class PlateauJeu {

  constructor(largeur, hauteur) {
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.blocQuiTombent = null;
    this.tas = [];

    //'BLACK' dans chaque case du tas (case vide)
    for (let i = 0; i < hauteur; i++) {
      let rowTas = [];
      for (let j = 0; j < largeur; j++) {
        rowTas.push(couleurs['BLACK']); // OU rowTas.push(couleurs.BLACK);
      }
      this.tas.push(rowTas);
    }

    // Bloc constructor(forme, couleur, x, y) {}
    // bloc aléatoire à placer dans le tas
    let fabrique = new Fabrique();
    let bloc = new Bloc(fabrique.randomForm(), couleurs['YELLOW'], 0, 0);
    this.placerBlocDansTas(bloc);

    // blocs placés dans le tas
    this.tas[5][6] = couleurs['RED'];
    this.tas[1][6] = couleurs['PINK'];

  }

  /**
   * Vérifie si une ligne du tas est complète
   * si oui on la supprime
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

  placerBlocDansTas(bloc) {
    for (let i = 0; i < bloc.forme.length; i++)
      for (let j = 0; j < bloc.forme[i].length; j++) {
        if (bloc.forme[i][j] == 1) {
            // couleur dans le tas 
          this.tas[bloc.x + i][bloc.y + j] = bloc.couleur;
        }
      }
  }

  jouerBloc(deplacementFleche)
  {
    // modifier la position et la forme du bloc selon l'action
    // dans la limite du correct
    // action : gauche, droite, bas, rotation , rotation inverse
    let bloc = new Bloc(this.bloc.forme, this.bloc.couleur, this.bloc.x, this.bloc.y);
    console.log(bloc)
    
    switch (deplacementFleche) {
      case 'gauche':
        bloc.x -= 1; // gauche
        break;
      case 'droite':
        bloc.x += 1; // droite
        break;
      case 'haut':
        bloc.y -= 1; // haut
        break;
      case 'bas':
        bloc.y += 1; // bas
        break;
      case 'rotation':
        bloc.rotateClockWise(); 
        break;
      case 'rotationInverse':
        bloc.rotateReverseClockWise(); 
        break;
      default:
        console.log("Action inconnue");
        return;
    }

    //tester si collision 
  }

 
  /**
   * Test si collision entre bloc et tas 
   * return false (pas de collision)
   */
  detecterCollision(bloc)
  {
    // bloc largeur et hauteur  
    let bloc_l = bloc.forme[0].length;
    let bloc_h = bloc.forme.length;

    // si bloc déborde à gauche et en haut puis droite et en bas 
    if (bloc.x < 0 || bloc.y < 0) return true; 
    if ((bloc.x + bloc_l) > this.largeur || (bloc.y + bloc_h) > this.hauteur) return true;

    // Test de collision du bloc avec le tas
    for (let i = 0; i < bloc.forme.length; i++) {
      for (let j = 0; j < bloc.forme[i].length; j++) {
          // bloc.y+i: position de ligne du bloc sur grille (check si elle existe dans grille)
          if (bloc.forme[i][j] === 1 && this.tas[bloc.y + i] && this.tas[bloc.y + i][bloc.x + j] !== couleurs['BLACK']) {
              return true;
          }
      }
    }

    return false; 
  }

  // DEV: Faire un test en console du jeu (voir index.html)


  avancerBloc()
  {
    // avance le bloc et detecte une collision de tas

    // c'est lui qui fait appel a placerBlocDansTas

  }

  finDuJeu() {
    // tester si le tas est au bout
  }
}




