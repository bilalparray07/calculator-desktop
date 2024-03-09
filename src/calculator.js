let display = document.getElementById("display");
let history = [];

function addToDisplay(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = "";
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.textContent);
    display.textContent = result;
    history.push(display.textContent);
    localStorage.setItem("History", history);
  } catch (error) {
    display.textContent = "Error";
  }
}

// //history
let historyDiv = document.getElementById("history");
let historyFromLocal = localStorage.getItem("History");

function showHistory() {
  let historyFromLocal = localStorage.getItem("History");
  historyDiv.innerHTML = `History :- ${historyFromLocal}`;
}

function clearHistory() {
  history = [];
  historyDiv.innerHTML = ``;
  localStorage.removeItem("History");
}
