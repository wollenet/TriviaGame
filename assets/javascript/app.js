function populate() {
	if(quiz.isEnded()) {
		showscores();
	}
	else {
		// show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		// show choices
		var choices = quiz.getQuestionIndex().choices;
		for (var i = 0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choice[i];
			guess("btn" + i, choices[i]);
		}

		showProgress();
	}
};

function guess(id, guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		quiz.guess(guess);
		populate();
	}
};

function showProgress() {
	var currentQuestionNumber = quiz.questionsIndex + 1;
	var element = documnet.getElementById("progress");
	element.innerHTML = "question" + currentQuestionNumber + "of" + quiz.questions.length;
}

function showScores() {
	var gameOverhtml = "<h1>Result</h1>";
	gameOverhtml += "<h2 'id=score'> Your scores: " + quiz.score + "</h2>";
	var element = document.getElementById("quiz");
	element.innerHTML = gameOverhtml;
};

var questions = {
	new Quesiton("Who was  the first president from Ohio?", ["William Henry Harrison", "John Quincy Adams", "George Washington", "John Tyler"], "William Henry Harrison"),
	new Quesiton("When did Ohio become a State?", ["1826", "1856", "1815", "1803"], "1803"),
	new Quesiton("Who was the first Governor of Ohio?", ["Ethan Allen Brown", "Edward Tiffin", "Jeremiah Morrow", "Wilson Shannon"], "Edward Tiffin"),
	new Quesiton("How many United State Presidents have come from Ohio?", ["3", "5", "2", "8"], "8"),
	new Quesiton("What is the name of the oldest city in Ohio", ["Cleveland", "Columbus", "Martins Ferry", "Cincinnati"], "Martins Ferry"),
};

var quiz = new Quiz(questions);

populate();

//timer
document.getElementById('timer').innerHTML =
  03 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec};
  if (sec < 0) {sec = "59"};
  return sec;
}




//questions that will be answered and choices for those answers
function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionsIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
	return this.quesitons[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
	return this.questions.length === this.questionIndex
}

Quiz.prototype.guess = function(answer) {
	if(this.getQuestionIndex().correctAnswer(answer)) {
		this.scope++;
	}

	this.questionIndex++;
};


//quiz control to the right and wrong answers
function Question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
};

Question.prototype.correctAnswer = function(choice) {
	return choice === this.answer;
}

