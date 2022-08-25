import React from "react";
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import { useEffect } from "react";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";


function Header(props) {
  let { bgColor } = props;
  let [userLogin, setUserLogin] = useState(null);
  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("auth_token", token);
    Swal.fire({
        icon: "success",
        title: "Login Successfully",
      }).then(() => {
        window.location.reload();
      });
  };
  let onError = () => {
    alert("something went wrong try again...");
  };
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token) {
      let decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);
  let logOut = ()=>{
    Swal.fire({
        title: "Are you sure to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("auth_token");
          window.location.reload();
        }
      });
  }
  return (
    <>
      <GoogleOAuthProvider clientId="695974824664-h47q67u4iup3glfh6imrs778au705v2v.apps.googleusercontent.com">
        <Login success={onSuccess} error={onError} />
        <SignUp />
        <header className={"col-12 py-2 " + bgColor}>
          <div className="d-lg-flex d-md-flex justify-content-between me-5 pt-1 px-5 d-sm-none main-header">
            <p className="m-0">e!</p>
            {
                userLogin === null ? <div>
                <button
                  className="btn text-white me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  Login
                </button>
                <button
                  className="btn text-white btn-outline-light bg-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#sign-up"
                >
                  Create an Account
                </button>
              </div>:<div>
              <span
                className="text-white me-2"
                
              >
                welcome {userLogin.given_name}!!
              </span>
              <button
                className="btn text-white btn-warning"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
            }
          </div>
        </header>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;
