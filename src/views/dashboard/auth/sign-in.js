import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
import '../../../assets/scss/dark/pages/auth/_authentication.scss'
import '../../../assets/scss/pages/pagescustom.scss'

// img
import logo from '../../../assets/images/icons/logo.png'
import emaillogo from '../../../assets/images/icons/email.svg'
import key from '../../../assets/images/icons/key.svg'
import openeye from '../../../assets/images/icons/openeye.svg'
import closeeye from '../../../assets/images/icons/hideeye.svg'

// api path
import Apipath from '../../../config/apipath'
import axios from 'axios';
const SignIn = () => {
   const history = useNavigate()
   const [errorMsgText, setErrorMsgText] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [eye, setEye] = useState('');
   useEffect(() => {
      setEye(openeye)
   }, []);
   function login() {
      try {
         let validate = validation();

         if (validate) {
            document.getElementById("login_btn").style.display = "none"
            document.getElementById("loder_btn").style.display = "block"
            let postData = {
               "email": document.getElementById('email').value,
               "password": document.getElementById('password').value
            }
            axios({
               method: "post",
               url: Apipath['Login'],
               headers: {
                  // 'Authorization': `bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               data: postData,
            })
               .then(function (response) {
                  document.getElementById("login_btn").style.display = "block"
                  document.getElementById("loder_btn").style.display = "none"
                  if (response.data.error_code == '9999') {
                     if (response.data.data[0].role == 2) {
                        sessionStorage.setItem("admin_detatils", JSON.stringify(response.data.data));
                        history('/order')
                     }
                  }
                  else if (response.data.error_code == '9998') {
                     if (response.data.message == 'Email Incorrect') {
                        document.getElementById("email").focus();
                        setErrorMsgText(response.data.message);

                     }
                     else {
                        document.getElementById("password").focus();
                        setErrorMsgText(response.data.message);

                     }

                  }
                  else {

                  }
               })
               .catch(function (error) {
                  // handle error
                  console.log(error);
               })

         }

      } catch (error) {
         console.log("error", error);
      }
   }
   function validation() {
      try {

         let checkEmailvalidate = checkEmail();
         if (document.getElementById("email").value == '') {

            document.getElementById("email").focus();
            setErrorMsgText("Please enter email field");
            return false;
         }
         else if (checkEmailvalidate) {
            document.getElementById("email").focus();
            setErrorMsgText("Please enter valid email");
            return false;
         }
         else if (document.getElementById("password").value == '') {
            document.getElementById("password").focus();
            setErrorMsgText("Please enter password field");
            return false;
         }
         else {
            return true;
         }
      } catch (error) {
         console.log("error", error);
      }
   }
   function checkEmail() {
      try {
         var email = document.getElementById('email').value;
         var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (filter.test(email)) {
            return false;
         }
         else {
            return true;
         }
      } catch (error) {
         console.log("error", error);
      }
   }
   function passwordView() {
      try {
         if (document.getElementById('password').type == 'password') {
            setEye(closeeye);
            document.getElementById('password').type = 'text';
         }
         else {
            setEye(openeye);
            document.getElementById('password').type = 'password';
         }

      } catch (error) {
         console.log("error", error);
      }
   }
   function passwordOnChange(value) {
      try {
         setPassword(value);
         setErrorMsgText('')
      } catch (error) {
         console.log("error", error);
      }
   }
   function passwordOnEmail(value) {
      try {
         setEmail(value);
         setErrorMsgText('')
      } catch (error) {
         console.log("error", error);
      }

   }
   return (
      <>
         <div className="login-content bgimage">
            <div className='vh-100  d-flex justify-content-end align-items-center'>

               <div className="card card_div text-align-center me-4" style={{ width: "425px" }}>
                  <div className="card-body mt-3 text-align-center mx-auto">
                     <div className='d-flex justify-content-center'>
                        <img src={logo} className='lodinlogo'></img>
                     </div>
                     <div className='w-100 text-center'>
                        <div className='mt-4 align-items-center input_div'>
                           <img src={emaillogo} className='inputlogsignin'></img>
                           <input type='text' placeholder='example@gmail.com' className='input_box'
                              id='email' value={email} onChange={(e) => passwordOnEmail(e.target.value)} />
                        </div>
                        <div className='mt-4 align-items-center input_div'>
                           <img src={key} className='inputlogsignin'></img>
                           <input type='password' placeholder='example@gmail.com' className='input_box'
                              id='password' value={password} onChange={(e) => passwordOnChange(e.target.value)}
                           />
                           <img src={eye} className='inputlogsignin' onClick={() => passwordView()}></img>
                        </div>
                        <div className='d-flex justify-content-center'>
                           {
                              errorMsgText != "" && <div className='errormsg'>
                                 {errorMsgText}
                              </div>
                           }

                        </div>
                        <div className='w-100 d-flex justify-content-center'>
                           <button className='loginbtn mt-5' id='login_btn' onClick={() => login()}>Login</button>
                           <button className='loginbtn mt-5' id='loder_btn' style={{ display: "none" }}>
                              <div class="spinner-border text-primary" role="status">
                                 <span class="sr-only">Loading...</span>
                              </div>
                           </button>
                        </div>
                     </div>



                  </div>
               </div>

            </div>



            {/* <Row className="m-0 align-items-center bg-white vh-100 justify-content-end">
                 <div>

                 </div>
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>
                              <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">
                                 <svg width="30" className="text-primary" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                    <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                    <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                    <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                                 </svg>
                                 <h4 className="logo-title ms-3">Hope UI</h4>
                              </Link>
                              <h2 className="mb-2 text-center">Sign In</h2>
                              <p className="text-center">Login to stay connected.</p>
                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="email" className="" id="email" aria-describedby="email" placeholder=" " />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={() => history.push('/dashboard')} type="button" variant="btn btn-primary">Sign In</Button>
                                 </div>
                                 <p className="text-center my-3">or sign in with other accounts?</p>
                                 <div className="d-flex justify-content-center">
                                    <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={facebook} alt="fb" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={google} alt="gm" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={instagram} alt="im" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={linkedin} alt="li" /></Link>
                                       </ListGroup.Item>
                                    </ListGroup>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Don’t have an account? <Link to="/auth/sign-up" className="text-underline">Click here to sign up.</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <div className="sign-bg">
                     <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.05">
                           <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                           <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                           <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                           <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                        </g>
                     </svg>
                  </div>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row> */}
         </div >
      </>
   )
}

export default SignIn
