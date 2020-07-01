function numOfWords () {
    $('.user-input').submit( event => {
        event.preventDefault();
        let num = $('.user-answer').val();
        console.log(num);
    });
}

function displayQuestion () {
    //access csv
    for (let i = 0; i < numOfWords(); i++) {
        const hiriganaCsv = $.get('/csv/japanese-flashcards-test.csv')
        .then(data=>console.log(Papa.parse(data)));
    }
    
        //.then(data=>console.log(Papa.parse(data[Math.floor(Math.random()*data.length)])));
    //grab num amount of random vocab words as objects
    //access the object with the correct type of vocab
}

function isCorrect (answer) {

}

function handleFlashcards() {
    numOfWords();
    displayQuestion();
}

$(handleFlashcards);