 function showStep(step) {

      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "none";
      document.getElementById("step3").style.display = "none";

      document.getElementById(step).style.display = "block";
    }

function verifyStep1() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Validate username and password
      if (username === "admin" && password === "password") {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    }

    function verifyStep2() {
      var code = document.getElementById("code").value;

      // Validate verification code
      if (code === "123456") {
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
      } else {
        alert("Invalid verification code. Please try again.");
      }
    }

    function verifyStep3() {
      var securityAnswer = document.getElementById("security-answer").value;

      // Validate security question and answer
      if (securityAnswer === "blue") {
          document.querySelector('#msg').style.display = 'block';

  // Hide alert after 5 seconds
  setTimeout(function(){
    document.querySelector('#msg').style.display = 'none';

     // Redirect to the decrypt page
    window.location.href = "dencrypt.html";
  },5000);

      } else {
        alert("Invalid security question or answer. Please try again.");
      }
    }

    function goBack(step) {
      showStep(step);
    }