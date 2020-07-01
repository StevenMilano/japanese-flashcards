let num = 0;

function numOfWords () {
    $('.user-input').submit( event => {
        event.preventDefault();
        num = $('.user-answer').val();
        console.log(num);
    });
        
    $.get('/csv/japanese-flashcards-hirigana.csv')
        .then(data=>{
            for (let i = num; i < 3; i++) {
                let result = Papa.parse(data);
                let randNum = Math.floor(Math.random() * result.data.length);
                console.log(result.data[randNum]);
            }
        })
         
    
}

// function displayQuestion () {
//     for (let i = 0; i < numOfWords(); i++) {
//         const hiriganaCsv = $.get('/csv/japanese-flashcards-hirigana.csv')
//         .then(data=>{
//             let result = Papa.parse(data);
//             let randNum = Math.floor(Math.random() * result.data.length);
//             console.log(result.data[randNum]);
//         })
//     }
//     //grab num amount of random vocab words as objects
//     //access the object with the correct type of vocab
// }

function isCorrect (answer) {

}

function handleFlashcards() {
    numOfWords();
    //displayQuestion();
}

$(handleFlashcards);