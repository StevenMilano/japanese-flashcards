var getData = $.get('https://stevenmilano.github.io/japanese-flashcards/csv/japanese-flashcards-hirigana.csv')
let num = 0;
let arrOfWords = [];
//Converting .csv into a global data store. 
getData.then(data=>{
    num = document.getElementById('num-of-words');
    var result = Papa.parse(data);
    console.log(result);
    for (let j = 0; j < num; j++) {
        console.log("test");
        let randNum = Math.floor(Math.random() * result.data.length);
        arrOfWords = [...arrOfWords, result.data[randNum]];
    }
    return result;
    });

// getData.then(data=>{
//     console.log("test");
//     for (let j = 0; j < num; j++) {
//             console.log("test");
//             let randNum = Math.floor(Math.random() * data.length);
//             arrOfWords = [...arrOfWords, result.data[randNum]];
//         }
//     });