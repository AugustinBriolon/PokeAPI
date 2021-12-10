// Permet de pré-charger le contenu avant d'appuyer sur le bouton
document.addEventListener("DOMContentLoaded", () =>{

    // Création de notre btn avec fonction au click
    let generateBtn = document.querySelector('#generate-pokemon');
    generateBtn.addEventListener('click', renderEverything)
})

// On créé une fonction pour contenir les pokemons
function renderEverything(){

    // On affichera les pokemon dans la div créée en amont
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchFirstPokemon();
}

function fetchFirstPokemon(){

    // On va chercher les 21 premiers pokemon 
    fetch('https://pokeapi.co/api/v2/pokemon?limit=21')
    .then(response => response.json())
    .then(function(allpokemon){

        // On va chercher tous les pokemon grace à forEach
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

function fetchPokemonData(pokemon){

    // On enregistre l'url pokemon dans une variable
    let url = pokemon.url 

    // On utilise notre variable dans l'appel fetch
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        // console.log(pokeData)
        renderPokemon(pokeData)
    })
}

function renderPokemon(pokeData){

    // On définit les éléments dans lesquels seront nos données
    let allPokemonContainer = document.getElementById('poke-container')

    // Div servira pour contenir les détails de chaque pokemon
    let pokeContainer = document.createElement("div")
    pokeContainer.className = 'poke-div'

    let pokeName = document.createElement('h3') 
    pokeName.innerText = pokeData.name

    let pokeImg = document.createElement('img')
    pokeImg.src = pokeData.sprites.front_default

    let pokeTypes = document.createElement('ul')

    // fonction pour parcourir le tableau des types et créer des balises li pour chacun
    createTypes(pokeData.types, pokeTypes)

    // On ajoute de tous les détails au div pokeContainer
    pokeContainer.append(pokeName, pokeImg, pokeTypes); 

    // On ajoute pokeContainer à la div principale qui contiendra toutes les cartes pokemon
    allPokemonContainer.appendChild(pokeContainer);
}

// Les types sont présentés sous forme de tableau pour les Pokémon qui ont plus d'un type.
function createTypes(types, ul){

    // On parcourt chaque type, créer un nouvel élément Li, créer le texte interne
    types.forEach(function(type){

        let typeLi = document.createElement('li');

        // On ajoute tous les éléments au conteneur DIV pour qu'il s'affiche sur le DOM
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

