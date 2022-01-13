import logo from './logo.svg';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import Fade from '@mui/material/Fade';

function TechLogo(props) {
  // Mouseover effect / tooltip for people to investigate/play with logos
  return (
    <img src={"tech-logos/" + props.name + ".png"} height={60} style={{ margin: 15 }} />
  )
}

function submitToAPI(e) {
  e.preventDefault();
  let user_input = Array.from(e.target.parentNode.querySelectorAll("input")).map(e => e.value);
  let desc = e.target.parentNode.querySelector("textarea").value;
  console.log(desc);
  let name = user_input[0];
  let phone = user_input[1];
  let email = user_input[2];

  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if (!Namere.test(name)) {
    alert("Name can not less than 2 char");
    return;
  }
  var mobilere = /[0-9]{10}/;
  if (!mobilere.test(phone)) {
    alert("Please enter valid mobile number");
    return;
  }
  if (email == "") {
    alert("Please enter your email id");
    return;
  }

  var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reeamil.test(email)) {
    alert("Please enter valid email address");
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
    alert("Successfull");
    document.getElementById("contact-form").reset();
  }).catch(function () {
    // show an error message
    alert("UnSuccessfull");
  })

}

function App() {
  return (
    <div className="">
      <Container style={{ width: "100%", maxWidth: "100%", position: "relative" }}>
        <Box sx={{ height: '40vh', backgroundImage: "url(olympic-mountains-with-code.png)", backgroundPosition: "center", backgroundSize: "cover", height: "80vh", }} />
        <div style={{ textAlign: "center", display: "inline-block", color: "black", zIndex: 10, width: "100%", position: "absolute", top: "50%", MsTransform: "translateY(-50%)", transform: "translateY(-50%)", left: 0 }}>
          <div>
            <Fade in={true} timeout={2000}>
              <img src="kitsap-dev-logo.svg" style={{ height: "300px" }} />
            </Fade>
            <Fade in={true} timeout={4000}>
            <h2 style={{ color: "white", fontFamily: "Arial, Helvetica, sans-sarif", fontSize: "25pt" }}>Software solutions for you</h2>
            </Fade>
          </div>
        </div>
      </Container>
      <Container style={{ width: "100%", maxWidth: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Technologies We Love</h2>
          <div>
            <TechLogo name="c_sharp" />
            <TechLogo name="java" />
            <TechLogo name="node" />
            <TechLogo name="racket" />
            <TechLogo name="stripe" />
            <TechLogo name="shopify" />
            <TechLogo name="linux" />
            <TechLogo name="aws" />
            <TechLogo name="iOS" />
            <TechLogo name="android" />
            <TechLogo name="electron" />
            <TechLogo name="react" />
            <TechLogo name="rails" />
            <TechLogo name="rust" />
            <TechLogo name="go" />
            <TechLogo name="php" />
            <TechLogo name="css" />
            <TechLogo name="html" />
            <TechLogo name="postgres" />
            <TechLogo name="mysql" />
            <TechLogo name="c++" />
            <TechLogo name="python" />
            <TechLogo name="ruby" />
            <TechLogo name="javascript" />
          </div>
        </div>
      </Container>
    <Container style={{paddingTop:30, paddingBottom: 50, width:"100%",maxWidth:"100%",backgroundColor: '#DDDDDD' }}>
    <div style={{textAlign:"center", position: "relative",}}>        
    <h2 style={{paddingBottom:20}}>Let Us Help You With Your Project</h2>
    <form id="contact-form" method="post">
    <input type="text" style={{height:35}} placeholder="NAME" className="form-control name" />
    <img src="./icons/name.svg" style={{position: "absolute", top:0, left:0,  width: 10}}/>
    <input type="phone" style={{height:35}} placeholder="PHONE" className="form-control phone" />
    <input type="email" style={{height:35}} placeholder="EMAIL" className="form-control email"/>
    <textarea id="description-input" rows="3" placeholder="WHAT CAN WE DO FOR YOU?" className="form-control description" style={{width:"100%"}}></textarea><br/>
    <input type="submit" onClick={(event) => submitToAPI(event)} id="submit" className="btn btn-lg" value="SEND"/>
    </form>
    </div>
    </Container>
    </div>
  );
}

export default App;
