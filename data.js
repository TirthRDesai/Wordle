const data = {
	words: [
		{
			word: "apple",
			meaning:
				"A type of fruit that is typically red or green and is often used in pies or eaten fresh.",
		},
		{
			word: "table",
			meaning:
				"A piece of furniture with a flat top and one or more legs, used for eating, working, or playing games.",
		},
		{
			word: "chair",
			meaning:
				"A piece of furniture designed for one person to sit on, typically with a backrest and four legs.",
		},
		{
			word: "ocean",
			meaning:
				"A vast body of saltwater that covers most of the Earth's surface.",
		},
		{
			word: "knife",
			meaning:
				"A cutting instrument consisting of a sharp blade attached to a handle, used for cutting or slicing.",
		},
	],
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWord() {
	let randomNum = getRandomInt(0, data.words.length);
	let word = data.words[randomNum].word;
	let meaning = data.words[randomNum].meaning;
	let currentData = {
		word: word,
		meaning: meaning,
	};
	return currentData;
}
