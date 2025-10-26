function validateForm() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Clear old error messages
  errorMsg.textContent = "";

  // Check empty fields
  if (!username || !email || !phone || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required.";
    return false;
  }

  // Phone validation (only digits and 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    errorMsg.textContent = "Phone number must be 10 digits and contain only numbers.";
    return false;
  }

  // Password validation (at least 7 chars, 1 uppercase, 1 digit, 1 special character)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@])[A-Za-z\d&$#@]{7,}$/;
  if (!passwordRegex.test(password)) {
    errorMsg.textContent = "Password must be at least 7 characters long, contain one uppercase letter, one digit, and one special character (&,$,#,@).";
    return false;
  }

  // Confirm password match
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return false;
  }

  alert("Registration successful!");
  return true;
}
