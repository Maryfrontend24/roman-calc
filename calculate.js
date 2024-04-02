const ROMANS = {
  M: 1000,
  D: 500,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  VIII: 8,
  VII: 7,
  VI: 6,
  V: 5,
  IV: 4,
  III: 3,
  II: 2,
  I: 1,
};

const ALLOWED_OPERATIONS = ["+", "-", "*", "/"];

function arabicToRoman(number) {
  let resultToRoman = "";
  for (let key in ROMANS) {
    while (ROMANS[key] <= number) {
      resultToRoman += key;
      number = number - ROMANS[key];
    }
  }

  return resultToRoman;
}
//
function romanToArabic(string) {
  let arrayRomanKey = Object.keys(ROMANS);
  let arabic = 0;

  for (let i = 0; i < string.length; i++) {
    let leftNumberInString = string[i];
    let nextNumberInString = string[i + 1];
    let inRomans = arrayRomanKey.includes(
      leftNumberInString + nextNumberInString
    );

    if (inRomans) {
      arabic += ROMANS[leftNumberInString + nextNumberInString];
      i++;
    } else {
      arabic += ROMANS[leftNumberInString];
    }
  }
  return arabic;
}

function myCalculator(string) {
  const arr = string.split(" ");
  let [a, operation, b] = arr;

  if (operation === "/" && b == 0) {
    throw new Error("Ошибка деления");
  }

  if (arr.length !== 3) {
    throw new Error("Недопустимый формат ввода!");
  }

  let [num1, num2, isRoman] = convert(a, b);

  let aIsNotInterval = num1 <= 0 || num1 > 10;
  let bIsNotInterval = num2 <= 0 || num2 > 10;

  if (aIsNotInterval || bIsInterval) {
    throw new Error("Недопустимый формат ввода!");
  }

  if (!ALLOWED_OPERATIONS.includes(operation)) {
    throw new Error("Недопустимый формат ввода!");
  }

  let result = calculate(num1, operation, num2);

  if (isNaN(a) && isNaN(b)) {
    result = arabicToRoman(result);
  }

  if (isRoman && result <= 0) {
    return "-";
  }

  return String(result);
}
function convert(a, b, roman) {
  let isRoman = false;
  let arrayRomanKey = Object.keys(ROMANS);

  if (isNaN(Number(a)) && isNaN(Number(b))) {
    a = romanToArabic(a);
    b = romanToArabic(b);

    isRoman = true;

    if (isNaN(Number(a)) || isNaN(Number(b))) {
      throw new Error("Недопустимый формат ввода!");
    }
  }

  if (!isNaN(Number(a)) && isNaN(Number(b))) {
    throw new Error("Недопустимый формат ввода!");
  } else if (isNaN(Number(a)) && !isNaN(Number(b))) {
    throw new Error("Недопустимый формат ввода!");
  }

  a = parseInt(a, 10);
  b = parseInt(b, 10);
  return [a, b, isRoman];
}

function calculate(a, operation, b) {
  let result;
  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = Math.floor(a / b);
      break;
    default:
      throw new Error("Недопустимый формат ввода!");
  }
  return String(Math.floor(result));
}
//
console.log(myCalculator("11 + 1"));
