import React from 'react'
import "./About.css"
import nikunj from "../../../images/nikunjbha.jpg"
import utkarsh from "../../../images/utkarshraj.jpeg"


const About = () => {
    return(
        <div className="AboutPage">
            <h1 className="aboutHeading">RENT FOR CENTS</h1>
            <fieldset>
                <legend><b>ABOUT</b></legend>
                <p>Rent for Cents provides Bike renting services all over the KOLKATA, WEST BENGAL.
                   We provide well maintained bikes and scooters with the low prices.
                   We are focusing on bringing the best of motorcycling on one platform and make it easily accessible.
                   We have wide variety of Motorbikes in good condition and eassily accessible.
                   Giving one an exhilarating experience of exploring our beautiful country with the thrill and convenience that only a motorcycle can offer.
                </p>
            </fieldset>
            <h2>Who Are We</h2>
            <div className="staffCard1">
                <img src={utkarsh} className="staffImage" />
                <div className="infoBox">
                    <h2>Utkarsh Raj</h2>
                    <h3>0103CS203D16</h3>
                    <h3>utkarshraj102005@gmail.com</h3>
                    <h3>+91 8092789136</h3>
                    <h3>FRONTEND DEVELOPER</h3>
                    <p>Developed the frontend with the help of React.js</p>
                </div>
            </div>
            <div className="staffCard2">
                <div className="infoBox">
                    <h2>Nikunj Bhartia</h2>
                    <h3>0103CS203D04</h3>
                    <h3>nikunjbhartia05@gmail.com</h3>
                    <h3>+91 6290851434</h3>
                    <h3>BACKEND DEVELOPER</h3>
                    <p>Developed the backend with the help of Express.js and MongoDB</p>
                </div>
                <img src={nikunj} className="staffImage" />
            </div>
        </div>
    )
}

export default About;