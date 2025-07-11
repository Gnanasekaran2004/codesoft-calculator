(() =>{
  const display = document.getElementById("displaybox");
  const calc    = document.getElementById("calculatork");


  calc.addEventListener("click", (e) => {
    const key   = e.target;
    const value = key.dataset.value;
    const action = key.dataset.action;

    if (!key.classList.contains("btn")) return;

    switch (action) {
      case "clear":
        display.value = "0";
        break;
      case "backspace":
        display.value = display.value.slice(0, -1) || "0";
        break;
      case "equals":
        evaluateExpression();
        break;
      default:
        appendValue(value);
    }
  });

  function appendValue(val) {
    if (display.value === "0" && val !== ".") {
      display.value = val;
    } else {
      display.value += val;
    }
  }

  function evaluateExpression() {
    try {
      const result = Function(`"use strict";return (${display.value})`)();
      display.value = String(result).length > 12 ? result.toPrecision(12) : result;
    } catch {
      display.value = "Error";
    }
  }
})();
