let signBtn = document.querySelector(".signup");
let username = document.getElementById("user");
let email = document.getElementById("mail");
let password = document.getElementById("pass");
let password2 = document.getElementById("pass2");
let rightCheck = 0;
let accountNum = localStorage.getItem("accountNum") || 1;

signBtn.addEventListener("click", function (e) {
  e.preventDefault();
  checkInputs();
  if (rightCheck === 4) {
    localStorage.setItem(
      `account${accountNum}`,
      `${email.value.trim()} ${password.value}`
    );
    localStorage.setItem("accountNum", ++accountNum);
    setTimeout(() => {
      window.location = "signin.html";
    }, 250);
  }
});

function checkInputs() {
  rightCheck = 0;
  let userValue = username.value.trim();
  let emailValue = email.value.trim();
  let passValue = password.value;
  let pass2Value = password2.value;

  if (!userValue) {
    setError(username, "This Field Cannot Be Empty");
  } else {
    setSuccess(username);
    rightCheck++;
  }

  if (!emailValue) {
    setError(email, "This Field Cannot Be Empty");
  } else if (!mailMatched(emailValue)) {
    setError(email, "Please Enter Valid Email Address");
  } else {
    setSuccess(email);
    rightCheck++;
  }

  if (!passValue) {
    setError(password, "This Field Cannot Be Empty");
  } else if (!passMatched(passValue)) {
    setError(password, "Enter Strong Password Like (Hhhh@1230) 6~30");
  } else {
    setSuccess(password);
    rightCheck++;
  }

  if (!pass2Value) {
    setError(password2, "This Field Cannot Be Empty");
  } else if (pass2Value !== passValue) {
    setError(password2, "Passwords Not Matched");
  } else {
    setSuccess(password2);
    rightCheck++;
  }
}

function setError(input, msg) {
  let inputBox = input.parentNode;
  let errorMsg = inputBox.children[3];

  inputBox.className = "input-box add-margin failed";
  errorMsg.textContent = msg;
}

function setSuccess(input) {
  let inputBox = input.parentNode;
  inputBox.className = "input-box success";
}

function mailMatched(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function passMatched(password) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/.test(
    password
  );
}
