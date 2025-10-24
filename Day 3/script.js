const form = document.querySelector("form");
const submitButton = document.getElementById("submitButton");
const checkText = document.getElementById("username");
const checkEmail = document.getElementById("email");
const checkAge = document.getElementById("userage");

// --- DATE CHECK BLOCK ---
const checkDate = document.getElementById("userbirth");
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  checkDate.setAttribute("max", `${year}-${month}-${date}`);
});

// --- VALIDATION FUNCTION (CENTRALIZED CONTROL) ---
function validateForm() {
  let isValid = true;

  // Username validation
  const getEmailLabel = document.getElementById("textWarning");
  const name = checkText.value.trim();
  if (name.length < 2 || name.length > 50) {
    getEmailLabel.textContent =
      "Characters should be ;ess than equal to 2 AND greater than equal to 50";
    isValid = false;
  } else {
    getEmailLabel.textContent = "";
  }

  // Email validation
  const getEmailWarning = document.getElementById("emailWarning");
  const email = checkEmail.value.trim();
  const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexPattern.test(email)) {
    getEmailWarning.textContent = "Please enter a valid email address";
    isValid = false;
  } else {
    getEmailWarning.textContent = "";
  }

  // Age validation
  const ageWarning = document.getElementById("ageWarning");
  const intAge = parseInt(checkAge.value.trim());
  if (!(intAge >= 1 && intAge <= 120)) {
    ageWarning.textContent = "Age is restricted between 1 and 120";
    isValid = false;
  } else {
    ageWarning.textContent = "";
  }

  // Hobby validation
  const hobbyWarning = document.getElementById("hobbyWarning");
  const checkboxes = document.querySelectorAll(
    '.hobbySelector input[type="checkbox"]'
  );
  const atLeast1 = Array.from(checkboxes).some((cb) => cb.checked);
  if (!atLeast1) {
    hobbyWarning.textContent = "Please select at least one hobby";
    isValid = false;
  } else {
    hobbyWarning.textContent = "";
  }

  submitButton.disabled = !isValid;
}

// --- EVENT LISTENERS (call unified validation) ---
checkText.addEventListener("change", validateForm);
checkEmail.addEventListener("change", validateForm);
checkAge.addEventListener("change", validateForm);
checkDate.addEventListener("change", validateForm);
form.addEventListener("change", validateForm); // catches checkbox and others too

submitButton.disabled = true;

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
// const form = document.querySelector("form");
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
