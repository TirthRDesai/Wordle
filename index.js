var word;
var hint;

window.onload = () => {
	selectWord();
	setTrials();
	makeInputs();
};

function selectWord() {
	let currentWord = getWord();
	word = currentWord.word.toUpperCase();
	hint = currentWord.meaning;
	document.querySelector("#hintSpan").innerHTML = hint;
	console.log(word);
}

function setTrials() {
	var trialDivs = document.getElementsByClassName("trialDiv");
	let i = 0;
	trialDivs[0].style.visibility = "visible";
	while (trialDivs[i].classList.contains("incomplete")) {
		trialDivs[i].style.visibility = "visible";
		i++;
	}
}

function makeInputs() {
	var inputFields = document.getElementsByClassName("inputWordleLetter");
	for (i = 0; i < inputFields.length; i++) {
		inputFields[i].addEventListener("input", function () {
			var parentDiv = this.parentElement;
			if (parentDiv.classList.contains("incomplete")) {
				var currentField = this;
				var alphabeticRegex = /^[a-zA-Z]+$/;
				var letter = this.value;
				if (alphabeticRegex.test(letter)) {
					if (letter.length == 1 && letter != " ") {
						currentField.value = letter.toUpperCase();
						if (!currentField.classList.contains("alphabet5")) {
							this.nextElementSibling.focus();
						} else if (currentField.classList.contains("alphabet5")) {
							currentField.blur();
						}
					} else if (letter == " ") {
						currentField.value = "";
					}
				} else {
					currentField.value = "";
				}
			} else {
				this.value = "";
				document.getElementById("errorParagraph").innerHTML = "Go to First Try";
			}
		});

		inputFields[i].addEventListener("keydown", function (e) {
			if (e.keyCode == 8) {
				e.preventDefault();

				var currentField = e.target;
				var previousField = currentField.previousElementSibling;

				if (
					currentField.value == "" &&
					!currentField.classList.contains("alphabet1")
				) {
					console.log(currentField.classList);
					currentField.value = "";
					previousField.focus();
				} else if (
					currentField.value == "" &&
					currentField.classList.contains("alphabet1")
				) {
					currentField.blur();
				} else {
					currentField.value = "";
				}
			}
		});
	}
}

function checkAllFields(currentDiv) {
	var childDivs = currentDiv.children;
	let empty = 0;
	let guessedWord = "";
	for (i = 0; i < childDivs.length; i++) {
		if (
			childDivs[i].value == undefined ||
			childDivs[i].value == null ||
			childDivs[i].value == "" ||
			childDivs[i].value == " "
		) {
			empty++;
		}
	}
	if (empty == 0) {
		for (i = 0; i < childDivs.length; i++) {
			guessedWord += childDivs[i].value;
		}
		return guessedWord;
	} else {
		return 1;
	}
}

function setFieldStyles(currentDiv) {
	var fields = currentDiv.children;
	for (i = 0; i < fields.length; i++) {
		if (fields[i].value == word[i]) {
			fields[i].style.backgroundColor = "green";
			fields[i].style.color = "white";
		} else {
			let letterInWord = false;
			for (j = 0; j < word.length; j++) {
				if (fields[i].value == word[j]) {
					letterInWord = true;
					break;
				}
			}
			if (letterInWord) {
				fields[i].style.backgroundColor = "yellow";
				fields[i].style.color = "black";
			} else {
				fields[i].style.backgroundColor = "red";
				fields[i].style.color = "white";
			}
		}
	}
}

function checkTrial() {
	var trialDivs = document.getElementsByClassName("trialDiv");
	var currentDiv = null;
	for (i = 0; i < trialDivs.length; i++) {
		if (trialDivs[i].classList.contains("incomplete")) {
			currentDiv = trialDivs[i];

			break;
		}
	}
	if (currentDiv != null) {
		let guessedWord = checkAllFields(currentDiv);
		if (guessedWord != 1) {
			let isWordMatched = false;
			if (guessedWord == word) {
				isWordMatched = true;
			}

			setFieldStyles(currentDiv);

			currentDiv.classList.replace("incomplete", "completed");
			if (!isWordMatched) {
				if (!(currentDiv.id == "try6Div")) {
					currentDiv.nextElementSibling.style.visibility = "visible";
					currentDiv.nextElementSibling.classList.replace(
						"remaining",
						"incomplete"
					);
				}
			}

			if (isWordMatched || currentDiv.id == "try6Div") {
				if (isWordMatched) {
					document.getElementById("errorParagraph").innerHTML = "You Won!!";
				} else {
					document.getElementById("errorParagraph").innerHTML =
						"You Lost!! Correct Answer Was: " + word;
				}
			}
		} else {
			document.getElementById("errorParagraph").innerHTML =
				"Fill all the field to check";
		}
	}
}
