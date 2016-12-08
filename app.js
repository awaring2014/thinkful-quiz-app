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
	},
];

// state variable
var state = {
	// holds quiz question objects. Question objects contain a question (string) and answers (string)
	quiz: []
};
// functions to modify state
	
// functions to render state

// event listeners to call state-modifying and state-rendering functions

$(document).ready(function() {

});