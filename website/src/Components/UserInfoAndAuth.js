// Checking if Admin can enter page
export const authCheckAdmin = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
    return false;
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification").toLowerCase() !== "admin"
    ) {
      // Redirect back one page
      navigate(-1);
      return false;
    }
  }

  return true;
};

// Checking if Client can enter page
export const authCheckClient = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
    return false;
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification").toLowerCase() !== "client"
    ) {
      // Redirect back one page
      navigate(-1);
      return false;
    }
  }

  return true;
};

// Checking if Staff can enter page
export const authCheckStaff = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
    return false;
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification").toLowerCase() !== "staff"
    ) {
      // Redirect back one page
      navigate(-1);
      return false;
    }
  }

  return true;
};

export const getSessionStorage = (variableName) => {
  if (sessionStorage.length !== 0) {
    return window.sessionStorage.getItem(variableName);
  }
};

export const setSessionStorage = (variableName, item) => {
  window.sessionStorage.setItem(variableName, item);
};
