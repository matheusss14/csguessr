let jsonData = [];
let europeCountries = [];
let SAcountries = [];
let NAcountries = [];
let OCAS = [];
const form = document.getElementById('guess');
const player = Math.round(Math.random() * (65 - 1) + 1);
console.log(player)

function start() {
    const card = document.getElementById('guesscard')
    card.classList.remove("hidden")

    const startbtn = document.getElementById('startbt')
    startbtn.classList.add('hidden')

    const rules = document.getElementById('rules')
    rules.classList.add('hidden')
}

function submitForm(event) {
    form.preventDefault;

    search()
}

// Fetch the JSON data from the external file when the page loads
window.addEventListener('load', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    fetch('europe.json')
        .then(response => response.json())
        .then(data => {
            europeCountries = data;
            console.log(europeCountries)
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    fetch('SA.json')
        .then(response => response.json())
        .then(data => {
            SAcountries = data;
            console.log(SAcountries)
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
    fetch('NA.json')
        .then(response => response.json())
        .then(data => {
            NAcountries = data;
            console.log(NAcountries)
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
    fetch('as.json')
        .then(response => response.json())
        .then(data => {
            OCAS = data;
            console.log(OCAS)
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
});



function search() {
    findPlayer();
    guess()
    compare();
    addNewGuess();

    document.getElementById('guessed').value = ''
}

function guess() {
    const guessed = document.getElementById('guessed').value.trim().toLowerCase();

    const result = jsonData.find(person => person.nick.toLowerCase() === guessed);
    if (result) {
        return result;
    } else {
        alert("player not found")
    }
}

function findPlayer() {
    const select = jsonData.find((person) => person.id == player);
    return select;
}

function reveal () {
    const result = guess()

    const spanGuess = document.getElementById('spanGuess');
    spanGuess.className = 'hidden';

    const cardGuess = document.getElementById('card-guess');
    cardGuess.className = 'hidden';

    const revealius = document.getElementById('revealius');
    revealius.className = 'reveal';

    const playerPic = document.getElementById('playerPic');
    playerPic.src = result.image

    const resName = document.getElementById('resName');
    resName.textContent = `${result.name}`;

    const resNick = document.getElementById('resNick');
    resNick.textContent = `${result.nick}`;

    const guessedFlag = document.getElementById('guessed-flag');
    guessedFlag.src = "https://www.hltv.org/img/static/flags/30x20/" + result.nation + '.gif';

    const resTeam = document.getElementById('resTeam');
    resTeam.textContent = result.team;

    const resRole = document.getElementById('resRole');
    resRole.textContent = result.role;
}

function compare() {
    const guessedplayer = guess()
    const id = guessedplayer.id;
    if (id == player) {
        reveal()
    }
    else {
        console.log('boo')
    }
}

function isInEurope(country) {
    const isInEurope = europeCountries.some(item => item.code === country);
    return isInEurope;
}

function isInSA(country) {
    const isInSA = SAcountries.some(item => item.code === country);
    return isInSA;
}

function isInNA(country) {
    const isInNA = NAcountries.some(item => item.code === country);
    return isInNA;
}

function isInOCAS(country) {
    const isInOCAS = OCAS.some(item => item.code === country);
    return isInOCAS;
}

function addNewGuess() {
    const player1 = findPlayer();
    const result = guess();
    const container = document.getElementById('guesses');

    const NewResLineup = document.createElement('div');
    NewResLineup.className = 'results-lineup';

    const NewBblLineup = document.createElement("div");
    NewBblLineup.className = "bubble-lineup";

    const NewBblTeam = document.createElement("div");
    NewBblTeam.className = "bubble";
    if ((`${result.team}`) == (player1.team)) {
        NewBblTeam.className = 'green-bubble';
    }
    NewBblTeam.textContent = `${result.team}`;

    const NewBblNation = document.createElement("div");
    NewBblNation.classList.add('bubble')
    const NewBblNationImg = document.createElement('img')
    NewBblNationImg.src = "https://www.hltv.org/img/static/flags/30x20/" + result.nation + ".gif"
    if ((isInEurope(`${result.nation}`)) && (isInEurope(player1.nation))) {
        NewBblNation.className = 'yellow-bubble';
        console.log("Eu")
    } else {
        NewBblNation.className = 'bubble';
        console.log("not EU")
    }
    if ((isInSA(`${result.nation}`)) && (isInSA(player1.nation))) {
        NewBblNation.className = 'yellow-bubble';
        console.log("SA")
    } else {
        NewBblNation.className = 'bubble';
        console.log("not SA")
    }
    if ((isInOCAS(`${result.nation}`)) && (isInOCAS(player1.nation))) {
        NewBblNation.className = 'yellow-bubble';
        console.log("OCAS")
    } else {
        NewBblNation.className = 'bubble';
        console.log("not OCAS")
    }
    if ((isInNA(`${result.nation}`)) && (isInNA(player1.nation))) {
        NewBblNation.className = 'yellow-bubble';
        console.log("NA")
    } else {
        NewBblNation.className = 'bubble';
        console.log("not NA")
    }
    
    
    if ((`${result.nation}`) == (player1.nation)) {
        NewBblNation.className = 'green-bubble';
    }
    NewBblNation.appendChild(NewBblNationImg)

    const NewBblRegion = document.createElement("div");
    NewBblRegion.className = "bubble";
    if ((`${result.region}`) == (player1.region)) {
        NewBblRegion.className = 'green-bubble';
    }
    NewBblRegion.textContent = `${result.region}`;

    const NewBblRole = document.createElement("div");
    NewBblRole.className = "bubble";
    if ((`${result.role}`) == (player1.role)) {
        NewBblRole.className = 'green-bubble';
    }
    NewBblRole.textContent = `${result.role}`;

    const NewBblAge = document.createElement("div");
    NewBblAge.className = "bubble";
    NewBblAge.textContent = `${result.age}`;
    const NewBblAgeArrow = document.createElement("div");
    NewBblAgeArrow.className = "major-updown";
    const NewBblAgeArrowIcon = document.createElement('i');
    NewBblAgeArrowIcon.className = "fa-solid fa-arrow-down";
    if ((`${result.age}`) == (player1.age)) {
        NewBblAge.className = 'green-bubble';
        NewBblAgeArrowIcon.className = "hidden";
    }
    if (parseInt((`${result.age}`)) > parseInt((player1.age))) {
        NewBblAgeArrowIcon.className = "fa-solid fa-arrow-down";
    }
    if (parseInt((`${result.age}`)) < parseInt((player1.age))) {
        NewBblAgeArrowIcon.className = "fa-solid fa-arrow-up";
    }
    NewBblAgeArrow.appendChild(NewBblAgeArrowIcon);
    NewBblAge.appendChild(NewBblAgeArrow);

    const NewBblMajors = document.createElement("div");
    NewBblMajors.className = "bubble";
    NewBblMajors.textContent = `${result.majors}`;
    const NewBblMajorsArrow = document.createElement("div");
    const NewBblMajorsArrowIcon = document.createElement('i');
    if ((`${result.majors}`) == (player1.majors)) {
        NewBblMajors.className = 'green-bubble';
        NewBblMajorsArrowIcon.className = "hidden";
    }
    if (parseInt((`${result.majors}`)) > parseInt((player1.majors))) {
        NewBblMajorsArrowIcon.className = "fa-solid fa-arrow-down";
        console.log('players has less')
    }
    if (parseInt((`${result.majors}`)) < parseInt((player1.majors))) {
        NewBblMajorsArrowIcon.className = "fa-solid fa-arrow-up";
        console.log('player has more')
    }
    NewBblMajorsArrow.appendChild(NewBblMajorsArrowIcon);
    NewBblMajors.appendChild(NewBblMajorsArrow);

    const NewBblRating = document.createElement("div");
    NewBblRating.className = "bubble";
    NewBblRating.textContent = `${result.rating}`;
    const NewBblRatingArrow = document.createElement("div");
    NewBblRatingArrow.className = "major-updown";
    const NewBblRatingArrowIcon = document.createElement('i');
    NewBblRatingArrowIcon.className = "fa-solid fa-arrow-down";
    if ((`${result.rating}`) == (player1.rating)) {
        NewBblRating.className = 'green-bubble';
        NewBblRatingArrowIcon.className = "hidden";
    }
    if ((`${result.rating}`) > (player1.rating)) {
        NewBblRatingArrowIcon.className = "fa-solid fa-arrow-down";
    }
    if ((`${result.rating}`) < (player1.rating)) {
        NewBblRatingArrowIcon.className = "fa-solid fa-arrow-up";
    }
    NewBblRatingArrow.appendChild(NewBblRatingArrowIcon);
    NewBblRating.appendChild(NewBblRatingArrow);


    const CommentaryLine = document.createElement('div');
    CommentaryLine.className = 'results-lineup__texts';

    const ComTeam  = document.createElement('span');
    ComTeam.className = 'results-lineup__texts__line';
    ComTeam.innerHTML = 'Team'
    CommentaryLine.appendChild(ComTeam)

    const ComNation  = document.createElement('span');
    ComNation.className = 'results-lineup__texts__line';
    ComNation.innerHTML = 'Nation'
    CommentaryLine.appendChild(ComNation)

    const ComRegion  = document.createElement('span');
    ComRegion.className = 'results-lineup__texts__line';
    ComRegion.innerHTML = 'Region'
    CommentaryLine.appendChild(ComRegion)

    const ComRole  = document.createElement('span');
    ComRole.className = 'results-lineup__texts__line';
    ComRole.innerHTML = 'Role'
    CommentaryLine.appendChild(ComRole)

    const ComAge  = document.createElement('span');
    ComAge.className = 'results-lineup__texts__line';
    ComAge.innerHTML = 'Age'
    CommentaryLine.appendChild(ComAge)

    const ComMajors  = document.createElement('span');
    ComMajors.className = 'results-lineup__texts__line';
    ComMajors.innerHTML = 'Major apps'
    CommentaryLine.appendChild(ComMajors)

    const ComRating  = document.createElement('span');
    ComRating.className = 'results-lineup__texts__line';
    ComRating.innerHTML = '2024 Rating'
    CommentaryLine.appendChild(ComRating)


    NewBblLineup.appendChild(NewBblTeam);
    NewBblLineup.appendChild(NewBblNation);
    NewBblLineup.appendChild(NewBblRegion);
    NewBblLineup.appendChild(NewBblRole);
    NewBblLineup.appendChild(NewBblAge);
    NewBblLineup.appendChild(NewBblMajors);
    NewBblLineup.appendChild(NewBblRating);


    NewResLineup.appendChild(NewBblLineup);
    NewResLineup.appendChild(CommentaryLine);


    container.appendChild(NewResLineup);
}


