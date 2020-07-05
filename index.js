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

            $('user-answer').on('submit', event =>{
                answer = $('.user-answer').val();
                event.preventDefault(); 
            });

            

            console.log(arrOfWords[j][1]);

                if (answer == arrOfWords[j][1]) {
                    $('.box').html(`
                        <div class="box">
                            <h2>Correct!</h2>
                            <button type="button">Next</button>
                        </div>
                    `);
                // } else {
                //     $('.box').html(`
                //         <div class="box">
                //             <p>The correct answer is:</p>
                //             <h2>${arrOfWords[j][1]}</h2>
                //             <button type="button">Next</button>
                //         </div>
                //     `);
                }
            }
    });
}

function handleFlashcards() {
    numOfWords();
}

$('.user-input').on('submit', event => {
    event.preventDefault(); 
    handleFlashcards();
});
