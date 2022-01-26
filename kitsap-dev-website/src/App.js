import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import logo from './logo.svg';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Demos from "./Demos";
import {bannerBackgroundColor, h2TagColor, jumbotronContrastingColor} from "./theme"


function TechLogo(props) {
  // Mouseover effect / tooltip for people to investigate/play with logos
  return (
    <img src={"tech-logos/" + props.name + ".png"} height={80} style={{ margin: 15, filter: "grayscale(100%)" }} />
  )
}

function submitToAPI(e, setFeedback, setFeedbackSeverityLevel) {
  e.preventDefault();
  let user_input = Array.from(e.target.parentNode.querySelectorAll("input")).map(e => e.value);
  let desc = e.target.parentNode.querySelector("textarea").value;
  console.log(desc);
  let name = user_input[0];
  let phone = user_input[1];
  let email = user_input[2];

  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if (!Namere.test(name)) {
    setFeedback("Name must be longer than 2 characters.");
    setFeedbackSeverityLevel("error");
    return;
  }
  if (email == "") {
    setFeedback("Please enter your email address.");
    setFeedbackSeverityLevel("error");
    return;
  }

  var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reeamil.test(email)) {
    setFeedback("Please enter a valid email address.");
    setFeedbackSeverityLevel("error");
    return;
  }

  var data = {
    name: name,
    phone: phone,
    email: email,
    desc: desc
  };

  var URL = "https://wpevymgbh7.execute-api.us-west-1.amazonaws.com/prod/contacts";

  fetch(URL, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function () {
    // clear form and show a success message
    setFeedback("Thank you! We got your message. We'll get back to you soon.");
    setFeedbackSeverityLevel("success");
    Array.from(e.target.parentNode.querySelectorAll("input")).map(e => e.value = "");
  }).catch(function (e) {
    console.log(e)
    // show an error message
    setFeedback("Something went wrong. It's not your fault. You can email us at contact@thoughtstem.com.");
    setFeedbackSeverityLevel("error");
  })

}

const FormContainer = styled('div')(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
      width: "80%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "50%",
    },
    [theme.breakpoints.up('lg')]: {
      width: "30%",
    }
  }))

function ContactFormSection(props){
  let [feedback, setFeedback] = useState("")
  let [feedbackSeverityLevel, setFeedbackSeverityLevel] = useState("info")

  return(
  
    <Container style={{paddingTop:30, paddingBottom: 50, width:"100%",maxWidth:"100%",backgroundColor:jumbotronContrastingColor }}>
    <FormContainer id="contact-form" style={{textAlign:"center", fontSize: "0.875em", color: "#000000", margin: "auto" }}>
        <StyledH2 style={{paddingBottom:20, color: h2TagColor}}>Need Help?</StyledH2>
        {feedback=="" ? "": <Alert severity={feedbackSeverityLevel} style={{marginBottom: 20}}>{feedback}</Alert>}
          <Input type="text" style={{height:35, width:"100%"}} placeholder="NAME" className="form-control name" startAdornment={
            <InputAdornment position="start">
              <img src="./icons/name.svg" style={{ width: 20, paddingRight: 3}}/>
            </InputAdornment>
          }/>
          <Box pb={2.5} />
          <Input type="phone" style={{height:35, width:"100%"}} placeholder="PHONE" className="form-control phone" startAdornment={
            <InputAdornment position="start">
              <img src="./icons/phone.svg" style={{ width: 20, padding: 4}}/>
            </InputAdornment>
    }
    />
          <Box pb={2.5} />
          <Input type="email" style={{height:35, width:"100%"}} placeholder="EMAIL" className="form-control email" startAdornment={
            <InputAdornment position="start">
              <img src="./icons/email.svg" style={{ width: 20, padding: 3}}/>
            </InputAdornment>
    }
    />
          <Box pb={2.5} />
          <TextField multiline id="description-input" variant="standard" placeholder="WHAT CAN WE DO FOR YOU?" className="form-control description" style={{width:"100%"}} InputProps={{startAdornment: (
            <InputAdornment position="start">
              <img src="./icons/description.svg" style={{width: 20, padding: 3}}/>
            </InputAdornment>
          )}}
    />
          <Button type="submit" onClick={(event) => submitToAPI(event, setFeedback, setFeedbackSeverityLevel)} id="submit" className="btn btn-lg" variant="outline" style={{width:"100%"}}>SEND</Button>
      </FormContainer>
    </Container>
)
}

function TechnologiesSection(props) {

  return(
      <Container style={{ width: "100%", maxWidth: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{color: h2TagColor}}>Technologies We Love</h2>
          <div>
    {/* <TechLogo name="node" />
            <TechLogo name="stripe" />
            <TechLogo name="shopify" />
            <TechLogo name="aws" />
            <TechLogo name="iOS" />
            <TechLogo name="android" />
            <TechLogo name="rails" />
            <TechLogo name="go" />
            <TechLogo name="php" />
            <TechLogo name="mysql" /> */}
            <TechLogo name="c++" />
            <TechLogo name="c_sharp" />
            <TechLogo name="rust" />
            <TechLogo name="postgres" />
            <TechLogo name="racket" />
            <TechLogo name="css" />
            <TechLogo name="html" />
            <TechLogo name="java" />
            <TechLogo name="linux" />
            <TechLogo name="electron" />
            <TechLogo name="react" />
            <TechLogo name="python" />
            <TechLogo name="ruby" />
            <TechLogo name="javascript" />
          </div>
        </div>
      </Container>
  
  )
}

const StyledH2 = styled('h2')(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 25,
    }
  }))

function Homepage() {
  
  return (
    <div className="">
      <Container style={{ width: "100%", maxWidth: "100%", position: "relative" }}>
        <Box sx={{ height: '40vh', backgroundColor:bannerBackgroundColor, backgroundPosition: "center", backgroundSize: "cover", height: "80vh", minHeight: "500px" }} />
        <div style={{ textAlign: "center", display: "inline-block", color: "black", zIndex: 10, width: "100%", position: "absolute", top: "50%", MsTransform: "translateY(-50%)", transform: "translateY(-50%)", left: 0 }}>
          <div>
            <Fade in={true} timeout={2000}>
              <img src="kitsap-dev-logo.svg" style={{ width:"80%", maxWidth:"500px" }} />
            </Fade>
            <Fade in={true} timeout={4000}>
            <StyledH2 style={{ color: "white", fontFamily: "Arial, Helvetica, sans-sarif"}}>Software solutions for you</StyledH2>
            </Fade>
          </div>
        </div>
      </Container>
    <ContactFormSection/>
    </div>
  );
}

function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="demos" element={<Demos />}/>
    </Routes>
  </BrowserRouter>
  )

}

export default App;
