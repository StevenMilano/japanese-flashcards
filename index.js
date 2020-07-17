let i = 0;
let num = 0;
let totalQuestions = 0;
let answer = "";
let currentScore = 0;
let currentQuestion = 1;
let show = true;
let getData = $.get('/csv/japanese-flashcards-hirigana.csv')
let arrOfWords = [];
let currentWord = "";

//function that handles and parses csv file with papa.parse
//when handeling or manipulating the csv, it has to be done in this fucntion
function numOfWords () {
    //recieves amount of words user wants and picks randomly from given csv
        num = $('#num-of-words').val();
        totalQuestions = num;
        getData.then(data=>{
            var result = Papa.parse(data);
                for (let j = 0; j < num; j++) {
                    let randNum = Math.floor(Math.random() * result.data.length);
                    arrOfWords = [...arrOfWords, result.data[randNum]]; 
                }
            });

        getData.then(data=>{
            //logs the array of words if you want to look the answers up
            console.log(arrOfWords);
            //logs which question you are on
            $('#current-question').html(`${currentQuestion}/${num}`);
            if (show){
                $('#display-word').html(`<h2>${arrOfWords[i][0]}</h2>`);
            }
            $('#number-input').removeClass("show").addClass("hide"); 
            $('#user-input').addClass("show").removeClass("hide");           
            $('#display-word').addClass("show").removeClass("hide");
            $('#num-of-words-header').removeClass("show").addClass("hide");
            
            //This button click is for the submit of an answer while the if else statement checks if the answer is correct or inccorect
            $('.submit-btn').on('click', event =>{
                event.preventDefault();
                show = !show;
                answer = $('#user-answer').val();
                    if (i < arrOfWords.length && answer == arrOfWords[i][1]) {
                        $('#correct').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('#user-answer').removeClass("show").addClass("hide");
                        $('#user-input').removeClass("show").addClass("hide");
                        $('#next').addClass("show").removeClass("hide");
                        $('#user-answer').val('');
                        currentScore++;
                        $('#current-question').html(`${currentQuestion}/${num}`);
                    } else if(i < arrOfWords.length && answer != arrOfWords[i][1]) {
                        $('#incorrect').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('#user-input').removeClass("show").addClass("hide");
                        $('#user-answer').removeClass("show").addClass("hide").val('');
                        $('#next').addClass("show").removeClass("hide");
                        $('#current-question').html(`${currentQuestion}/${num}`);
                        $('#incorrect').html(`
                                <p>The correct answer is:</p>
                                <h2>${arrOfWords[i][1]}</h2>
                        `);
                    }  
                    
                //This watches the next button and moves the user to the next question 
                $('#next').on('click', event => {
                    event.stopPropagation();
                    currentQuestion++;
                    $('#current-question').html(`${currentQuestion}/${num}`);
                    if (i < arrOfWords.length  - 1){
                        $('#display-word').addClass("show").removeClass("hide").html(`<h2>${arrOfWords[i + 1][0]}</h2>`);
                        $('#user-input').addClass("show").removeClass("hide");
                        $('#user-answer').addClass("show").removeClass("hide");
                        $('#next').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $('#incorrect').removeClass("show").addClass("hide");
                        show = !show;
                        i++; 
                    } else if (i === arrOfWords.length - 1) {
                        $('#incorrect').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $('#final-score').addClass("show").removeClass("hide");
                        $('#current-score').addClass("show").removeClass("hide").html(`${currentScore}/${num}`);
                        $('#current-question').removeClass("show").addClass("hide");
                        $('#next').removeClass("show").addClass("hide");
                        $('#playAgain').addClass("show").removeClass('hide');
                        $('#correct').removeClass("show").addClass("hide");
                        $('#incorrect').removeClass("show").addClass("hide");
                    } 
                    //There when the next button is pressed it goes through this if statement twice for some reason. This prevents that
                    $(this).off(event);
                });
            });
            reset();
    });
}

//executes when play again is pressed
function reset() {
    $('#playAgain').on('click', event => {
        window.location.reload(false); 
    });
}

function handleFlashcards() {
    numOfWords();
}
//watches the intial button and executes the function for the rest of the program
$('#number-input').submit(event => {
    event.preventDefault(); 
    handleFlashcards();
});

