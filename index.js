let i = 0;
let num = 0;
let answer = "";
let correctAns = 0;
let show = true;
let getData = $.get('/csv/japanese-flashcards-hirigana.csv')
let arrOfWords = [];
let currentWord = "";

//function that handles and parses csv file with papa.parse
//when handeling or manipulating the csv, it has to be done in this fucntion
function numOfWords () {
    //recieves amount of words user wants and picks randomly from given csv
        //$('#current-score').html(`${correctAns}/${num}`);
        num = $('#num-of-words').val();
        getData.then(data=>{
            var result = Papa.parse(data);
                for (let j = 0; j < num; j++) {
                    let randNum = Math.floor(Math.random() * result.data.length);
                    arrOfWords = [...arrOfWords, result.data[randNum]]; 
                }
            });

        getData.then(data=>{
            console.log('test');
            if (show){
                $('#display-word').html(`<h2>${arrOfWords[i][0]}</h2>`);
            }

            $('.user-input').html(`
                <label  for="user-answer" class="screen-reader-text" aria-required="true">Answer</label>
                <input class="show" type="text" name="user-answer" id="user-answer" placeholder="Answer">
                <input class="submit-btn" type="submit" value="submit">
            `)
                        
            $('#display-word').addClass("show").removeClass("hide");
            $('#num-of-words-header').removeClass("show").addClass("hide");

            $('.submit-btn').on('click', event =>{
                show = !show;
                answer = $('#user-answer').val();
                console.log("debug", answer, arrOfWords[i], i);
                    if (i <= arrOfWords.length && answer == arrOfWords[i][1]  ) {
                        $('#correct').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('#user-answer').removeClass("show").addClass("hide");
                        $('.user-input').removeClass(".user-input").addClass("hide");
                        $('#next').addClass("show").removeClass("hide");
                        $('#user-answer').val('');
                        //correctAns++;
                    } else if(i <= arrOfWords.length && answer != arrOfWords[i][1] ) {
                        $('#incorrect').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('.user-input').removeClass(".user-input").addClass("hide");
                        $('#user-answer').removeClass("show").addClass("hide").val('');
                        $('#next').addClass("show").removeClass("hide");
                        $('#incorrect').html(`
                                <p>The correct answer is:</p>
                                <h2>${arrOfWords[i][1]}</h2>
                        `);
                    } else if(i >= arrOfWords.length) {
                        //$('#final-score').addClass("show").removeClass("hide");
                        $('#incorrect').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $("#next").prop('value', 'Play again');

                    }  

                $('#next').on('click', event => {
                    i++; 
                    $('#display-word').addClass("show").removeClass("hide").html(`<h2>${arrOfWords[i][0]}</h2>`);
                    $('.user-input').removeClass("hide");
                    $('#user-answer').addClass("show").removeClass("hide");
                    $('#next').removeClass("show").addClass("hide");
                    $('#correct').removeClass("show").addClass("hide");
                    $('#incorrect').removeClass("show").addClass("hide");
                    show = !show;
                });

            });
            //console.log(arrOfWords);   
            //console.log(i);
    });
}


function handleFlashcards() {
    numOfWords();
}

$('.user-input').submit(event => {
    event.preventDefault(); 
    handleFlashcards();
});
