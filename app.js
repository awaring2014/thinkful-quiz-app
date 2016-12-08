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

// question-containg object. From here, question objects will be pushed one at a time to state.quiz
var questionObject = [];

// state variable
var state = {
	// holds quiz question objects. Question objects contain a question (string) and answers (string)
	quiz: {}
};

// functions to modify state

	// function to populate questionObject with 5 random questions
	function createQuizObject(array1, array2) {
		for (i=0; i < 5; i++) {
			array2.push(array1[Math.floor(Math.random() * 6) + 1]);
		}
	}

	// function to push single question object into state.quiz
	function pushQuestion(state, object, questionIndex) {
		state.quiz.question = object[questionIndex];
	}

	// function to cycle through questions

	// function to reset state
	function resetState(state) {
		state.quiz = [];
	}

// functions to render state

	// function to build question page in html
	function buildQuestion(state) {
		var questionText = 'Of the choices, for which idea is ' + state.quiz.question.philosopher + ' best known?';
		return $(
				'<h3>This box will hold the quiz progress</h3>' +
				'<p class="content">' + questionText + '</p>' +
				'<div>' +
		      '<form action="">' +
		        '<input type="radio" name="quiz-answer" id="answer1" val="answer1" checked />' +
		        '<label for="answer1">' + state.quiz.question.answer + '</label>' +
		        '<br>' +
		        '<input type="radio" name="quiz-answer" id="answer2" val="answer2" />' +
		        '<label for="answer2">' + state.quiz.question.incorrectAnswers[0] + '</label>' +
		        '<br>' +
		        '<input type="radio" name="quiz-answer" id="answer3" val="answer3" />' +
		        '<label for="answer2">' + state.quiz.question.incorrectAnswers[1] + '</label>' +
		        '<br>' +
		        '<input type="radio" name="quiz-answer" id="answer4" val="answer4" />' +
		        '<label for="answer2">' + state.quiz.question.incorrectAnswers[2] + '</label>' +
		      '</form>' +
		    '</div>' +
		    '<button>Submit</button>'
			);
	}

	function renderQuestionPage(element, state) {
		element.html(buildQuestion(state));
	}

// event listeners to call state-modifying and state-rendering functions

$(document).ready(function() {

	// begin quiz

	// submit answer

	// continue quiz

	// restart quiz

});