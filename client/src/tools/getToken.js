const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("User is logged in");
    return token;
  } else {
    console.log("User is NOT logged in");
    return false;
  }
};

export default getToken;