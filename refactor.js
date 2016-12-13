// array of question objects
var questions = [
	{
		philosopher: 'Plato',
		answer: 'Forms',
		incorrectAnswers: ['Substance Dualism', '4 causes', 'Monads']
	},
	{
		philosopher: 'Aristotle',
		answer: '4 Causes',
		incorrectAnswers: ['Substance Dualism', 'Forms', 'Divine Atemporalism']
	},
	{
		philosopher: 'Augustine',
		answer: 'Divine Atemporalism',
		incorrectAnswers: ['Substance Dualism', '4 causes', 'Necessary Connection']
	},
	{
		philosopher: 'Plotinus',
		answer: 'Neoplatonism',
		incorrectAnswers: ['Atemporalism', '4 causes', 'Monads']
	},
	{
		philosopher: 'Hume',
		answer: 'Necessary Connection',
		incorrectAnswers: ['Substance Dualism', 'Forms', 'Neoplatonism']
	},
	{
		philosopher: 'Kant',
		answer: 'Synthetic Aprori Knowledge',
		incorrectAnswers: ['Forms', 'Scientific Determinism', 'Monads']
	},
	{
		philosopher: 'Descartes',
		answer: 'Substance Dualism',
		incorrectAnswers: ['Forms', '4 causes', 'Necessary Connection']
	},
	{
		philosopher: 'David Lewis',
		answer: 'Modal Realism',
		incorrectAnswers: ['Substance Dualism', '4 causes', 'Divine Atemporalism']
	},
	{
		philosopher: 'Saul Kripke',
		answer: 'Necessity of Identity',
		incorrectAnswers: ['Substance Dualism', '4 causes', 'Monads']
	},
	{
		philosopher: 'Edmund Burke',
		answer: 'Beauty and the Sublime',
		incorrectAnswers: ['Necessary Connection', '4 causes', 'Monads']
	}
];

// object containing feedback objects. From here, feedback objects will be pushed one at a time to state.quiz
var feedbackObject = {
	correct: {
		h3: "You are correct!",
		p: "Click continue to answer another question!"
	},
	incorrect: {
		h3: "You are incorrect!",
		p: "Click continue to answer another question!"
	}
};

// state variable
var state = {
	quiz: {
		askedQuestions: []
	}
};

// function to choose question from bank and push it to state.quiz
function chooseQuestion(state, array) {
	var isNewQuestion = false;
	do {
		var randomIndex = Math.floor(Math.random() * (questions.length));
		if ($.inArray(randomIndex, state.quiz.askedQuestions) === -1) {
			state.quiz.question = questions[randomIndex];
			state.quiz.askedQuestions.push(randomIndex);
			isNewQuestion = true;
		}
	} while (!isNewQuestion);
}


// function to initialize Question Progress object and Answer object w/i state.quiz
function initCounters(state) {
	state.quiz.progress = 1;
	state.quiz.correct = 0;
}

// function to increment Question Progress object
function incrementQuestionProgressCounter(state) {
	state.quiz.progress++;
}

// function to track # of correct answers
function incrementCorrectAnswerCounter(state) {
	state.quiz.correct++;
}

// function to push feedback object to state based on answer chosen and increment correctAnswerCounter if correct
function pushFeedback(state, object) {
	if ($("input[type='radio'][name='quiz-answer']:checked").val() === 'answer1') {
		state.quiz.feedback = object.correct;
		incrementCorrectAnswerCounter(state);
	} else {
		state.quiz.feedback = object.incorrect;
	}
}

// function to reset state and question-object array
function reset(state) {
	state.quiz = [];
	state.quiz.askedQuestions = [];
}

// function to return question objects to question array
function pushBackQuestions (state) {
	for (i=0; i < questionObjectArray.length; i++) {
		questions.push(questionObjectArray[i]);
	}
}

// function to build and render question page
function renderQuestionPage(element, state) {
	element.html($(
		'<h3>Question ' + state.quiz.progress + ' of 5</h3>' +
		'<p class="content">Of the choices, for which idea is ' + state.quiz.question.philosopher +' best known?</p>' +
		'<div>' +
      '<form id="js-quiz">' +
        '<input type="radio" name="quiz-answer" id="answer1" value="answer1" required/>' +
        '<label for="answer1">' + state.quiz.question.answer + '</label>' +
        '<br>' +
        '<input type="radio" name="quiz-answer" id="answer2" value="answer2" />' +
        '<label for="answer2">' + state.quiz.question.incorrectAnswers[0] + '</label>' +
        '<br>' +
        '<input type="radio" name="quiz-answer" id="answer3" value="answer3" />' +
        '<label for="answer2">' + state.quiz.question.incorrectAnswers[1] + '</label>' +
        '<br>' +
        '<input type="radio" name="quiz-answer" id="answer4" value="answer4" />' +
        '<label for="answer2">' + state.quiz.question.incorrectAnswers[2] + '</label>' +
        '<br>' +
        '<button type="submit">Submit</button>' +
      '</form>' +
      '<p>You have answered ' + state.quiz.correct + ' question(s) correctly!' +
    '</div>'
	));
}

// function to build and render feedback page
function renderFeedbackPage(element, state) {
	element.html($(
		'<h3>' + state.quiz.feedback.h3 + '</h3>' +
		'<p class="content">' + state.quiz.feedback.p + '</p>' +
		'<button id="continue">Continue</button>'
	));
}

// function to build and render results page
function renderResultsPage(element, state) {
	element.html($(
		'<h3>Congratulations, you finished the quiz!</h3>' +
		'<p class="content">You answered ' + state.quiz.correct + ' questions correctly!</p>' +
		'<button id="restart">Restart Quiz</button>'
	));
}

// function to build and render start page
function renderStartPage(element) {
	element.html($(
		'<main>' +
    	'<h3>Test your knowledge on the history of philosophy with this quick quiz!</h3>' +
			'<p class="content">Click "Begin" to start!</p>' +
			'<br>' +
			'<button id="begin">Begin</button>' +
		'</main>'
	));
}

// event listeners to call state-modifying and state-rendering functions
$(document).ready(function() {

	// begin quiz
	$(document).on('click', '#begin', function(event) {
		event.preventDefault();
		initCounters(state);
		chooseQuestion(state, questions);
		renderQuestionPage($('main'), state);
	});

	// submit answer from question page
	$(document).on('submit', '#js-quiz', function(event) {
		event.preventDefault();
		delete state.quiz.question;
		pushFeedback(state, feedbackObject);
		renderFeedbackPage($('main'), state);
	});

	// continue quiz from feedback page
	$(document).on('click', '#continue', function(event) {
		event.preventDefault();
		delete state.quiz.feedback;
		if (state.quiz.progress < 5) {
			incrementQuestionProgressCounter(state);
			chooseQuestion(state, questions);
			renderQuestionPage($('main'), state);
		} else {
			renderResultsPage($('main'), state);
		}
	});

	// restart quiz from results page
	$(document).on('click', '#restart', function(event) {
		reset(state);
		renderStartPage($('main'));
	});
});