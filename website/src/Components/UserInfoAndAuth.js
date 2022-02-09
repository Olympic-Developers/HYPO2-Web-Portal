export const authCheckAdmin = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification") !== "admin"
    ) {
      // Redirect back one page
      navigate(-1);
    }
  }
};

export const authCheckClient = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification") !== "client"
    ) {
      // Redirect back one page
      navigate(-1);
    }
  }
};

export const authCheckStaff = (navigate) => {
  // Checking if there is any variables stored (takes care of protecting path
  // from outside webpages)
  if (sessionStorage.length === 0) {
    // Redirect back to signIn page
    navigate("/");
  }

  // Takes care of protecting path from inside webpages
  else {
    // Checking if user is allowed here
    if (
      getSessionStorage("authenticated") !== "true" ||
      getSessionStorage("classification") !== "staff"
    ) {
      // Redirect back one page
      navigate(-1);
    }
  }
};

export const getSessionStorage = (variableName) => {
  if (sessionStorage.length !== 0) {
    return window.sessionStorage.getItem(variableName);
  }
};

export const setSessionStorage = (variableName, item) => {
  return window.sessionStorage.setItem(variableName, item);
};
