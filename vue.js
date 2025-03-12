class Vue {

    constructor(plateauJeu, document, tailleCarreau) {
        this.plateauJeu = plateauJeu;
        this.myCanva = document.getElementById("myCanvas");; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");

        this.width = this.plateauJeu.largeur * tailleCarreau;
        this.height = this.plateauJeu.hauteur * tailleCarreau;
        this.myCanva.width = this.width + (this.plateauJeu.getMaxBlocWidth()*tailleCarreau); 
        this.myCanva.height = this.height; 

        this.initControl(document);
        this.refresh();
                
        this.scoreElement = document.getElementById("score"); 

        this.initPauseButton(document);
        this.initRestartButton(document); 
    }

    initControl(document) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.plateauJeu.deplacerBloc('gauche');               
            } else if (event.key === 'ArrowRight') {
                this.plateauJeu.deplacerBloc('droite');
            } else if (event.key === 'ArrowDown') {
                this.plateauJeu.deplacerBloc('bas');
            } else if (event.key === 'ArrowUp') {
                this.plateauJeu.deplacerBloc('rotation');
            }
            this.refresh();
        });
    }

    refresh() {
        this.displayGrid();
        this.displayTas();
        this.displayBloquesTombe();
        this.displayBloqueEnRoute();
        this.updateScore();
        setTimeout(()=>this.refresh(), 200);
    }

    displayGrid() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.myCanva.width, this.myCanva.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = '#5c6b73';

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

    displayBloqueEnRoute()
    {
        let bloc = this.plateauJeu.blocEnRoute;
        for (let i = 0; i < bloc.forme.length; i++)
            for (let j = 0; j < bloc.forme[i].length; j++) {
              if (bloc.forme[i][j] == 1) {
                this.ctx.fillStyle = bloc.couleur; 
                this.ctx.fillRect((j+bloc.y+this.plateauJeu.largeur) * this.tailleCarreau +1, (i+bloc.x) * this.tailleCarreau +1, this.tailleCarreau -2, this.tailleCarreau -2); 
              }
            }
    }

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

    initRestartButton(document) {
        const restartButton = document.getElementById("restartButton");

        restartButton.addEventListener('click', () => {
            this.plateauJeu.rejouer(); 
        });
    }

    updateScore() {
        if (this.scoreElement) {
            this.scoreElement.textContent = `Score: ${this.plateauJeu.score || 0}`;
        }
    }
}