let season = ['Printemps', 'Eté', 'Automne', 'Hiver']                           //initialisation du tableau des saisons

const cloth = [                                                                 //initialisation du tableau de vétements
    {id:0, name:"Bottes", season:"Automne", place:"bot"},
    {id:1, name:"Chaussons", season:"Hiver", place:"bot"},
    {id:2, name:"Chaussures", season:"Printemps", place:"bot"},
    {id:3, name:"Débardeur", season:"Eté", place:"top"},
    {id:4, name:"Doudoune", season:"Hiver", place:"top"},
    {id:5, name:"Imperméable", season:"Automne", place:"top"},
    {id:6, name:"Jogging", season:"Hiver", place:"mid"},
    {id:7, name:"Jupe", season:"Printemps", place:"mid"},
    {id:8, name:"Pantalon", season:"Automne", place:"mid"},
    {id:9, name:"Pull", season:"Printemps", place:"top"},
    {id:10, name:"Short", season:"Eté", place:"mid"},
    {id:11, name:"Tongs", season:"Eté", place:"bot"}
] 

/*---------------------------------------RECUPERATION DES ELEMENTS HTML----------------------------------------------------*/

let btnReply = document.getElementById("reply")

let divTab = [document.getElementById("div-top"), document.getElementById("div-mid"), document.getElementById("div-bot")]
let wardrobeTab = [document.getElementById("left-wardrobe"), document.getElementById("right-wardrobe")]

let divCelebration = document.getElementById("celebration")

let txtSeason = document.getElementById("season")

let idTop = Math.floor(Math.random()*4)
let idMid = Math.floor(Math.random()*4)
let idBot = Math.floor(Math.random()*4)

let globalIdTab = [0, 0, 0]
let idSeason

main()                                                                          //on exécute le main pour lancer l'initialisation du tableau

/*---------------------------------------CHANGE SEASON----------------------------------------------------*/

function changeSeason(){                                                        //change la saison 

    idSeason = Math.floor(Math.random()*4)

    txtSeason.innerText = season[idSeason]

    for(div of divTab){
        div.style.borderColor = "#555753"
    }

}

/*---------------------------------------CREATE WARDROBE----------------------------------------------------*/

function fillWardrobe(){                                                        //rempli les "gardes-robes", les div qui stocke les vétements à droite et à gauche                     

    i = 0

    cloth.forEach(clothU => {                                                   //pour tout les vétements du tableau cloth

        let elDivW = document.createElement("div")                              //création d'une div qui va stocker les autres éléments HTML
        let elImgW = document.createElement("img")                              //création d'un élément HTML img qui va afficher l'image du vétement
        let elTxtW = document.createElement("h2")                               //création d'un élément HTML qui va afficher le nom du vétement

        elImgW.src = "assets/" + clothU.name + ".png"                           //assignation de l'image dans l'élémént img

        elTxtW.innerText = clothU.name                                          //assignation du nom du vétement dans l'élément h2

        elDivW.dataset.idCloth = clothU.id                                      //création d'un dataset qui stock l'id de notre vétement

        elDivW.className = "wardrobe-elem"                                      //assignation d'un nom de class à notre div pour avoir du style
        elDivW.appendChild(elImgW)                                              //on ajoute l'élément img dans la div
        elDivW.appendChild(elTxtW)                                              //on ajoute l'élément h2 dans la div
        elDivW.setAttribute("onclick", "changeCloth("+clothU.id+")")            //on dit que la div devient cliquable et on renseigne la fonction qui sera lancé après un clique

        if(i<=5){                                                               //si i <= 5, alors on mettra les vétements dans la garde-robe de gauche
            wardrobeTab[0].appendChild(elDivW)
        } else {                                                                //si i > 5, alors on mettra les vétements dans la garde-robe de droite
            wardrobeTab[1].appendChild(elDivW)
        }   
        i++
    });
}


/*---------------------------------------CHANGE CLOTH----------------------------------------------------*/

function changeCloth(clothId){

    switch (cloth[clothId].place) {
        case "top" :
            changeSelectedCloth(clothId, 0)                                     //clothId = id d'un cloth, 0 = la div à modifier
            break;
        case "mid":
            changeSelectedCloth(clothId, 1)
            break;
        case "bot":
            changeSelectedCloth(clothId, 2)
            break;
    }

}

function changeSelectedCloth(clothId, pos){

    let elImg = document.createElement("img")                                   //crée un élément HTML de type img

    let clothPos = cloth.filter(c => c.id == clothId)                           //crée un tableau de vétement pour l'id envoyé

    divTab[pos].innerHTML = ""                                                  //vide l'élément HTML
    divTab[pos].style.borderColor = "#555753"                                   //change la couleur de la div pour la remettre sur le gris originel
    elImg.src = "assets/" + clothPos[0].name + ".png"                           //renseigne la position de l'image à afficher
    globalIdTab[pos] = clothPos[0].id                                           //prend l'élément avec l'id correspondant à ce qui a été reçu en paramètre
    divTab[pos].appendChild(elImg)                                              //affiche le nouvel élément HTML

}

/*---------------------------------------VERIFICATION----------------------------------------------------*/

function reply(){
    let status = 0                                                  
    for(i = 0; i <= 2; i++){                                                    //pour chaque case réponse
        if(verification(i)){                                                    //on vérifie que les vétements soient les bons pour la saion donnée
            divTab[i].style.borderColor = "#32a852"                             //change la couleur de la case réponse en vert pour signifier que ce vétement est bon
        } else {
            divTab[i].style.borderColor = "#e64545"                             //change la couleur de la case réponse en rouge pour signifier que ce vétement n'est pas bon
            status = -1
        }
    }
    let ssu = new SpeechSynthesisUtterance()                                    //crée un objet de type SpeechSynthesisUtterance
    ssu.lang = "fr-FR"                                                          //renseigne la langue de la synthèse sur français
    if(status == 0){                                                            //si status == 0, pas d'erreur, si status == -1 il y'a une erreur ou plus
        divCelebration.style.visibility = "visible"                             //rend visible la div de célébration
        ssu.text = "Bravo, tu as gagné"                                         //déclare le texte
	    window.speechSynthesis.speak(ssu)                                       //dit le texte
        setTimeout( ()=> divCelebration.style.visibility = "hidden", 10000)     //cache la div de célébration au bout de 10 secondes
    } else {
        
        ssu.text = "Tu as au moins une erreur"
	    window.speechSynthesis.speak(ssu)
    }
}

function verification(position){                                                //vérifie si la saison envoyé correspond bien à la saison affiché sur l'IHM
    if(cloth[globalIdTab[position]].season == season[idSeason]){
        return true
    } else {
        return false
    }
}


/*---------------------------------------DEFAULT INITIALISATION----------------------------------------------------*/

function main(){

    changeSeason()

    fillWardrobe()

}