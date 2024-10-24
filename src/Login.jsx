import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate, useSearchParams, Form } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { validate, validateUser } from "./redux/store";

export default function Login() {

  const data=useSelector(state=>state.validate.data);

  const formRef=useRef();

  const dispatch=useDispatch();


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const mode = params.get("mode");

  const isLogin = mode === "login";


  useEffect(() => {
    navigate("?mode=login");
  }, []);

  useEffect(() => {
    console.log(data.data)
    let timer;
    if (data&&data.data === "Account created successfully") {
      timer = setTimeout(() => {
        dispatch(validate.handleError());
        formRef.current.reset();
        navigate("/?mode=login");
      }, 3000);
    } else if (data&&data.data === true) {
      navigate("/dashboard");
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let allData = {};
    allData = {
      useremail: data.get("useremail"),
      password: data.get("password"),
    };
    if (!isLogin) {
      allData = { ...allData, username: data.get("username") };
      if (data.get("password") !== data.get("cnfpassword")) {
        dispatch(validate.handlePassword()) ///note
      } else {
        dispatch(validateUser({url:"http://localhost:8000/signup",data:allData}))
      }
    } else {
      dispatch(validateUser({url:"http://localhost:8000/login",data:allData}))
      setLoading(true);
    }
  }

  function handleError(){
    setLoading(false);
    dispatch(validate.handleError())
  }
  return (
    <div id={styles.loginbox} >
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <Form action="" onSubmit={(e) => handleSubmit(e)} className={styles.form} autoComplete="off" style={isLogin?{height:"300px"}:{height:"400px"}} ref={formRef} > 
        {!isLogin && (
          <TextField
          name="username"
          type="text"
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          onBlur={handleError}
        />
        )}
        <TextField
          required
          id="outlined-required"
          label="Email or Phone"
          defaultValue=""
          type="text"
          name="useremail"
          onBlur={handleError}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          defaultValue=""
          type="password"
          name="password"
          onBlur={handleError}
        />

        {!isLogin && (

          <TextField
          required
          id="outlined-required"
          label="Confirm Password"
          defaultValue=""
          type="password"
          name="cnfpassword"
          onBlur={handleError}
        />
        )}
        {isLogin && (
          <div className={styles.formdiv}>
           
            <Link underline="hover">Forgot Password?</Link>
          </div>
        )}
        {data && data ? (
          <h6 style={{ textAlign: "left", color: data.color,marginTop:"0px" }}>
            {data.data}
          </h6>
        ) : (
          ""
        )}
        <Button type="submit" variant="contained" disabled={loading||data.data==="Password must be same"||data.data==="Account already exists with same username"}>{isLogin ? (loading ? "Login...." : "Login") : "Signup"}</Button>
        <p>
          {isLogin ? "Not a member? " : "Already a member? "}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Signup now" : "Login now"}
          </Link>
        </p>
      </Form>
    </div>
  );
}
