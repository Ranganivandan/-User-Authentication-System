function showSignIn() {
  document.querySelector(".form-box.active").classList.remove("active");
  document.getElementById("signin").classList.add("active");
}

function showSignUp() {
  document.querySelector(".form-box.active").classList.remove("active");
  document.getElementById("signup").classList.add("active");
}

function validateSignIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return false; // Prevent form submission
  }

  alert("Sign In Successful!");
  return true; // Allow form submission (for demonstration)
}

function validateSignUp() {
  const email = document.getElementById("emailSignup").value;
  const password = document.getElementById("passwordSignup").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;

  if (email === "" || password === "" || phone === "" || age === "") {
    alert("Please fill in all fields.");
    return false; // Prevent form submission
  }

  alert("Sign Up Successful!");
  return true; // Allow form submission (for demonstration)
}
