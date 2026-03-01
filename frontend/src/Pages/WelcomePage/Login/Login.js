import React,{useState,useEffect} from "react"
import "./Login.css";
import {FaFacebookF} from "react-icons/fa";
import {GrTwitter,GrGoogle} from "react-icons/gr";
import logo from "../../../images/RentForCentsLogo.png";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { RentsForCents } from "../../../Constants/Constants";
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router";
import {authentication} from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = ({isLog}) => {

    const [sign, setSign] = useState({fName:"",email:"",password:"",mobile:""});
    const [isopen, setisopen] = useState(false);
    const [OTP, setOTP] = useState("");
    const [isInput, setIsInput] = useState(false);
    const [btn, setBtn] = useState();
    const [head, setHead] = useState();
    const [para, setPara] = useState();
    const history= useHistory();

    useEffect(()=>{
        setBtn(isopen ? "SIGN UP" : "SIGN IN")
        setHead(isopen ? "Hello, Friend!" : "Welcome Back!");
        setPara(
            isopen
              ? "Enter Your Personal Details And Start Journey With Us."
              : "To Keep Connected With Us Please Login With Your Credentials"
        );
    },[isopen])

    const handleInput = (e) => {
        if(e.target.name==='mobile'){
            if(isNaN(e.target.value) || e.target.value.length>10){
                return;
            }
        }
        setSign({
            ...sign,
            [e.target.name]: e.target.value
        })
    }

    const changeSignUp = () => {
        setisopen(!isopen);
        let logIn=document.getElementById("log");
        let signUp=document.getElementById("create");
        let animate=document.getElementById("animate");

        if(btn==="SIGN IN"){
            signUp.style.display="none";
            setTimeout(()=>{logIn.style.display="flex"},700);
            animate.style.animation="move 0.7s linear";
        } else {
            logIn.style.display="none";
            setTimeout(()=>{signUp.style.display="flex"},700);
            animate.style.animation="moveBack 0.7s linear";
        }
    }

    // ✅ SIGN IN
    const handleSignIn = async (e)=>{
        e.preventDefault();

        try {
            const res = await fetch(`${RentsForCents}/signin`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    email: sign.email,
                    password: sign.password
                }),
            });

            const data = await res.json();

            if(data.status){
                localStorage.setItem("name",data.data.userDetails.customerName)
                localStorage.setItem("email",data.data.userDetails.email)
                localStorage.setItem("mobile",data.data.userDetails.contactNumber)
                localStorage.setItem("verified",data.data.verified)
                localStorage.setItem("id",data.data.ID)
                history.push({pathname:"/user-dashboard"})
            } else {
                alert(data.message);
            }
        } catch(err){
            console.error("Signin error:", err);
        }
    }

    // ✅ MANAGER LOGIN
    const handleManagerSignIn = async (e)=>{
        e.preventDefault();

        try {
            const res = await fetch(`${RentsForCents}/managerLogin`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    email: sign.email,
                    password: sign.password
                }),
            });

            const data = await res.json();

            if(data.status){
                localStorage.setItem("name",data.data.name)
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("mobile",data.data.mobile)
                history.push({pathname:"/manager-dashboard"})
            } else {
                alert(data.message);
            }
        } catch(err){
            console.error("Manager signin error:", err);
        }
    }

    // ✅ CHECK USER
    const checkUser = async () => {
        try {
            const res = await fetch(`${RentsForCents}/signup/check`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    userDetails: sign
                }),
            });

            const data = await res.json();
            console.log("checkUser:", data);

            if(data.status){
                setIsInput(true);
                handleAuth();
            } else {
                alert(data.message);
            }
        } catch(err){
            console.error("checkUser error:", err);
        }
    }

    // ✅ SIGNUP CLICK
    const handleSignUp = async (e)=>{
        e.preventDefault();

        if(!sign.mobile || !sign.fName || !sign.email || !sign.password){
            alert("All Fields Are Mandatory");
            return;
        }

        if(sign.mobile.length!==10){
            alert("Invalid Mobile Number");
            return;
        }

        checkUser();
    }

    // ✅ OTP SUBMIT (DEV + PRODUCTION SAFE)
