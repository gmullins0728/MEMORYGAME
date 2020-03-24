class Image {
    constructor(src, alt)
    {
        this.src = src;
        this.alt = alt;
    }
}


class Theme {
    constructor()
    {
        this.cardBgClass = "";
        this.images = [];
    }
    addImage(src, alt)
    {
        const img = new Image(src, alt);
        this.images.push(img);
    }
    setCardBgClass(cardBgClassName)
    {
        this.cardBgClass = cardBgClassName;
    }
}

var defaultTheme = "pokemon";
var savedTheme = "";

// Create layout of rows and columns
const NUM_ROWS = 3;
const NUM_COL = 4;

function generateCardTable(themeName) {

    console.log(themeName);
    
    // Get selected theme
    var theme = getTheme(themeName);

    // Save theme (so same theme loads when playAgain)
    savedTheme = themeName;

    // Create table
    var table = document.createElement("table");
    table.classList.add("game-board");
    
    var tBody = document.createElement("tbody");	
    tBody.classList.add("game-grid");
    
    var shuffledCards = shuffle(theme.images);
    var cardNum = 0;

    // create a tr element for each row
    for(var n = 0; n < NUM_ROWS; n++) {

        var tRow = document.createElement("tr");
        tRow.classList.add("game-grid-row");

        // create a td and append to tr
        for (var j = 0; j < NUM_COL; j++) {
            
            // if at the end of the array, reshuffle cards 
            if (cardNum == shuffledCards.length) {
                shuffledCards = shuffle(theme.images);
                
                cardNum = 0;
            }

            var td = document.createElement("td");
            td.classList.add("game-card");
            td.classList.add(theme.cardBgClass);

            var img = document.createElement("img");
            img.classList.add("game-card-img");

            var card = shuffledCards[cardNum];
            img.setAttribute("src", card.src);
            img.setAttribute("alt", card.alt);
            
            console.log(card);

            td.appendChild(img);

            tRow.appendChild(td);

            cardNum++;
        }
        
        tBody.appendChild(tRow);
        
    }

    table.appendChild(tBody);	
    
    // append the table to the div
    var divContainer = document.getElementById("card-table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}	

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function getTheme(themeName) {

    var theme = new Theme();

    switch (themeName)
    {
        case "pokemon":
            theme.setCardBgClass('bg-poke');
            theme.addImage('img/pokemon/bulbasaur.png', 'bulbasaur');
            theme.addImage('img/pokemon/charizard.png', 'charizard');
            theme.addImage('img/pokemon/evee.png', 'evee');
            theme.addImage('img/pokemon/squirtle.png', 'squirtle');
            theme.addImage('img/pokemon/pikachu.png', 'pikachu');
            theme.addImage('img/pokemon/vulpix.png', 'vulpix');
            break;
        case "gundam":
            theme.setCardBgClass('bg-gundam');
            theme.addImage('img/gundam/gundam-red.png', 'gundam-red');
            theme.addImage('img/gundam/gundam-unicorn.png', 'gundam-unicorn');
            theme.addImage('img/gundam/gundam-common.png', 'gundam-common');
            theme.addImage('img/gundam/gundam-hero-2.png', 'gundam-hero-2');
            theme.addImage('img/gundam/gundam-hero-green.png', 'gundam-hero-green');
            theme.addImage('img/gundam/gundam-orange.png', 'gundam-orange');
            break;
        case "DBZ":
            theme.setCardBgClass('bg-dbz');
            theme.addImage('img/dragonball/beerus.png', 'beerus');
            theme.addImage('img/dragonball/broly.png', 'broly');
            theme.addImage('img/dragonball/caulifa.png', 'caulifa');
            theme.addImage('img/dragonball/goku.png', 'goku');
            theme.addImage('img/dragonball/jiren.png', 'jiren');
            theme.addImage('img/dragonball/vegeta.png', 'vegeta');
            break;
        case "easter":
            theme.setCardBgClass('bg-easter');
            theme.addImage('img/easter/floweregg.png', 'floweregg');
            theme.addImage('img/easter/greenyellowegg.png', 'greenyellowegg');
            theme.addImage('img/easter/heartegg.jpeg', 'heartegg');
            theme.addImage('img/easter/ribbonegg.png', 'ribbonegg');
            theme.addImage('img/easter/jeweledegg.jpg', 'jeweledegg');
            theme.addImage('img/easter/groovyegg.png', 'groovyegg');
            break;            
    }

    return theme;
}

