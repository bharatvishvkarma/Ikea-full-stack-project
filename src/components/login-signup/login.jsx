import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { LoginThunkActionCreator } from "./AuthReducer/Actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { checkLoggedinUser } from "../../api/api";

function Login(props) {
  let navigate = useNavigate()
  let isAuth = useSelector((data) => {
    console.log(data.AuthReducer.isAuth)
    return data.AuthReducer.isAuth
  })
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  let path = localStorage.getItem('path')
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inLoginFIleInput", input);
    axios.post('https://azure-rhinoceros-cap.cyclic.app/login', input)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message)
        // dispatch(LoginThunkActionCreator(input));
        localStorage.setItem('ikea-token', response.data.data.token)
        checkLoggedinUser()
          .then((res) => {
            console.log(res.data.user)
            dispatch(LoginThunkActionCreator('success', res.data.user));
            navigate(`${path}`)
          })
      })
      .catch((err) => {
        console.log(err.response.data.message)
        toast.error(err.response.data.message)
      })
  };
  //◀
  return (
    <>{isAuth ? <Navigate to={`${localStorage.getItem("path")}`} /> :
      <div className={styles.container}>
        <div id="loginLeftSection" className={styles.leftDiv}>
          <div>
            <Link to="/">
              <button
                type="button"
                style={{
                  marginLeft: "-45px",
                  fontSize: "40px",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >

              </button>
            </Link>
            <img
              src="https://in.accounts.ikea.com/resources/static/logo.svg"
              alt="IkeaLogoImg"
            />
          </div>
          <div>
            <h1>
              <span>Login</span> to your IKEA account.
            </h1>
            <p>Too many passwords?</p>
            <p>
              You can now login with an OTP we will send on your email address or
              verified mobile number.
            </p>
            <p>
              Access your IKEA account using your email address to add and verify
              your mobile number.
            </p>
          </div>
          <div>
            <p>
              IKEA.in - <Link to="#">Cookie Policy</Link> and{" "}
              <Link to="#">Privacy Policy</Link>
            </p>
            <p>© Inter IKEA Systems B.V. 1999-2023</p>
          </div>
        </div>
        <div id="loginRightSection" className={styles.rightDiv}>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br />
            <input type="email" name="email" onChange={handleChange} required />
            <br />
            <span>
              Login <Link to="#">with an OTP</Link>
            </span>
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <br />
            <span>
              <Link to="#">Forgot your password?</Link>
            </span>
            <br />
            <button>Continue</button>
            <br />
          </form>
          <div>
            <h4>Do not have an IKEA account? Create one now.</h4>
            <Link to="/signup">
              <button>I'm buying for my home</button>
            </Link>
            <br />
            <br />
            <button>I'm buying for my company</button>
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default Login;
