// Herder component of webpage

// Importing Link frpm react-router-dom
import {
  Link
} from 'react-router-dom';

// Function Header with props
function Header({ titleLink, first, firstLink, second, secLink, setIsAuth }) {

  // function for logout activity
  function logout() {
    // clearing localstorage
    localStorage.clear();
    alert("Logging you out!");
    // changing status of isAuth
    setIsAuth(false);
  }

  // returning header of webpage
  return (
    <nav className="navbar navbar-expand-lg bg-success p-2 text-dark bg-opacity-10" style={{ height: "7vh" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={titleLink}>MyApp</Link>
      </div>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {
            // displaying content of Header dynamically as per webpage
            first !== "" ?
              <li className="nav-item">
                <Link className="nav-link active fw-bold" aria-current="page" to={firstLink}>{first}</Link>
              </li> : ""
          }

          {
            // displaying content of Header dynamically as per webpage
            first !== "" ? 
              <li className="nav-item">
                <Link className="nav-link" to={secLink}>{second}</Link>
              </li> 
              : 
              // this one is for dashboard to provide Logout button
              <li className="nav-item">
                <p onClick={(e) => { logout(e) }} style={{ cursor: "pointer" }} className="nav-link" >Logout</p>
              </li>
          }
        </ul>
      </div>
    </nav>
  );
}
// exporting component
export default Header;
