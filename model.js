const couleurs = {
    RED: 'red',
    YELLOW : 'yellow',
    CIAN : 'cian',
    GREEN: 'green',
    PINK: 'pink',
    PURPLE: 'purple'
}

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
        for(let i = 0; i < nbcolonnes; i++) {
            let ligne = [];
            for(let j = 0; j < nblignes; j++) {
                ligne.push(this.forme[nblignes - 1 - j][i]);
            }
            rotatedForm.push(ligne);
        }
        this.forme = rotatedForm;
    }
    
    //faire rotation d'autres blocs 

    // faire sens inverse 
    rotateReverseClockWise( )
    {
        let nblignes = this.forme.length;
        let nbcolonnes = this.forme[0].length;
        let rotatedForm = [];

        for(let i = 0; i < nbcolonnes; i++) {
            let ligne = [];
            for(let j = 0; j < nblignes; j++) {

                ligne.push(this.forme[j][nbcolonnes - 1 - i]);
            }
            rotatedForm.push(ligne);
        }
        this.forme = rotatedForm;
    }
}

class Fabrique {
    nomFormes=['L', 'J', 'T', 'I', 'N', 'Z', 'O'];
    // 0.99999999999999 => ]0,1[  * N => 0..N-1
    randomForm()
    {   
        let indiceRandomForme = Math.floor(Math.random() * this.nomFormes.length);
        let nomFormeRandom = this.nomFormes[indiceRandomForme];

        return this.fabriquer(nomFormeRandom);
    }

    fabriquer(nomForme)
    {
        if (!this.nomFormes.includes(nomForme))
        {
            throw new Error("Forme inconnue");
        }

        let f=[];
        switch(nomForme)
        {
            case 'L':f = [
                [1,0],
                [1,0],
                [1,1]
            ];
            break;
            case 'J':f = [
                [0,1],
                [0,1],
                [1,1]
            ];
            break;
            case 'T': f = [
                [1, 1, 1],
                [0, 1, 0]
            ]
            break;
            case 'I': f = [
                [1],
                [1],
                [1],
                [1]
            ]
            break;
            case 'N': f =[
                [1, 0],
                [1, 1],
                [0, 1],
            ];
            break;
            case 'Z': f =[
                [0, 1],
                [1, 1],
                [1, 0],
            ];
            break;
            case 'O': f =[
                [1, 1],
                [1, 1],
            ];
            break;
            default:
                console.log('Erreur: forme ',nomForme,' inconnue')

        }
        return f;
    }
}

class PlateauJeu {

    // grille de tas: trouver marqueur pour vider et créer une grille n m 



    // liste des blocs : stationner bloc :
    // retire l'element dela liste et le met dans le tas
    
    // fn détermine si ligne est pleine 

        
}


