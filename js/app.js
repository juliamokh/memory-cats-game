class GameBoard {

    constructor(cards) {
        this.cards = GameBoard.shuffle(cards);
    }

    static shuffle(o) {
	    for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
    }

    render() {
        this.cards.forEach(function(cat) {
            let card = new Card(cat);
            card.render();
        })
    }
}

class Card {

    constructor(cat) {
        this.name = cat.name;
        this.img = cat.img;
    }

    render() {
        let card = document.createElement('div');
        card.className = 'card';
        card.id = this.name;
        card.innerHTML = '<img src="img/' + this.img + '">';
        document.getElementById('game-board').appendChild(card);
    }
}

let cards = [
    { name: 'casper',   img: 'casper.png'},
    { name: 'cleo',     img: 'cleo.png'},
    { name: 'coco',     img: 'coco.png'},
    { name: 'daisy',    img: 'daisy.png'},
    { name: 'felix',    img: 'felix.png'},
    { name: 'milo',     img: 'milo.png'},
    { name: 'pixie',    img: 'pixie.png'},
    { name: 'tiger',    img: 'tiger.png'},
    { name: 'casper',   img: 'casper.png'},
    { name: 'cleo',     img: 'cleo.png'},
    { name: 'coco',     img: 'coco.png'},
    { name: 'daisy',    img: 'daisy.png'},
    { name: 'felix',    img: 'felix.png'},
    { name: 'milo',     img: 'milo.png'},
    { name: 'pixie',    img: 'pixie.png'},
    { name: 'tiger',    img: 'tiger.png'},
];

let gameBoard = new GameBoard(cards);
gameBoard.render();

let openedCards = [];

let hiddenCards = 0;

document.addEventListener("click", function(event) {
    if (event.target.className === 'card' && openedCards.length < 2) {
        openCard(event.target);
    }
})

function openCard(card) {
        card.classList.add('open');
        openedCards.push(card);
        if (openedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

function checkMatch() {
    if (openedCards[0].id === openedCards[1].id) {
        matched();
    }
    else {
        unmatched();
    }
}

function matched() {
    openedCards[0].classList.add('hidden');
    openedCards[1].classList.add('hidden');
    openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    openedCards = [];
    hiddenCards += 2;
    checkWin();
}

function unmatched() {
    openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    openedCards = [];
}

function checkWin() {
    if (hiddenCards === cards.length) {
        alert('You win!');
    }
}
