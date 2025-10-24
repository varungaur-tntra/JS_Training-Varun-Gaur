//text check block

const checkText = document.getElementById("username");
const getEmailLabel = document.getElementById("textWarning");

checkText.addEventListener("input", () => {
  const textLength = checkText.value.trim().length;
  if (textLength < 2 || textLength > 50) {
    getEmailLabel.textContent =
      "Characters should greater than equal to 2 AND less than equal to 50";
  } else {
    getEmailLabel.textContent = "";
  }
});

// email check block

const checkEmail = document.getElementById("email");

checkEmail.addEventListener("input", () => {
  const textEmail = checkEmail.value.trim();
  const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getEmailWarning = document.getElementById("emailWarning");
  if (!regexPattern.test(textEmail)) {
    getEmailWarning.textContent = "Please enter a valid email address";
  } else {
    getEmailWarning.textContent = "";
  }
});

// age check block

const checkAge = document.getElementById("userage");

checkAge.addEventListener("input", () => {
  const intAge = parseInt(checkAge.value.trim());

  const ageWarning = document.getElementById("ageWarning");
  if (intAge >= 1 && intAge <= 120) {
    ageWarning.textContent = "";
  } else {
    ageWarning.textContent = "Age is restricted between 1 and 120";
  }
});

// date check block

const checkDate = document.getElementById("userbirth");

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 and pad
  const date = String(today.getDate()).padStart(2, "0"); // pad

  const maxDate = `${year}-${month}-${date}`;
  checkDate.setAttribute("max", maxDate);
});

// checkbox check

document.querySelector("form").addEventListener("input", (e) => {
  const checkboxes = document.querySelectorAll(
    '.hobbySelector input[type="checkbox"]'
  );
  const hobbyWarning = document.getElementById("hobbyWarning");
  const submitButton = document.getElementById("submitButton");
  const atLeast1 = Array.from(checkboxes).some((cb) => cb.checked);

  if (atLeast1) {
    hobbyWarning.textContent = "";
    submitButton.disabled = false;
  } else {
    hobbyWarning.textContent = "Please enter atleast one hobby";
    submitButton.disabled = true;
  }
});

// country fetch list for Country Dropdown, used 3rd party API

let countryList;

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then((response) => response.json())
    .then((data) => {
      countryList = data.map((country) => country.name.common).sort();

      // Populate dropdown after data is loaded
      const countryParent = document.getElementById("countrySelect");

      countryList.forEach((country) => {
        const selectCountry = document.createElement("option");
        selectCountry.setAttribute("value", country);
        selectCountry.textContent = country;
        countryParent.appendChild(selectCountry);
      });
    });
});

// JSOn Parse Code
const form = document.querySelector("form");
const submittedEmails = new Set();
let records = [];
let firstEnter = false;

// Create the JSON display window
function createJSONWindow() {
  if (!firstEnter) {
    const container = document.getElementById("container");
    const JSONParserCreate = document.createElement("div");
    JSONParserCreate.id = "JSONParser";
    JSONParserCreate.className = "JSONParserBox";
    container.appendChild(JSONParserCreate);

    const headJSON = document.createElement("div");
    headJSON.innerHTML = `<h3 class="JSONParseList">Display Box</h3>
{
   <div class="DisplayBoxList" id="DisplayBoxList"></div>
}`;
    JSONParserCreate.appendChild(headJSON);
    firstEnter = true;
  }
}

// Load records from localStorage and display them, Run on page load
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("JSONrecords");
  if (stored) {
    records = JSON.parse(stored);
    createJSONWindow(); // create the display box
    records.forEach((record) => {
      displayRecord(record);
      submittedEmails.add(record.email); // prevent duplicates
    });
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createJSONWindow();

  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("userage").value.trim();
  const birth = document.getElementById("userbirth").value;
  const country = document.getElementById("countrySelect").value;

  const genderValue = document.querySelector('input[name="gender"]:checked');
  const gender = genderValue
    ? genderValue.nextElementSibling.textContent.trim()
    : "Gender not selected";

  const hobbyValue = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((cb) => cb.value);

  const submitWarning = document.getElementById("submitWarning");
  if (submittedEmails.has(email)) {
    submitWarning.textContent = "This email has already been submitted!";
    return;
  } else {
    submitWarning.textContent = "";
  }

  submittedEmails.add(email);

  const jsonData = {
    name,
    email,
    age,
    dob: birth,
    gender,
    hobbies: hobbyValue,
    country,
  };

  // Store record in array and localStorage
  records.push(jsonData);
  localStorage.setItem("JSONrecords", JSON.stringify(records));

  // Display the new record
  displayRecord(jsonData);

  form.reset();
});

// Display a single record in the DOM
function displayRecord(record) {
  const DisplayBoxList = document.getElementById("DisplayBoxList");
  if (!DisplayBoxList) return;

  const preFinder = DisplayBoxList.lastElementChild;
  if (preFinder) preFinder.textContent += ",";

  const JSONElement = document.createElement("pre");
  JSONElement.textContent = JSON.stringify(record, null, 2);
  DisplayBoxList.appendChild(JSONElement);
}

// theme template

const themeButton = document.getElementById("themeButton");
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "default");
}

function applyTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

applyTheme();

themeButton.addEventListener("click", () => {
  const themeReceive = localStorage.getItem("theme");

  if (themeReceive == "default") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "default");
  }
  applyTheme();
});
