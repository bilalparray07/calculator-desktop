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
    console.log("History:", history);
  } catch (error) {
    display.textContent = "Error";
  }
}
