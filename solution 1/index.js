let season = ['Printemps', 'Eté', 'Automne', 'Hiver']                                       //initialisation du tableau des saisons

const cloth = [                                                                             //initialisation du tableau de vétements
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

let btnChange = document.querySelectorAll(".btn")
let btnReply = document.getElementById("reply")

let divTab = [document.getElementById("div-top"), document.getElementById("div-mid"), document.getElementById("div-bot")]

let divCelebration = document.getElementById("celebration")

let txtSeason = document.getElementById("season")

let idTop = Math.floor(Math.random()*4)
let idMid = Math.floor(Math.random()*4)
let idBot = Math.floor(Math.random()*4)

let globalIdTab = [0, 0, 0]
let idSeason

main()                                                                                          //on exécute le main pour lancer l'initialisation du tableau

/*---------------------------------------CHANGE CLOTH----------------------------------------------------*/

btnChange.forEach(btn => {                                                                      //pour chaque bouton 
    btn.addEventListener("click", () => { changeCloth(btn.dataset.dir, btn.dataset.pos) })      //crée un événement sur le click qui appellera changeCloth en envoyant en paramètre des dataset déclaré dans le HTML
})

function changeCloth (direction, position){
    switch (position) {
        case "top" :
            changePosition(direction, "top", 0)                                                 //direction = left ou right , "top" = la place d'un cloth, 0 = la div a modifier
            break;
        case "mid":
            changePosition(direction, "mid", 1)
            break;
        case "bot":
            changePosition(direction, "bot", 2)
            break;
    }
}

function changePosition(direction, positon, pos){                                               //gère le changement d'image dans les div

    let elImg = document.createElement("img")                                                   //crée un élément HTML de type img

    let clothPos = cloth.filter(c => c.place == positon)                                        //crée un tableau de vétement pour la position envoyée

    divTab[pos].innerHTML = ""                                                                  //vide l'élément HTML
    divTab[pos].style.borderColor = "#555753"                                                   //change la couleur de la div pour la remettre sur le gris originel
    direction == "left" ? idBot-- : idBot++                                                     //se déplace dans le tableau selon le sens choisi
    elImg.src = "assets/" + clothPos[Math.abs(idBot)%4].name + ".png"                           //renseigne la position de l'image à afficher
    globalIdTab[pos] = clothPos[Math.abs(idBot)%4].id                                           //prend l'élément à un index donné qui sera toujours entre 0 et 3
    divTab[pos].appendChild(elImg)                                                              //affiche le nouvel élément HTML

}

/*---------------------------------------CHANGE SEASON----------------------------------------------------*/

function changeSeason(){                                                                        //change la saison 

    idSeason = Math.floor(Math.random()*4)                                                      //génére un entier entre 0 et 3

    txtSeason.innerText = season[idSeason]                                                      //choisi une saison selon le chiffre random généré précédement

    for(div of divTab){                                                                         //pour toutes les divs réponses
        div.style.borderColor = "#555753"                                                       //change les couleurs des divs pour les remettre sur le gris originel
    }

}

/*---------------------------------------VERIFICATION----------------------------------------------------*/

function reply(){
    let status = 0                                                 
    for(i = 0; i <= 2; i++){                                                                    //pour chaque case réponse
        if(verification(i)){                                                                    //on vérifie que les vétements soient les bons pour la saion donnée
            divTab[i].style.borderColor = "#32a852"                                             //change la couleur de la case réponse en vert pour signifier que ce vétement est bon
        } else {
            divTab[i].style.borderColor = "#e64545"                                             //change la couleur de la case réponse en rouge pour signifier que ce vétement n'est pas bon
            status = -1
        }
    }
    let ssu = new SpeechSynthesisUtterance()                                                    //crée un objet de type SpeechSynthesisUtterance
    ssu.lang = "fr-FR"                                                                          //renseigne la langue de la synthèse sur français
    if(status == 0){                                                                            //si status == 0, pas d'erreur, si status == -1 il y'a une erreur ou plus
        divCelebration.style.visibility = "visible"                                             //rend visible la div de célébration
        ssu.text = "Bravo, tu as gagné"                                                         //déclare le texte
	    window.speechSynthesis.speak(ssu)                                                       //dit le texte
        setTimeout( ()=> divCelebration.style.visibility = "hidden", 10000)                     //cache la div de célébration au bout de 10 secondes
    } else {
        ssu.text = "Tu as au moins une erreur"
	    window.speechSynthesis.speak(ssu)
    }
}

function verification(position){                                                                //vérifie si la saison envoyé correspond bien à la saison affiché sur l'IHM
    if(cloth[globalIdTab[position]].season == season[idSeason]){
        return true
    } else {
        return false
    }
}

/*---------------------------------------DEFAULT INITIALISATION----------------------------------------------------*/

function main(){                                                                                //initialisation avec des valeurs aléatoire

    changeCloth("right", "top")
    changeCloth("right", "mid")
    changeCloth("right", "bot")

    changeSeason()

}