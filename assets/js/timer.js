var timeleft = 60;
var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML =
      "<button typy='button' class='btn btn-resend'>ارسال مجدد کد</button>";
  } else {
    document.getElementById("countdown").innerHTML =
      "زمان باقی مانده " + timeleft + " ثانیه";
  }
  timeleft -= 1;
}, 1000);

/*==================================
          START VERIFICATIOS CODE INPUT
        ==================================*/

const form = document.querySelector(".form-verification-code");
const inputs = form.querySelectorAll("input");
const KEYBOARDS = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39,
};

function handleInput(e) {
  const input = e.target;
  const nextInput = input.nextElementSibling;
  if (nextInput && input.value) {
    nextInput.focus();
    if (nextInput.value) {
      nextInput.select();
    }
  }
}

function handlePaste(e) {
  e.preventDefault();
  const paste = e.clipboardData.getData("text");
  inputs.forEach((input, i) => {
    input.value = paste[i] || "";
  });
}

function handleBackspace(e) {
  const input = e.target;
  if (input.value) {
    input.value = "";
    return;
  }

  input.previousElementSibling.focus();
}

function handleArrowLeft(e) {
  const previousInput = e.target.previousElementSibling;
  if (!previousInput) return;
  previousInput.focus();
}

function handleArrowRight(e) {
  const nextInput = e.target.nextElementSibling;
  if (!nextInput) return;
  nextInput.focus();
}

form.addEventListener("input", handleInput);
inputs[0].addEventListener("paste", handlePaste);

inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    setTimeout(() => {
      e.target.select();
    }, 0);
  });

  input.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case KEYBOARDS.backspace:
        handleBackspace(e);
        break;
      case KEYBOARDS.arrowLeft:
        handleArrowLeft(e);
        break;
      case KEYBOARDS.arrowRight:
        handleArrowRight(e);
        break;
      default:
    }
  });
});
const input = document.querySelectorAll(".input_group input");

inputs.forEach((input, idx) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && idx < input.length - 1) {
      inputs[idx + 1].focus();
    }
    checkOtpComplete();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && idx > 0) {
      inputs[idx - 1].focus();
    }
    setTimeout(() => {
      checkOtpComplete();
    }, 0);
  });
});

function checkOtpComplete() {
  const otpButton = document.getElementById("submitOtpBtn");
  const allFilled = Array.from(inputs).every(
    (input) => input.value.length === 1,
  );

  if (allFilled) {
    otpButton.removeAttribute("disabled");
  } else {
    otpButton.setAttribute("disabled", "true");
  }
}

document.getElementById("submitOtpBtn").addEventListener("click", (e) => {
  if (e.target.hasAttribute("disabled")) {
    e.preventDefault();
  }
});
