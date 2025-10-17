
// ==================
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import classes from "./SignUp.module.css";
import { auth } from "../../Utility/firebase";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import ClipLoader from "react-spinners/ClipLoader";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  }); 

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData=useLocation();
  console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate( navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });

    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
           navigate( navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
          navigate("/");
        });
    }
  };

  return (
    <section className={classes.login}>
      
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign-In</h1>

 {navStateData?.state?.msg && (
 
    <small style={{
      padding: "5px",
      textAlign: "center",
      color: "red",
      fontWeight:"bold",
    }}
    >
{navStateData?.state?.msg}
    </small>
  )
}
        <form> 
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. 
          Please see our Privacy Notice, Cookies Notice, and Interest-based Ads Notice.
        </p>

        <button 
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            " Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ padding: "15px", color: "red" }}>
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;