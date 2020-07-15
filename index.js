let i = 0;
let num = 0;
let totalQuestions = 0;
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
        num = $('#num-of-words').val();
        totalQuestions = num;
        console.log(num, totalQuestions);
        getData.then(data=>{
            var result = Papa.parse(data);
                for (let j = 0; j < num; j++) {
                    let randNum = Math.floor(Math.random() * result.data.length);
                    arrOfWords = [...arrOfWords, result.data[randNum]]; 
                }
            });

        getData.then(data=>{
            $('#current-score').html(`${correctAns}/${num}`);
            if (show){
                $('#display-word').html(`<h2>${arrOfWords[i][0]}</h2>`);
            }
            $('#number-input').removeClass("show").addClass("hide"); 
            $('#user-input').addClass("show").removeClass("hide");           
            $('#display-word').addClass("show").removeClass("hide");
            $('#num-of-words-header').removeClass("show").addClass("hide");

            $('.submit-btn').on('click', event =>{
                show = !show;
                answer = $('#user-answer').val();
                    if (i < arrOfWords.length && answer == arrOfWords[i][1]) {
                        $('#correct').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('#user-answer').removeClass("show").addClass("hide");
                        $('#user-input').removeClass("show").addClass("hide");
                        $('#next').addClass("show").removeClass("hide");
                        $('#user-answer').val('');
                        correctAns++;
                    } else if(i < arrOfWords.length && answer != arrOfWords[i][1]) {
                        $('#incorrect').addClass("show").removeClass("hide");
                        $('#display-word').html('');
                        $('#user-input').removeClass("show").addClass("hide");
                        $('#user-answer').removeClass("show").addClass("hide").val('');
                        $('#next').addClass("show").removeClass("hide");
                        $('#incorrect').html(`
                                <p>The correct answer is:</p>
                                <h2>${arrOfWords[i][1]}</h2>
                        `);
                    } else {
                        $('#incorrect').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $("#next").prop('value', 'Play again');

                    }  

                $('#next').on('click', event => {
                    if (i < arrOfWords.length - 1 ){
                        i++; 
                        $('#display-word').addClass("show").removeClass("hide").html(`<h2>${arrOfWords[i][0]}</h2>`);
                        $('#user-input').addClass("show").removeClass("hide");
                        $('#user-answer').addClass("show").removeClass("hide");
                        $('#next').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $('#incorrect').removeClass("show").addClass("hide");
                        show = !show;
                    } else  {
                        $('#next').removeClass("show").addClass("hide");
                        $('#correct').removeClass("show").addClass("hide");
                        $('#incorrect').removeClass("show").addClass("hide");
                    }
                    
                });

            });
    });
}


function handleFlashcards() {
    numOfWords();
}

$('#number-input').submit(event => {
    event.preventDefault(); 
    handleFlashcards();
    console.log("test");
});