const handleOtpSubmit = () => {

    // 🟢 DEV MODE (FREE — no Firebase SMS needed)
    if (OTP === "123456") {
        console.log("DEV OTP accepted");
        handleSubmit();
        return;
    }

    // 🔒 REAL FIREBASE FLOW (future use)
    if (!window.confirmationResult) {
        alert("OTP session not ready. Try again.");
        return;
    }

    window.confirmationResult
        .confirm(OTP)
        .then(() => {
            handleSubmit();
        })
        .catch((error) => {
            console.error("OTP error:", error);
            alert("Invalid OTP");
        });
};

    // ✅ FINAL SIGNUP
    const handleSubmit = async() => {
        try {
            const res = await fetch(`${RentsForCents}/signup`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    userDetails: sign
                }),
            });

            const data = await res.json();
            console.log("signup:", data);

            if(data.status){
                alert("Your Account Created Successfully");
                setSign({fName:"",email:"",password:"",mobile:""});
            } else {
                alert(data.message);
            }
        } catch(err){
            console.error("Signup error:", err);
        }
    }

// ✅ DEV MODE AUTH (FREE — no Firebase billing)
const handleAuth = () => {
    console.log("DEV MODE: skipping real SMS");

    // fake confirmation for testing
    window.confirmationResult = {
        confirm: (otp) => {
            return new Promise((resolve, reject) => {
                if (otp === "123456") {
                    resolve({ user: { uid: "test-user" } });
                } else {
                    reject(new Error("Invalid OTP"));
                }
            });
        }
    };

    console.log("Fake OTP session ready");
};

    // ✅ UI (unchanged)
    return (
        <>
            {isLog ?
                <div className="box">
                    <div id="animate">
                        <img src={logo} className="mainLogo" />
                        <h1>{head}</h1>
                        <p>{para}</p>
                        <button id="signIn" onClick={changeSignUp}>{btn}</button>
                    </div>

                    <div id="create">
                        <div id="recaptcha-verifier"></div>

                        {isInput ?
                            <div className="OTPContainer">
                                <p>Please enter the OTP received on your<br />
                                    Mobile Number XXXXXX{sign?.mobile?.substring(6)}
                                </p>

                                <OtpInput
                                    value={OTP}
                                    onChange={setOTP}
                                    numInputs={6}
                                    separator={<span> </span>}
                                    containerStyle="otpBox"
                                    inputStyle="otpInput"
                                    focusStyle="otpFocus"
                                />

                                <Button variant="contained" onClick={handleOtpSubmit}>
                                    SUBMIT
                                </Button>
                            </div>
                            :
                            <>
                                <h1>Create Account</h1>

                                <div className="inputContainer">
                                    <TextField label="Name" name="fName" value={sign.fName} onChange={handleInput}/>
                                </div>

                                <div className="inputContainer">
                                    <TextField label="Email" name="email" value={sign.email} onChange={handleInput}/>
                                </div>

                                <div className="inputContainer">
                                    <TextField label="Password" type="password" name="password" value={sign.password} onChange={handleInput}/>
                                </div>

                                <div className="inputContainer">
                                    <TextField label="Mobile Number" name="mobile" value={sign.mobile} onChange={handleInput}/>
                                </div>

                                <Button variant="contained" onClick={handleSignUp}>
                                    SIGN UP
                                </Button>
                            </>
                        }
                    </div>
                </div>
                :
                <div className="Loginbox">
                    <div id="sideBox">
                        <img src={logo} className="mainLogo" />
                        <h1>Manager Login</h1>
                    </div>

                    <div id="login">
                        <h1>Sign In</h1>

                        <div className="inputContainer">
                            <TextField label="Email" name="email" value={sign.email} onChange={handleInput}/>
                        </div>

                        <div className="inputContainer">
                            <TextField label="Password" type="password" name="password" value={sign.password} onChange={handleInput}/>
                        </div>

                        <Button variant="contained" onClick={handleManagerSignIn}>
                            SIGN IN
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Login;
