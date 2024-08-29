class Vue {

    constructor(plateauJeu, myCanva, tailleCarreau) {
        this.plateauJeu = plateauJeu;
        this.myCanva = myCanva; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");

        this.width = this.plateauJeu.largeur * tailleCarreau;
        this.height = this.plateauJeu.hauteur * tailleCarreau;
        this.myCanva.width = this.width; 
        this.myCanva.height = this.height; 

        this.displayGrid();
        this.displayTas();
    }


    displayGrid() {
        this.ctx.fillStyle='black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle='#555555';

        //this.ctx.strokeRect(50,50,100,200);
        for (let i = 0; i < this.plateauJeu.hauteur; i++) {
            for (let j = 0; j < this.plateauJeu.largeur; j++) {

                this.ctx.strokeRect(j * this.tailleCarreau, i * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau); 
            }
        }
    }

    displayTas() {
        for (let i = 0; i < this.plateauJeu.hauteur; i++) {
            for (let j = 0; j < this.plateauJeu.largeur; j++) {

                this.ctx.fillStyle = this.plateauJeu.tas[i][j]; 
                this.ctx.fillRect(j * this.tailleCarreau +1, i * this.tailleCarreau +1, this.tailleCarreau -2, this.tailleCarreau -2); 
            }
        }
        console.table(this.plateauJeu.tas); 
    }
}