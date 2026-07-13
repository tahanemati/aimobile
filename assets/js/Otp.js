// mobile 09 check
const form = document.getElementById("signinForm");
const formFields = form.querySelectorAll(".form-field");
const submitBtn = document.getElementById("submitSigninBtn");
const phoneInput = document.getElementById("phoneInput");

function checkFormComplete() {
  const allFilled = Array.from(formFields).every(
    (field) => field.value.trim().length > 0,
  );

  if (allFilled) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "true");
  }
}

function handlePhoneInput(e) {
  let value = e.target.value;

  value = value.replace(/[^0-9]/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 0 && value[0] !== "0") {
    value = "0" + value;
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
  }

  e.target.value = value;
  checkFormComplete();
}

formFields.forEach((field) => {
  field.addEventListener("input", checkFormComplete);
  field.addEventListener("change", checkFormComplete);
});

phoneInput.addEventListener("input", handlePhoneInput);

phoneInput.addEventListener("paste", (e) => {
  e.preventDefault();
  const pastedText = e.clipboardData
    .getData("text")
    .replace(/[^0-9]/g, "")
    .slice(0, 11);
  phoneInput.value = pastedText;
  handlePhoneInput({ target: phoneInput });
});

submitBtn.addEventListener("click", (e) => {
  if (e.target.hasAttribute("disabled")) {
    e.preventDefault();
  }
});

checkFormComplete();
