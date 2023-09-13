import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = "################";

  return {
    login,
    register,
    logout,
    edit,
    update,
  };

  // Login the user
  function login(data) {
    return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate(`/profile/${res.data.user.id}/`);
    });
  }

  // Register the user
  function register(data) {
    return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate(`/profile/${res.data.user.id}/`);
      //navigate(`/login/`);
    });
  }

  // Edit the user
  function edit(data, userId) {
    return axiosService
      .patch(`${baseURL}/user/${userId}/`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Registering the account in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: getAccessToken(),
            refresh: getRefreshToken(),
            user: res.data,
          })
        );
      });
  }

    // Update the user (only for superusers)
    function update(data, userId) {
      return axiosService
        .patch(`${baseURL}/user/${userId}/`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
    }

  // Logout the user
  function logout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Check if user is superuser
function checkSuperuser()  {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth.user.is_superuser) {
    return true;
  } else {
    return false;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  checkSuperuser,
};
