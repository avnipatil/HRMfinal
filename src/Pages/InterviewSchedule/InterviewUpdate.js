import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Button from "../../Components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import "./InterviewSchedule.css";
import Topbar from "../../Components/TopBar/Topbar";
import FooterBar from "../../Components/Footer/Footer";
import axios from "axios";
import swal from "sweetalert";
import { INTERVIEW_LIST } from "../../endpoint";
import Loaders from "../../Components/Hrmloader/Loader";
import { useForm } from "react-hook-form";
import Header from "../../Components/Header/Header";
const InterviewUpdate = () => {
  const [Loader, setLoader] = useState(false);
  //creating error state for validation
  //update data variables
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [gender,setGender]=useState('');
  const [resume,setResume]=useState('');
  const [designation,setDesignation]=useState('');
  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  //naviget to next 
  const navigate = useNavigate();
  //useparam for get id
  const { id } = useParams();
  //update data
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${INTERVIEW_LIST}/${id}`, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,},})
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setGender(res.data.gender);
        setResume(res.data.resume);
        setDesignation(res.data.designation);
        setDate(res.data.date);
        setTime(res.data.time);
        reset()
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false);
  }, [id]);
  // useform Logic
  const {reset,formState: { errors },handleSubmit} = useForm();
  const onSubmit = () => {
    const interviewer={
      "name":name,
      "email":email,
      "phone":phone,
      "gender":gender,
      "resume":resume,
      "designation":designation,
      "date":date,
      "time":time
    }
    axios.post(`${INTERVIEW_LIST}/${id}`,interviewer, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,},
      })
      .then((res) => {
        navigate('/interviewTableData');
        if(res.message ==="Candidate Updated Successfully.")
        {
          swal({
            position: "centerd",
            icon: "danger",
            title: "Candidate Updated Successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        reset();
      });
  };
  return (
    <>
      <section className="interviewSchedule">
        <div>
          <Topbar />
          <div className="row Interview_Form">
            <div className="Heading_interview">
              <Header HeadingName="Interview Schedule Form"></Header>
              <div className="card">
                {!Loader ? (
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form mb-0">
                          <label className="d-flex mx-2">Name</label>
                          <input
                            name="name"
                            type="text"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)} 
                            className="form-control"
                            placeholder="Your Name"
                          />
                          <span className="form-error-login">
                            {errors.name && "Please Enter Name."}
                          </span>
                        </div>
                      </Col>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form mb-0">
                          <label className="d-flex mx-2">Email</label>
                          <input
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                          />
                          <span className="form-error-login">
                            {errors.email && "Please Enter Email."}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form">
                          <label className="d-flex mx-2">Number</label>
                          <input
                            name="phone"
                            type="number"
                            defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            className="form-control"
                            placeholder="Your Phone number"
                          />
                           <span className="form-error-login">
                               {errors.phone && "Please Enter Phone Number"}
                           </span>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        md="6"
                        sm="12"
                        className="my-2"
                        style={{ textAlign: "justify" }}
                      >
                        <label className="mx-2">Gender </label>
                        <div className="d-flex mx-2">

                          <input 
                            className="form-control" type="text" defaultValue={gender}
                            onChange={(e) => setGender(e.target.value)} 
                            name="gender"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form mb-0">
                          <label className="d-flex mx-2">Designation</label>
                          <input className="form-control"
                            name="designation"
                            defaultValue={designation}
                            onChange={(e) => setDesignation(e.target.value)} 
                            placeholder="Position Applying For"></input>
                          <span className="form-error-login">
                            {errors.designation && "Please Fill Designation."}
                          </span>
                        </div>
                      </Col>  
                    </Row>
                    <h4 className="text-center">Interview Details</h4>
                    <Row>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form">
                          <label className="d-flex mx-2">Interview Date</label>
                          <input
                            name="date"
                            type="date"
                            defaultValue={date}
                            onChange={(e) => setDate(e.target.value)} 
                            className="form-control"
                            placeholder="Your Interview Date"
                          />
                          <span className="form-error-login">
                            {errors.date && "Please Fill Interview Date."}
                          </span>
                        </div>
                      </Col>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form">
                          <label className="d-flex mx-2">Interview Time</label>
                          <input
                            name="time"
                            type="time"
                            defaultValue={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="form-control"
                            placeholder="Your Interview Time"
                          />
                          <span className="form-error-login">
                            {errors.time && "Please Select Interview Time."}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="6" sm="12" className="my-2">
                        <div className="md-form">
                          <label className="d-flex mx-2">Interviewers CV</label>
                          <input
                            name="resume"
                            type="file"
                            defaultValue={resume}
                            className="form-control"
                            placeholder="Upload Your CV here..."
                            onChange={(e) => setResume(e.target.files[0])}
                          />
                          <span className="form-error-login">
                            {errors.resume && "Please Upload Your CV."}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-center align-items-center my-4">
                      <Button
                        classNames="allbtncss"
                        type="submit"
                        btnName="Submit"
                      ></Button>
                    </div>
                  </Form>
                ) : (
                  <Loaders />
                )}
              </div>
              <FooterBar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InterviewUpdate;
