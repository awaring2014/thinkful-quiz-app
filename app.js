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

// array containing question objects. From here, question objects will be pushed one at a time to state.quiz
var questionObjectArray = [];

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
	quiz: {}
};

// function to populate questionObjectArray with 5 random questions
function createQuizObject(array1, array2) {
	for (i=0; i < 5; i++) {
		array2.push(array1[Math.floor(Math.random() * 6) + 1]);
	}
}

// function to push single question object into state.quiz
function pushQuestion(state, object) {
	state.quiz.question = object[state.quiz.progress-1];
}

// function to initialize Question Progress object w/i state.quiz
function initQuestionProgressCounter(state) {
	state.quiz.progress = 1;
}

// function to increment Question Progress object
function incrementQuestionProgressCounter(state) {
	state.quiz.progress++;
}

// function to push feedback object to state based on answer chosen
function pushFeedback(state, object) {
	if ($("input[type='radio'][name='quiz-answer']:checked").val() === 'answer1') {
		state.quiz.feedback = object.correct;
	} else {
		state.quiz.feedback = object.incorrect;
	}
}

// function to reset state
function resetState(state) {
	state.quiz = [];
}

// function to build question page markup
function buildQuestion(state) {
	var questionText = 'Of the choices, for which idea is ' + state.quiz.question.philosopher + ' best known?';
	return $(
		'<h3>Question ' + state.quiz.progress + ' of 5</h3>' +
		'<p class="content">' + questionText + '</p>' +
		'<div>' +
      '<form id="js-quiz">' +
        '<input type="radio" name="quiz-answer" id="answer1" value="answer1" checked />' +
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
    '</div>'
	);
}

// function to build feedback page in html
function buildFeedbackPage (state) {
	return $(
		'<h3>' + state.quiz.feedback.h3 + '</h3>' +
		'<p class="content">' + state.quiz.feedback.p + '</p>' +
		'<button id="continue">Continue</button>'
	);
}

// function to build results page in html
function buildResultsPage (state) {
	return $(
		'<h3>Congratulations, you finished the quiz!</h3>' +
		'<p class="content">This will contain the score.</p>' +
		'<button id="restart">Restart Quiz</button>'
	);
}

// function to build start page in html
function buildStartPage (state) {
	return $(
		'<main>' +
    	'<h3>This box will hold the welcome message</h3>' +
			'<p class="content">This box will hold the quiz instructions</p>' +
			'<br>' +
			'<button class="begin">Begin</button>' +
		'</main>'
	);
}

function renderQuestionPage(element, state) {
	element.html(buildQuestion(state));
}

function renderFeedbackPage(element, state) {
	element.html(buildFeedbackPage(state));
}

function renderResultsPage(element, state) {
	element.html(buildResultsPage(state));
}

function renderStartPage (element, state) {
	element.html(buildStartPage(state));
}

// event listeners to call state-modifying and state-rendering functions

$(document).ready(function() {

	// begin quiz
	$('.begin').click(function (event) {
		event.preventDefault();
		initQuestionProgressCounter(state);
		createQuizObject(questions, questionObjectArray);
		pushQuestion(state, questionObjectArray);
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
		if (state.quiz.progress < 5) {
			incrementQuestionProgressCounter(state);
			pushQuestion(state, questionObjectArray);
			renderQuestionPage($('main'), state);
		} else {
			renderResultsPage($('main'), state);
		}
	});

	// restart quiz from results page
	$(document).on('click', '#restart', function(event) {
		resetState(state);
		renderStartpage($('main'), state);
	});
});