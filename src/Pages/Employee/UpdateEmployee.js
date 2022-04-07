import './Employee.css'
import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import Topbar from '../../Components/TopBar/Topbar';
import Footer from '../../Components/Footer/Footer'
import Button from '../../Components/Button/Button';
import { useForm } from "react-hook-form";
import { EMPLOYEE_API } from '../../endpoint';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loaders from '../../Components/Hrmloader/Loader';
import Header from '../../Components/Header/Header';
import swal from 'sweetalert';

const UpdateEmployee = () => {
    const { id } = useParams();
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
//For Update variable set
    const [setempid, setEmpid] = useState('');
    const [setname, setName] = useState('');
    const [setemail, setEmail] = useState('');
    const [setphone, setPhone] = useState('');
    const [setdesignation, setDesignation] = useState('');
    const [setcompany, setCompany] = useState('');
    const [setdepartment, setDepartment] = useState('');
    const [setjoindate, setJoindate] = useState('');
    const [setprofile, setProfile] = useState('');
    const [setgender, setGender] = useState('');


    //Get API Call
    useEffect(() => {
        axios.get(EMPLOYEE_API + "/" + id, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    setLoader(false);
                    setEmpid(res.data.employeeId)
                    setName(res.data.name)
                    setEmail(res.data.email)
                    setPhone(res.data.phone)
                    setDesignation(res.data.designation)
                    setCompany(res.data.company)
                    setDepartment(res.data.department)
                    setJoindate(res.data.joiningDate)
                    setProfile(res.data.profile)
                    setGender(res.data.gender)
                    reset()
                } else {
                    console.log("error")
                    setLoader(true);
                }
            })
    }, [id])

    // Update API Call
    const { handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
    const onSubmit = () => {
        const user = {
            employeeId: setempid,
            name: setname,
            email: setemail,
            phone: setphone,
            designation: setdesignation,
            company: setcompany,
            department: setdepartment,
            joiningDate: setjoindate,
            profile: setprofile,
            gender: setgender
        }
        console.log(user);
        axios.post(EMPLOYEE_API + "/" + id, user, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if(res.data.message === 'Employee Updated Successfully'){ 
                    swal({
                        position: 'centerd',
                        icon: 'success',
                        title: 'Employee Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })  
                 navigate('/allemployee')
                }
                else{
                    swal({
                        position: 'centerd',
                        icon: 'danger',
                        title: 'Sorry Employee is Not Updated ',
                        showConfirmButton: false,
                        timer: 1500
                    }) 
                }         
                reset();
            }).catch(error => alert(error.message))
    }

    return (
        <>
            <div style={{ backgroundColor: '#f1f4fb' }}>
                <Topbar />
                <div className='emplist_top'>
                    <Header HeadingName="Update Employee Details" />
                    <div className='empadd_card'>
                        <Row>
                            <Col className="perform_box">
                                {!Loader ?
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setempid}
                                                    onChange={(e) => setEmpid(e.target.value)}
                                                    type="text"
                                                    placeholder="employeeId"
                                                />
                                                <div className='errortxt'>
                                                    {errors.empId && "Please Enter EmpID is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setname}
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text"
                                                    placeholder="name "
                                                />
                                                <div className='errortxt'>
                                                    {errors.name && "Please Enter Name is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setemail}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    placeholder="email"
                                                />
                                                <div className='errortxt'>
                                                    {errors.email && "Please Enter Email is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setphone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    type="number"
                                                    placeholder="phone "
                                                />
                                                <div className='errortxt'>
                                                    {errors.phone && "Please Enter Phone is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setdesignation}
                                                    onChange={(e) => setDesignation(e.target.value)}
                                                    type="text"
                                                    placeholder="designation"
                                                />
                                                <div className='errortxt'>
                                                    {errors.designation && "Please Enter Designation is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setcompany}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    type="text"
                                                    placeholder="company "
                                                />
                                                <div className='errortxt'>
                                                    {errors.company && "Please Enter Company is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setdepartment}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                    type="text"
                                                    placeholder="department"
                                                />
                                                <div className='errortxt'>
                                                    {errors.department && "Please Enter Department is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    defaultValue={setjoindate}
                                                    onChange={(e) => setJoindate(e.target.value)}
                                                    type="date"
                                                    placeholder="joiningDate"
                                                />
                                                <div className='errortxt'>
                                                    {errors.joiningDate && "Please Enter joiningDate is Reuired"}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <input type="file" name='profile'
                                                defaultValue={setprofile}
                                                onChange={(e) => setProfile(e.target.files[0])}
                                                className="form-control" placeholder="Upload Your CV here..."
                                            />
                                            <span className='errortxt'>
                                                {errors.profile && "Please Upload Your CV."}
                                            </span>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <div className="mt-4" style={{ textAlign: 'justify' }}>
                                                <label className='mx-2'>Select Gender </label>
                                                <div className='d-flex mx-2'>
                                                    <input className='mt-2'
                                                        defaultValue={setgender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        type="radio" />
                                                    <label className='mx-2'>Male</label>
                                                    <input className='mt-2'
                                                        defaultValue={setgender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        type="radio" />
                                                    <label className='mx-2'>Female</label>
                                                </div>
                                                <span className='errortxt my-4'>
                                                    {errors.gender && "Please Select Gender."}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button classNames="allbtncss" type="submit" btnName="Submit" />
                                </Form>
                                  :
                                    <Loaders />
                                } 
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default UpdateEmployee;









