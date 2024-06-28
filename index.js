document.addEventListener("DOMContentLoaded", function () {
  // variables
  inputs = document.getElementsByClassName("form-input");
  day = document.getElementById("day-input");
  month = document.getElementById("month-input");
  year = document.getElementById("year-input");
  labels = document.getElementsByClassName("form-label");
  errors = document.getElementsByClassName("error-message");
  btn = document.getElementsByTagName("button")[0];
  thirtyDays = [4, 6, 9, 11];
  outputYears = document.getElementById("number-years");
  outputMonths = document.getElementById("number-months");
  outputDays = document.getElementById("number-days");
  missingText = "This field is required";
  invalidDate = "Must be a valid date";
  invalidMonth = "Must be a valid month";
  invalidYear = "Must be in the past";

  //showError (element, error, label)
  let showError = (el, text) => {
    el.classList.add("error-border");
    el.nextElementSibling.classList.add("error-show");
    el.nextElementSibling.innerHTML = text;
    el.previousElementSibling.classList.add("error-color");
  };

  let showErrorDateOnly = () => {
    for (i = 0; i < inputs.length; i++) {
      inputs[i].classList.add("error-border");
      inputs[i].previousElementSibling.classList.add("error-color");
    }
    day.nextElementSibling.innerHTML = invalidDate;
    day.nextElementSibling.classList.add("error-show");
  };

  //hideError
  let hideError = (el) => {
    el.classList.remove("error-border");
    el.nextElementSibling.classList.remove("error-show");
    el.previousElementSibling.classList.remove("error-color");
  };

  //hideallErrors()
  let hideAllErrors = () => {
    for (i = 0, j = inputs.length; i < j; i++) {
      hideError(inputs[i]);
    }
  };

  //checking empty, using an array ( -> boolean)
  let isEmpty = () => {
    let counter = 0;
    for (i = 0, j = inputs.length; i < j; i++) {
      if (!inputs[i].value) {
        showError(inputs[i], missingText);
        console.log("empty error");
      } else {
        counter++;
      }
    }
    if (counter === inputs.length) {
      console.log("no empty");
      return true;
    } else {
      return false;
    }
  };

  //isValidDay (date -> boolean)
  let isValidDay = () => {
    let dayCheck = day.value;
    if (dayCheck > 0 && dayCheck < 32) {
      console.log("valid day");
      return true;
    } else {
      showError(day, invalidDate);
      return false;
    }
  };

  //isValidMonth (() -> boolean)
  let isValidMonth = () => {
    let monthCheck = month.value;
    if (monthCheck > 0 && monthCheck < 13) {
      console.log("valid month");
      return true;
    } else {
      showError(month, invalidMonth);
      return false;
    }
  };

  //isValidYear (() -> boolean)
  let isValidYear = () => {
    if (year.value <= new Date().getFullYear()) {
      console.log("valid year");
      return true;
    } else {
      console.log("date error");
      showError(year, invalidYear);
      return false;
    }
  };

  //isValidDate (date -> boolean)
  let isValidDate = () => {
    monthAsNum = Number(month.value);
    dayAsNum = Number(day.value);
    yearAsNum = Number(year.value);

    //Feb
    if (monthAsNum === 2 && dayAsNum > 28) {
      if (yearAsNum % 4 === 0 && dayAsNum === 29) {
        return true;
      } else {
        console.log("invalid feb");
        return false;
      }
    } else if (thirtyDays.includes(monthAsNum) && dayAsNum === 31) {
      showErrorDateOnly();
      console.log("invalid 30 month");
      return false;
    } else {
      console.log("isvaluddate true");
      return true;
    }
  };

  //calculate age
  // first do simple subtraction
  let age = () => {
    today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    currentDate = today.getDate();

    finalYear = currentYear - year.value;
    finalMonth = currentMonth - month.value;
    finalDate = currentDate - day.value;

    console.log(finalYear, finalMonth, finalDate);

    if (finalDate < 0) {
      finalDate = 31 + finalDate;
      finalMonth--;
      console.log("neg day", finalYear, finalMonth, finalDate);
    }
    if (finalMonth < 0) {
      finalMonth = 12 + finalMonth;
      finalYear--;
      console.log("neg month", finalYear, finalMonth, finalDate);
    }
    //display the info
    outputYears.innerHTML = finalYear;
    outputMonths.innerHTML = finalMonth;
    outputDays.innerHTML = finalDate;
  };

  //onsubmit
  btn.addEventListener("click", function () {
    hideAllErrors();
    if (
      isEmpty() &&
      isValidDay() &&
      isValidMonth() &&
      isValidYear() &&
      isValidDate()
    ) {
      age();
    } else {
      console.log("we got a false");
    }
  });
});
