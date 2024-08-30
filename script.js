const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");
const decimal = document.querySelector(".decimal");
let operands = ["", ""];
let currOperand = 0;
let currOperation = null;
let state = "";
const operations = {
  "/": (a, b) => {
    return a / b;
  },
  "*": (a, b) => {
    return a * b;
  },
  "-": (a, b) => {
    return a - b;
  },
  "+": (a, b) => {
    return a + b;
  },
};
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let signal = button.textContent;
    console.log(signal);
    if (signal === "=") {
      if (operands[0] === "" || operands[1] === "") return;
      operands[0] = String(
        operations[currOperation](Number(operands[0]), Number(operands[1])),
      );
      decimal.disabled = false;
      operands[1] = "";
      currOperation = null;
      currOperand = 0;
      state = `${operands[0]}`;
      display.value = state;
      state = "";
      operands[0] = "";
      return;
    }
    if (signal === "CLR") {
      state = "";
      decimal.disabled = false;
      currOperation = null;
      operands[0] = "";
      operands[1] = "";
      display.value = state;
      return;
    }
    if (!Object.keys(operations).includes(signal)) {
      operands[currOperand] += signal;
      state += signal;
      display.value = state;
      if (signal === ".") decimal.disabled = true;
      return;
    }
    decimal.disabled = false;
    console.log(operands);
    if (currOperation === null) {
      currOperand = signal;
      state += signal;
      display.value = state;
      currOperand = 1;
    } else {
      if (operands[1] === "") {
        currOperation = signal;
        state = `${operands[0]}${currOperation}${operands[1]}`;
        display.value = state;
        return;
      }
      operands[0] = String(
        operations[currOperation](Number(operands[0]), Number(operands[1])),
      );
      operands[1] = "";
      currOperand = 1;
      state = `${operands[0]}${currOperation}${operands[1]}`;
      display.value = state;
    }
    currOperation = signal;
  });
});
