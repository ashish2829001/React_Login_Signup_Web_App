// Signup component

// importing useHistory from react-router-dom
import { useHistory } from 'react-router-dom';
// importing validator
import validator from 'validator';
// Signup component
function Signup() {
  // declaring variable history
  let history = useHistory();
  // signup function to call signup api
  function signup(e) {
    // preventing default page loading
    e.preventDefault();
    // getting name, userName and password from form
    let name = document.getElementById('name').value, password = document.getElementById('password1').value, userName = document.getElementById('username1').value;
    // checking for empty fields
    if (name === "" || userName === "" || password === "") {
      return alert("Name, Username or Password is empty!");
    }
    // validatong password (minCharacter = 6, atleast 1 lowercase letter, atleast 1 upper case letter, atleast 1 number and atleast 1 symbol)
    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    }) === false) {
      // notifying on weak password
      return alert("Please enter a strong password!");
    }
    // creating cred object
    let cred = {
      name,
      userName,
      password
    };
    // stringifying cred
    let strCred = JSON.stringify(cred);

    // calling signup API
    fetch("http://127.0.0.1:3001/api/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "validationKey": "######^&dmckjfsjkdkfj$$$"
      },
      body: strCred
    })
      .then(res => res.json())
      .then(result => {
        // checking to response status
        if (result.success) {
          // notifying on successful registration
          alert(result.message + "\n Please Login to continue.");
          // redirecting to login page
          history.push("/");
        } else {
          // clearing values of the inputfields in form
          document.getElementById("name").value = "";
          document.getElementById("username1").value = "";
          document.getElementById("password1").value = "";
          // notifying mistake
          return alert(result.message);
        }
      })
      .catch(error => {
        // handling error during calling API
        return alert("Internal server Error. Try again later!");
      })
  }

  return (
    // form of signup
    <form onSubmit={(e) => { signup(e) }} className="container-sm">
      <div >
        <p className="fw-bold text-center">Signup Here</p>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username1" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password1" />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </div>
    </form>
  );
}

// exporting signup component
export default Signup;