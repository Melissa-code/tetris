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

export default Fabrique;
