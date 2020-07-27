let i = 0;
let num = 0;
let totalQuestions = 0;
let answer = "";
let currentScore = 0;
let currentQuestion = 1;
let show = true;
/*This is a global array in which I am grabbing data from a local csv, 
then parsing it into a global array. I am using a parser called Papa Parse which then sorts it into a global array. 
I am then using a promise to use this data throughout the app, to have access to the vocab words and their translations.*/ 
let getData = $.get('https://stevenmilano.github.io/japanese-flashcards/csv/japanese-flashcards-hirigana.csv')
let arrOfWords = [];
let currentWord = "";

//This function is used to execute the functions that are watching the buttons on my webpage. 
$(function() {
    $('#title').html(title("How many words would you like to study"));
    $(watchBtn);
    $(nextQuestionBtn);
    $(reset);
});

/*Parses the local csv with Papa parse and makes it into an array of arrays.
Then we take the users input to grab an amount of words from the array of arrays and stores it into a variable*/ 
function numOfWords () {
        num = $('#num-of-words').val();
        totalQuestions = num;
        getData.then(data=>{
            var result = Papa.parse(data);
                for (let j = 0; j < num; j++) {
                    let randNum = Math.floor(Math.random() * result.data.length);
                    arrOfWords = [...arrOfWords, result.data[randNum]]; 
                }
                $('#current-question').html(title(`${currentQuestion}/${num}`)); 
                if (show){
                    $('#title').html(title(arrOfWords[i][0]));
                }
                $('#number-input').removeClass("show").addClass("hide"); 
                $('#user-input').addClass("show").removeClass("hide");           
                console.log(arrOfWords);
            });
        }

        //Tests if user input is equal to the correct answer. Also doesn't let user skip question.
function checkAns() {
    getData.then(data=>{
        $('.submit-btn').on('click', event =>{
            event.preventDefault();
            show = !show;
            answer = $('#user-answer').val();
                if (i < arrOfWords.length && answer == arrOfWords[i][1] && $('#user-answer').val() !== "") {
                    $('#title').html(title('Correct!'));
                    $('#user-answer').removeClass("show").addClass("hide");
                    $('#user-input').removeClass("show").addClass("hide");
                    $('#next').addClass("show").removeClass("hide");
                    $('#user-answer').val('');
                    currentScore++;
                    $('#current-question').html(title(`${currentQuestion}/${num}`));
                } else if(i < arrOfWords.length && answer != arrOfWords[i][1] && $('#user-answer').val() !== "") {
                    $('#title').html(title(`
                        <p>The correct answer is:</p>
                        <h2>${arrOfWords[i][1]}</h2>`));
                    $('#user-input').removeClass("show").addClass("hide");
                    $('#user-answer').removeClass("show").addClass("hide").val('');
                    $('#next').addClass("show").removeClass("hide");
                    $('#current-question').html(title(`${currentQuestion}/${num}`));
                    
                }
        });
    });
}

//Handles proceding to the next vocab word as well as when the user is done with the quiz it will produce the players score and ask them to play again. 
function nextQuestion() {
    getData.then(data=>{
        $('#current-question').html(title(`${currentQuestion}/${num}`));
            if (i < arrOfWords.length  - 1){
                $('#title').html(title(arrOfWords[i + 1][0]));
                $('#user-input').addClass("show").removeClass("hide");
                $('#user-answer').addClass("show").removeClass("hide");
                $('#next').removeClass("show").addClass("hide");
                show = !show;
                i++; 
            } else if (i === arrOfWords.length - 1) {
                $('#title').html(title(`
                    <p>Your final score is:</p>
                    <h2>${currentScore}/${num}</h2>
                `))
                $('#current-question').removeClass("show").addClass("hide");
                $('#next').removeClass("show").addClass("hide");
                $('#playAgain').addClass("show").removeClass('hide');
            } 
            //There when the next button is pressed it goes through this if statement twice for some reason. This prevents that
            $(this).off(event);
        });
}

//Function for changing html throught the page. 
function title (text) {
    return (`<h2 id="num-of-words-header">${text}</h2>`)
}


//executes when play again is pressed to reset the page.
function reset() {
    $('#playAgain').on('click', event => {
        window.location.reload(false); 
    });
}

function handleFlashcards() {
    checkAns();
    nextQuestion();
}

//Watchs for when the next button gets pressed, it adds to the current question counter. 
function nextQuestionBtn () {
    $('#next').on('click', event => {
        event.stopPropagation();
        currentQuestion++;
        handleFlashcards();
    });
}

//Watches the first button and triggers all of the functions to start the quiz.
function watchBtn() {
    $('#number-input').submit(event => {
        event.preventDefault(); 
        handleFlashcards();
        numOfWords();
    });    
}


