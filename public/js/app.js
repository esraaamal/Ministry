
const sign_Btn = document.getElementById("signup_btn");
const form = document.getElementById("form");
const formBorderPass=document.getElementById("form-borderPass")


  


//Email
const input_email = document.getElementById("input_email");
const email_format = /^[A-ZA-z0-9._-]+@modee.gov.jo$/;
const email_help=document.getElementById("email_help")

//password
const input_pass = document.getElementById("input_pass");
const format_pass = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
const pass_help=document.getElementById("pass_help")


// validation Function for Email 
input_email.onkeyup = function () {
    if (input_email.value === "") {
        email_help.style.display="block"
        email_help.innerHTML = "The Email is Empty";
        email_help.style.color="red"

    
    } else {
      if (input_email.value.match(email_format)) {
        console.log('Success email')
        email_help.style.display="none"

      } else {
        email_help.style.display="block"
        email_help.innerHTML = "The Email is not valid";
        email_help.style.color="red"
      }
    }
  };


// validation Function for Password


  input_pass.onkeyup = function () {
    if (input_pass.value === "") {
        pass_help.style.display="block"
      pass_help.innerHTML = "Password is empty ";
      pass_help.style.color = "red";
    } else {
      if (input_pass.value.match(format_pass)) {
        pass_help.style.display="none";
      } else {
        pass_help.style.display="block"
      pass_help.innerHTML = "The Password is Not Valid";
      pass_help.style.color = "red";
        form.action = "#form";
      }
    }
  };



  //How to stroe the data from user input 
  var ministryName=localStorage.getItem("Ministry_ID")
  console.log(ministryName)
  const signUp = (e) => {
    
    let formData = JSON.parse(localStorage.getItem("formData")) || [];
    let exist =
      formData.length &&
      JSON.parse(localStorage.getItem("formData")).some(
        (data) => data.email.toLowerCase() == input_email.value.toLowerCase()
      );
  
    if (!exist) {
      formData.push({
        email: input_email.value,
        password: input_pass.value,
      });
  
      //envMinistry@modee.gov.jo
  //ma.esraa@modee.gov.jo
  
      localStorage.setItem("formData", JSON.stringify(formData));
      form.reset();
      input_email.focus();
     
    } 

    if(input_email.value=='envMinistry@modee.gov.jo' && input_pass.value=='CX6C8W21' && ministryName=='enviroMin'){
      document.getElementById("form").action = "enviroment.html";
      }
      else if(input_email.value=='waterMinistry@modee.gov.jo' && input_pass.value=='9PX76DEL' && ministryName=='waterMin'){
        document.getElementById("form").action = "water.html";

      }
      else if(input_email.value=='AgricMinistry@modee.gov.jo' && input_pass.value=='X36YT8OX' && ministryName=='AgricMin'){
        document.getElementById("form").action = "Agriculture.html";

      }
      else if(input_email.value=='pubWorkMinistry@modee.gov.jo' && input_pass.value=='K572447N' && ministryName=='pubWorkMin'){
        document.getElementById("form").action = "pubWork.html";
      }
      else{
      // document.getElementById("form").action = "../index.html";
      alert('Unknown User, please Try again with Different Account')
      form.reset();

      //  e.preventDefault()
      }
   
  };