class Vue {

    constructor(plateauJeu, document, tailleCarreau) {
        this.plateauJeu = plateauJeu;
        this.myCanva = document.getElementById("myCanvas");; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");

        this.width = this.plateauJeu.largeur * tailleCarreau;
        this.height = this.plateauJeu.hauteur * tailleCarreau;
        this.myCanva.width = this.width; 
        this.myCanva.height = this.height; 

        this.initControl(document);
        this.refresh();
                
        //this.scoreElement = document.getElementById("score"); 
        this.initPauseButton(document);
    }

    initControl(document)
    {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.plateauJeu.deplacerBloc('gauche');               
            } else if (event.key === 'ArrowRight') {
                console.log(this.plateauJeu)
                this.plateauJeu.deplacerBloc('droite');
            } else if (event.key === 'ArrowDown') {
                this.plateauJeu.deplacerBloc('bas');
            } else if (event.key === 'ArrowUp') {
                this.plateauJeu.deplacerBloc('rotation');
            }
            this.refresh();
        });
    }

    refresh()
    {
        this.displayGrid();
        this.displayTas();
        this.displayBloquesTombe();
        setTimeout(()=>this.refresh(), 200);
    }

    displayGrid() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = '#555555';

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
        //console.table(this.plateauJeu.tas); 
    }

    displayBloquesTombe()
    {
        let bloc = this.plateauJeu.blocQuiTombent;
        for (let i = 0; i < bloc.forme.length; i++)
            for (let j = 0; j < bloc.forme[i].length; j++) {
              if (bloc.forme[i][j] == 1) {
                this.ctx.fillStyle = bloc.couleur; 
                this.ctx.fillRect((j+bloc.y) * this.tailleCarreau +1, (i+bloc.x) * this.tailleCarreau +1, this.tailleCarreau -2, this.tailleCarreau -2); 
              }
            }
    }

    /**
     * Mettre en pause le jeu 
     * ou le relancer
     */
    initPauseButton(document) {

        const pauseButton = document.getElementById("pauseButton");

        pauseButton.addEventListener('click', () => {
            if (this.plateauJeu.isPaused) {
                this.plateauJeu.reprendreJeu(); 
                pauseButton.textContent = 'Pause'; 
            } else {
                this.plateauJeu.pauseJeu(); 
                pauseButton.textContent = 'Reprendre'; 
            }
        });
    }

    // updateScore() {
    //     if (this.scoreElement) {
    //         this.scoreElement.textContent = `Score: ${this.plateauJeu.score || 0}`;
    //     }
    // }
}