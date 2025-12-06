// validation.js
// This will handle visitor form validation and thank you message

//List of valid 2-letter state codes (tedious)
const validStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

//Required text field
function checkRequired(fieldId, requiredMessage) {
  const input = document.getElementById(fieldId);
  if (!input) return false;

  const value = input.value.trim();
  const valid = value.length > 0;

  setElementValidity(fieldId, valid, valid ? "" : requiredMessage);
  return valid;
}


// Regex format
function checkFormat(fieldId, badFormatMessage, regex) {
  const input = document.getElementById(fieldId);
  if (!input) return false;

  const value = input.value.trim();
  const valid = regex.test(value);

  setElementValidity(fieldId, valid, valid ? "" : badFormatMessage);
  return valid;
}

function validateState(fieldId, invalidMessage) {
  const input = document.getElementById(fieldId);
  if (!input) return false;

  const raw = input.value.trim().toUpperCase();
  input.value = raw; // make the text capital

  const valid =
    raw.length === 2 &&
    validStates.includes(raw);

  setElementValidity(fieldId, valid, valid ? "" : invalidMessage);
  return valid;
}




// Checkbox- at least one selected
function checkHowFound() {
  const checked = document.querySelectorAll('input[name="how-found"]:checked');
  const errorEl = document.getElementById('how-found-error');

  if (!errorEl) return true;

  if (checked.length === 0) {
    errorEl.textContent = "Please choose at least one option.";
    return false;
  }

  errorEl.textContent = "";
  return true;
}

function setElementValidity(fieldId, isValid, message) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.classList.add('was-validated');

  input.setCustomValidity(isValid ? "" : message);

  const container = input.closest('.form-field') || input.parentElement;
  const errorDiv = container ? container.querySelector('.errorMsg') : null;
  if (errorDiv) {
    errorDiv.textContent = isValid ? "" : message;
  }
}

function initValidation(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  //validate with submit
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const formIsValid = validateForm(form);

    if (formIsValid && form.checkValidity()) {
      //hide form and show thank you
      form.style.display = "none";
      const thankYou = document.getElementById("visitor-thankyou");
      if (thankYou) thankYou.style.display = "block";
    }
  });

  //validate single fields on change
  form.addEventListener("change", function (event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    validateField(target.id);
  });

  form.addEventListener("blur", function (event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    validateField(target.id);
  }, true);
}

function validateForm(form) {
  let isValid = true;

  if (!checkRequired("first-name", "First name is required")) isValid = false;
  if (!checkRequired("last-name", "Last name is required")) isValid = false;
  if (!checkRequired("address", "Address is required")) isValid = false;
  if (!checkRequired("city", "City is required")) isValid = false;

  if (!validateState("state", "Please enter a valid 2-letter US state")) isValid = false;

  if (!checkRequired("zip", "Zip is required")) isValid = false;
  else if (!checkFormat("zip", "Please enter a valid zip code", /^\d{5}(-\d{4})?$/)) isValid = false;

  if (!checkRequired("email", "Email is required")) isValid = false;
  else if (!checkFormat("email", "Please enter a valid email", /^[^@\s]+@[^@\s]+\.[^@\s]+$/)) isValid = false;

  if (!checkRequired("phone", "Cell phone is required")) isValid = false;
  else if (!checkFormat("phone", "Please enter a 10 digit phone number", /^\d{10}$/)) isValid = false;

  if (!checkHowFound()) isValid = false;

  return isValid;
}

function validateField(fieldId) {
  switch (fieldId) {
    case "first-name":
      return checkRequired("first-name", "First name is required");
    case "last-name":
      return checkRequired("last-name", "Last name is required");
    case "address":
      return checkRequired("address", "Address is required");
    case "city":
      return checkRequired("city", "City is required");
    case "state":
      return validateState("state", "Please enter a valid 2-letter US state");
    case "zip":
      return checkRequired("zip", "Zip is required") &&
             checkFormat("zip", "Please enter a valid zip code", /^\d{5}(-\d{4})?$/);
    case "email":
      return checkRequired("email", "Email is required") &&
             checkFormat("email", "Please enter a valid email", /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    case "phone":
      return checkRequired("phone", "Cell phone is required") &&
             checkFormat("phone", "Please enter a 10 digit phone number", /^\d{10}$/);
    default:
      return true;
  }
}
