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

export default Bloc;
