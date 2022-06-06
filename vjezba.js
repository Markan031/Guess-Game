let words = [
  "apple",
  "buildings",
  "woman",
  "cat",
  "car",
  "computer",
  "banana",
  "grass",
  "grandpa",
  "mother",
  "father",
  "sun",
  "beer",
  "juice",
  "engineering",
  "enthusiastic",
  "dogs",
  "scrub",
  "handle",
  "paste",
  "signal",
  "gun",
  "jittery",
  "gold",
  "sneeze",
  "ink",
  "degree",
];

let root = document.getElementById("root");
let empty = document.getElementById("empty");
let inputLetter = document.getElementById("input-letter");
let inputWord = document.getElementById("input-word");
let wordBtn = document.getElementById("word-btn");
let letterBtn = document.getElementById("letter-btn");
let usedLetters = document.getElementById("used-letters");
let start = document.getElementById("start");
let image = document.getElementById("image");

let nextGame = document.getElementById("nextGame");

let randomIndex = Math.floor(Math.random() * words.length);
let replacing = words[randomIndex].replace(/[a-z]/g, "-");
let indexArr = [];
let imgArrStart = [6];
let imgArr = [];
for (let i = 1; i < 7; i++) {
  imgArr.push(i);
}

let wordGuessP = document.createElement("p");
let wordGuesstxt = document.createTextNode(replacing);
wordGuessP.appendChild(wordGuesstxt);
empty.appendChild(wordGuessP);

console.log(words[randomIndex]);

letterBtn.addEventListener("click", () => {
  if (inputLetter.value == "") {
    let warning = document.createElement("div");
    warning.setAttribute("id", "warning");
    let warningP = document.createElement("p");
    let warningTxt = document.createTextNode("You have to type a letter!");
    warningP.appendChild(warningTxt);
    warning.appendChild(warningP);
    root.appendChild(warning);
    setTimeout(() => {
      root.removeChild(warning);
    }, 1500);
  }
  if (inputLetter.value.length == 1) {
    if (words[randomIndex].includes(inputLetter.value)) {
      for (let i = 0; i < words[randomIndex].length; i++) {
        if (words[randomIndex][i] == inputLetter.value) {
          indexArr.push(i);
        }
      }
      String.prototype.replaceAt = function (index, replacement) {
        if (index >= this.length) {
          return this.valueOf();
        }

        return (
          this.substring(0, index) + replacement + this.substring(index + 1)
        );
      };
      for (let i = 0; i < indexArr.length; i++) {
        replacing = replacing.replaceAt(indexArr[i], inputLetter.value);
      }
      indexArr = [];
      let newLetterP = document.createElement("p");
      let newLettertxt = document.createTextNode(replacing);
      newLetterP.appendChild(newLettertxt);
      empty.appendChild(newLetterP);
      empty.removeChild(empty.firstElementChild);
      let usedLettersP = document.createElement("p");
      let usedLettersTxt = document.createTextNode(inputLetter.value + ", ");
      usedLettersP.appendChild(usedLettersTxt);
      usedLetters.appendChild(usedLettersP);
      let countLines = 0;

      for (let i = 0; i < newLettertxt.length; i++) {
        if (newLettertxt.nodeValue[i] == "-") {
          countLines = countLines + 1;
        }
      }
      if (countLines == 0) {
        let win = document.createElement("div");
        win.setAttribute("id", "win");
        let winP = document.createElement("p");
        let winTxt = document.createTextNode("You are a winner!");
        winP.appendChild(winTxt);
        win.appendChild(winP);
        root.appendChild(win);
        wordBtn.disabled = true;
        letterBtn.disabled = true;
      }
    } else {
      let usedLettersP = document.createElement("p");
      let usedLettersTxt = document.createTextNode(inputLetter.value + ", ");
      usedLettersP.appendChild(usedLettersTxt);
      usedLetters.appendChild(usedLettersP);
      let newImg = document.createElement("img");
      newImg.src = "slike/" + imgArr[0] + ".jpg";
      image.appendChild(newImg);
      image.removeChild(image.firstElementChild);
      imgArr.shift();
      if (imgArr.length == 0) {
        let lose = document.createElement("div");
        lose.setAttribute("id", "lose");
        let lostP = document.createElement("p");
        let lostTxt = document.createTextNode("You lose!");
        lostP.appendChild(lostTxt);
        lose.appendChild(lostP);
        root.appendChild(lose);
        wordBtn.disabled = true;
        letterBtn.disabled = true;
      }
    }
  } else if (inputLetter.value.length > 1) {
    let warning = document.createElement("div");
    warning.setAttribute("id", "warning");
    let warningP = document.createElement("p");
    let warningTxt = document.createTextNode("You can type only one letter!");
    warningP.appendChild(warningTxt);
    warning.appendChild(warningP);
    root.appendChild(warning);
    setTimeout(() => {
      root.removeChild(warning);
    }, 1500);
  }
  inputLetter.value = "";
});

wordBtn.addEventListener("click", () => {
  if (inputWord.value == "") {
    let warning = document.createElement("div");
    warning.setAttribute("id", "warning");
    let warningP = document.createElement("p");
    let warningTxt = document.createTextNode("You have to type a word!");
    warningP.appendChild(warningTxt);
    warning.appendChild(warningP);
    root.appendChild(warning);
    setTimeout(() => {
      root.removeChild(warning);
    }, 1500);
  } else if (words[randomIndex] == inputWord.value) {
    let newWordP = document.createElement("p");
    let newWordtxt = document.createTextNode(inputWord.value);
    newWordP.appendChild(newWordtxt);
    empty.appendChild(newWordP);
    empty.removeChild(empty.firstElementChild);
    let win = document.createElement("div");
    win.setAttribute("id", "win");
    let winP = document.createElement("p");
    let winTxt = document.createTextNode("You are a winner!");
    winP.appendChild(winTxt);
    win.appendChild(winP);
    root.appendChild(win);
    wordBtn.disabled = true;
    letterBtn.disabled = true;
  } else {
    let lose = document.createElement("div");
    lose.setAttribute("id", "lose");
    let lostP = document.createElement("p");
    let lostTxt = document.createTextNode("You lose!");
    let newImg = document.createElement("img");
    newImg.src = "slike/" + imgArrStart[0] + ".jpg";
    image.appendChild(newImg);
    image.removeChild(image.firstElementChild);
    lostP.appendChild(lostTxt);
    lose.appendChild(lostP);
    root.appendChild(lose);
    wordBtn.disabled = true;
    letterBtn.disabled = true;
  }

  inputWord.value = "";
});

//let countLetters = words[randomIndex].length;
