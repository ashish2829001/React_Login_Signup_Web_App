// DashBoard component
function DashBoard() {

  // styling for div of classname with card
  const styleSheet = {
    width: "600px",
    borderRadius: "5px",
    display : "flex",
    flexDirection : "column",
    alignItems: "center",
    justifyContent : "center",
    backgroundColor: "#edf5e4"
  }

  // Accessing localStorage
  const details = localStorage.getItem("details");
  const parsedDetails = JSON.parse(details);

  // Returning Body of dashboard page with dynamically filled details of User
    return (
      <div className="card" style = { styleSheet }>
        <div className="card-body">
          <h5 className="card-title">NAME - {parsedDetails.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Username - {parsedDetails.userName} </h6>
          <p className="card-text">Welcome to the DashBoard.</p>
        </div>
      </div>
    );
  }
  
  // exporting Component
  export default DashBoard;
  