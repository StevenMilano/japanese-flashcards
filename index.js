let num = 0;
let arr = null;
let answer = "";
let getData = $.get('/csv/japanese-flashcards-hirigana.csv')
let arrOfWords = [];
let currentWord = "";

//function that handles and parses csv file with papa.parse
//when handeling or manipulating the csv, it has to be done in this fucntion
function numOfWords () {
    //recieves amount of words user wants and picks randomly from given csv
        num = $('.user-num').val();
        getData.then(data=>{
            var result = Papa.parse(data);
                for (let i = 0; i < num; i++) {
                    let randNum = Math.floor(Math.random() * result.data.length);
                    arrOfWords = [...arrOfWords, result.data[randNum]]; 
                    console.log(num);
                }
            });

        getData.then(data=>{
            for (let j = 0; j < arrOfWords.length; j++) {
                currentWord = arrOfWords[j][0];
                // if (answer === arrOfWords[j][1]) {
                //     console.log("correct");
                // } else {
                //     console.log("inccorect");
                // }
            }

            $('.box').html(`
                <div class="box">
                    <h2>${currentWord}</h2>
                    <form class="user-answer">
                            <label  for="user-answer" class="screen-reader-text" aria-required="true">Answer</label>
                            <input class="user-answer" type="text" name="user-answer" id="user-answer" required placeholder="Answer">
                            <input class="submit-btn" type="submit" value="submit">
                    </form>
                </div>
            `);
    });
}

function handleFlashcards(arrOfWords) {
    numOfWords();
}

$('.user-input').on('submit', '.submit-btn', event => {
    event.preventDefault(); 
    $(handleFlashcards);
   // answer = $('.user-answer').val();
});
