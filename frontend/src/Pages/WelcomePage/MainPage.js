import React, { useState,useEffect } from 'react'
import bike from "../../images/bike1.jpg";
import logo from "../../images/RentForCentsLogo.png";
import "./MainPage.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FiArrowRight} from "react-icons/fi"
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import {FaFacebookF, FaTimes} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import ReactModal from "react-modal";
import Login from './Login/Login';


const MainPage = ({setIsLog,isLog}) => {
    const [id, setId] = useState("home");
    const [isopen, setisopen] = useState(false);
    const [islogedIn, setIslogedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
    })
    const handleNavBar = (e) => {
        console.log(e.target);
        setId(e.target.name);
        // document.getElementById(e.target.name)?.style.background="rgb(190, 190, 190) !important";
        // document.getElementById(e.target.name)?.style.color="black !important";
    }
    const showSection = () => {
        switch(id){
            case "home":return    <Home/>
            case "about":return   <About/>
            case "contact":return <Contact/>
        }
    }
    const enableLogin = (e) => {
        setisopen(true);
        if(e.target.name==="AdminBtn"){
            setIsLog(false);
        }
        else
            setIsLog(true);
    }
    
    
    return(
        <>
        <ReactModal isOpen={isopen}>
            <FaTimes className="closeicon" onClick={()=> setisopen(false)} />
            <Login setIslogedIn={setIslogedIn} isLog={isLog}/>
        </ReactModal>
        <div className="MainPage">
            <div className="NavBarContainer">
                <div className="NavBarTop">
                    <img src={logo} className="mainLogo" />
                    <div className="NavBarElement">
                        <button id="home" name="home" onClick={handleNavBar}>HOME</button>
                        <button id="about" name="about" onClick={handleNavBar}>ABOUT</button>
                        <button id="contact" name="contact" onClick={handleNavBar}>CONTACT</button>
                        <button name="loginBtn" id="loginBtn" onClick={enableLogin}>LOGIN/REGISTER</button>
                        <button name="AdminBtn" id="loginBtn" onClick={enableLogin}>LOGIN AS MANAGER</button>
                    </div>
                </div>
                <div className="NavBarSide">
                    <h2>NO. 1 BIKE RENTAL<br /> SERVICES IN KOLKATA</h2>
                    <Button variant="outlined">Learn More<FiArrowRight className="arrowRight" /></Button>
                </div>
            </div>
            <div className="MainContent">
                {showSection()}
            </div>
            <div className="Footer">
                <h3>Sector V, Salt Lake, Bidhanagar, Kolkata</h3>
                <h4>utkarshraj102005@gmail.com</h4>
                <h3>+91 8092789136/ +91 6290851434</h3>
                <h3>Booking Timings are from 10:00 AM to 8:00 PM</h3>
                <h2>We Are Social</h2>
                <hr />
                <div className="SocialLink">
                    <FaFacebookF />
                </div>
                <div className="rightReserved">
                    ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
        </>
    )
}

export default MainPage;