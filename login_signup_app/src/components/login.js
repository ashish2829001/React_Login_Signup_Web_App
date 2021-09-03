// Login component

// Component with props
function Login({ setIsAuth }) {
  // function to validate the login details
  async function login(e) {
    // to prevent webpage from loading
    e.preventDefault();
    // getting credentials from form
    let cred = {
      userName: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    // stringifying cred 
    let strCred = JSON.stringify(cred);
    // calling login api
    try {
      let result = await fetch("http://127.0.0.1:3001/api/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "validationKey": "######^&dmckjfsjkdkfj$$$"
        },
        body: strCred
      });
      result = await result.json();
      // checking for result of API
      if (result.success) {
        // storing the details of user in Local Storage
        localStorage.setItem('details', JSON.stringify(result.details));
        // Setting isAuth to true
        setIsAuth(true);
      } else {
        // removing the value of form input fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        // Notifying the mistake
        alert(result.message);
      }
    } catch (error) {
      // Handling error in try-block
      return alert("Internal Server Error. Try again later!");
    }
  }
  // return the body of login page
  return (
    // form for getting login credentials
    <form onSubmit={(e) => { login(e) }} className="container-sm">
      <p className="fw-bold text-center">Login Here</p>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

// exporting Login component
export default Login;