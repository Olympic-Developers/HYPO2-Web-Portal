export const authCheckAdmin = (navigate) => {
  // setting constants
  let lowerCasedClassification = window.sessionStorage
    .getItem("classification")
    .toLowerCase();
  let authenticated = window.sessionStorage.getItem("authenticated");

  // user not authenticated or not proper classification
  if (authenticated !== "true" || lowerCasedClassification !== "admin") {
    // user try to access this through a route in HYPO2 web Portal
    if (authenticated !== "false") {
      navigate(-1);
    }
    // Tried to access this page from a outside website
    else {
      navigate("/");
    }
  }
};

export const authCheckClient = (navigate) => {
  // setting constants
  let lowerCasedClassification = window.sessionStorage
    .getItem("classification")
    .toLowerCase();
  let authenticated = window.sessionStorage.getItem("authenticated");

  console.log(authenticated, lowerCasedClassification);
  // user not authenticated or not proper classification
  if (authenticated !== "true" || lowerCasedClassification !== "client") {
    // user try to access this through a route in HYPO2 web Portal
    if (authenticated !== "false") {
      navigate(-1);
    }
    // Tried to access this page from a outside website
    else {
      navigate("/");
    }
  }
};

export const authCheckStaff = (navigate) => {
  // setting constants
  const lowerCasedClassification = window.sessionStorage
    .getItem("classification")
    .toLowerCase();
  const authenticated = window.sessionStorage.getItem("authenticated");

  // user not authenticated or not proper classification
  if (authenticated !== "true" || lowerCasedClassification !== "staff") {
    // user try to access this through a route in HYPO2 web Portal
    if (authenticated !== "false") {
      navigate(-1);
    }
    // Tried to access this page from a outside website
    else {
      navigate("/");
    }
  }
};
