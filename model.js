const couleurs = {
  RED: "#ff206e",
  YELLOW: "#fbff12",
  CYAN: "#41ead4",
  GRAY: "#e0fbfc",
  BLACK: "#0c0f0a",
};

class Bloc {
  constructor(forme, couleur, x, y) {
    this.forme = forme;
    this.couleur = couleur;
    this.x = x;
    this.y = y;
  }

  /**
   * clone bloc
   */
  clone() {
    let cloneForm = JSON.parse(JSON.stringify(this.forme));
    let cloneBloc = new Bloc(cloneForm, this.couleur, this.x, this.y);
    return cloneBloc;
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

  getMaxBlocWidth()
  {
    return 4;
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
    this.vitesse = 1000;
    this.finJeu = false; 
    this.score = 0;
    this.isPaused = false;
    this.blocEnRoute = null; 

    //'BLACK' dans chaque case du tas (case vide)
    for (let i = 0; i < hauteur; i++) {
      let rowTas = [];
      for (let j = 0; j < largeur; j++) {
        rowTas.push(couleurs["BLACK"]); // OU rowTas.push(couleurs.BLACK);
      }
      this.tas.push(rowTas);
    }
    //console.table(this.tas);
    const couleursTab = Object.values(couleurs); 
    const couleurAleatoire = couleursTab[Math.floor(Math.random() * (couleursTab.length -1))];

    // Bloc constructor(forme, couleur, x, y) {}
    // bloc aléatoire à placer dans le tas
    this.fabrique = new Fabrique();
    this.blocQuiTombent = new Bloc(
      this.fabrique.randomForm(),
      couleurAleatoire,
      0,
      0
    );
    
    //bloc qui va tomber 
    this.blocEnRoute = new Bloc(
      this.fabrique.randomForm(),
      couleurAleatoire,
      0,
      0
    );

    setTimeout(()=>this.avancerBloc(), this.vitesse);
  }

  getMaxBlocWidth()
  {
    return this.fabrique.getMaxBlocWidth();
  }

  /**
   * Vérifie si une ligne du tas est complète
   * si oui on la supprime
   **/
  verifierSiLigneTasComplete() {
    let ligneComplete;
    let nbLignesSupprimees = 0; 

    for (let i = 0; i < this.hauteur; i++) {
      // marqueur
      ligneComplete = true;
    
      for (let j = 0; j < this.largeur; j++) {
        if (this.tas[i][j] == couleurs['BLACK']) {
          ligneComplete = false;
          break;
        }
      }

      // Supprime la ligne si true
      if ((ligneComplete === true)) {
        // supprime 1 element du tableau (sur la ligne)
        nbLignesSupprimees++;
        this.tas.slice(i, 1);

        // Crée une ligne (un tableau)
        let ligneComplete = [];
        for (let k = 0; k < this.largeur; k++) {
          ligneComplete.push(couleurs['BLACK']);
        }
        // Ajoute une ligne au debut du tableau (haut de la ligne)
        this.tas.unshift(ligneComplete);
      }
    }

    return nbLignesSupprimees; 

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

  deplacerBloc(deplacementFleche) {
    // modifier la position et la forme du bloc selon l'action
    // dans la limite du correct
    // action : gauche, droite, bas, rotation, rotation inverse
    // faire notre propre fonction de clonage (pour avoir les methodes en clone)
    let bloc = this.blocQuiTombent.clone();

    switch (deplacementFleche) {
      case "gauche":
        bloc.y -= 1; // gauche
        break;
      case "droite":
        bloc.y += 1; // droite
        break;
      case "haut":
        bloc.x -= 1; // haut
        break;
      case "bas":
        bloc.x += 1; // bas
        break;
      case "rotation":
        bloc.rotateClockWise();
        break;
      case "rotationInverse":
        bloc.rotateReverseClockWise();
        break;
      default:
        console.log("Action inconnue");
        return false;
    }

    if (!this.detecterCollision(bloc)) {
      this.blocQuiTombent = bloc.clone();
      return true;
      //tester si collision
    } else {
      //console.log("Il y a collision !");
      return false;
    }
  }

  /**
   * Test si collision entre bloc et tas
   * return false (pas de collision)
   */
  detecterCollision(bloc) {
    // bloc largeur et hauteur
    let bloc_h = bloc.forme[0].length;
    let bloc_l = bloc.forme.length;

    // si bloc déborde à gauche et en haut puis droite et en bas
    if (bloc.x < 0 || bloc.y < 0) return true;
    if (bloc.x + bloc_l > this.hauteur || bloc.y + bloc_h > this.largeur)
      return true;

    // Test de collision du bloc avec le tas // DEV
    for (let i = 0; i < bloc_l; i++) {
      for (let j = 0; j < bloc.forme[i].length; j++) {
        // bloc.y+i: position de ligne du bloc sur grille (check si elle existe dans grille)
        //if (bloc.forme[i][j] === 1) console.log(i,j,bloc.x + '+'+ i,bloc.y +'+'+ j)
        if (
          bloc.forme[i][j] === 1 &&
          this.tas[bloc.x + i][bloc.y + j] !== couleurs["BLACK"]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  avancerBloc() {
    //avance le bloc et detecte une collision de tas
    if(this.finJeu || this.isPaused) return;

    if (this.deplacerBloc('bas') == false) {
      this.placerBlocDansTas(this.blocQuiTombent);

      const couleursTab = Object.values(couleurs); 
      const couleurAleatoire = couleursTab[Math.floor(Math.random() * (couleursTab.length-1))];

      this.blocQuiTombent = this.blocEnRoute;
      this.blocEnRoute = new Bloc(
        this.fabrique.randomForm(),
        couleurAleatoire, 
        0,
        0
      );

      if (this.detecterCollision(this.blocQuiTombent)) {
        this.finDuJeu(); 
      }
    }
    
    let nbLignesSupprimees=this.verifierSiLigneTasComplete()
    if (nbLignesSupprimees > 0)
      this.majScore(nbLignesSupprimees);
      // supprimer la ligne quand elle est complete

    this.vitesse = 1000 - (this.score/500)*200;

    setTimeout(()=>this.avancerBloc(), this.vitesse);
    // c'est lui qui fait appel a placerBlocDansTas
  }

  finDuJeu() {
    this.finJeu = true;
    alert('Vous avez perdu.');
  }

  pauseJeu() {
    this.isPaused = true; 
  }

  reprendreJeu() {
    this.isPaused = false; 
    this.avancerBloc(); 
  }

  rejouer() {
    this.finJeu = false; 
    this.score = 0;             
    this.tas = [];              
    
    // Recrée le tas 
    for (let i = 0; i < this.hauteur; i++) {
      let rowTas = [];
      for (let j = 0; j < this.largeur; j++) {
        rowTas.push(couleurs["BLACK"]); // Cases vides
      }
      this.tas.push(rowTas);
    }

    const couleursTab = Object.values(couleurs); 
    const couleurAleatoire = couleursTab[Math.floor(Math.random() * couleursTab.length)];

    this.fabrique = new Fabrique();  
    this.blocQuiTombent = new Bloc(
      this.fabrique.randomForm(),
      couleurAleatoire,
      0,
      0
    );

    setTimeout(() => this.avancerBloc(), this.vitesse); 
  }

  /**
   * Calcule le score 
   */
  majScore(nbLignesSupprimees) {
    let pointsParLigne = 0;

    switch(nbLignesSupprimees)
    {
      case 1: pointsParLigne=100;
      break;
      case 2: pointsParLigne=110;
      break;
      default: pointsParLigne=120;
    }
    
    this.score += nbLignesSupprimees * pointsParLigne;
    //console.log("Score: ", this.score);
  }
}
