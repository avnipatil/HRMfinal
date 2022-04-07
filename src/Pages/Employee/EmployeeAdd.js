import './Employee.css'
import React, { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import Topbar from '../../Components/TopBar/Topbar';
import Footer from '../../Components/Footer/Footer'
import Button from '../../Components/Button/Button';
import { useForm } from "react-hook-form";
import { EMPLOYEE_API } from '../../endpoint';
import { useNavigate } from "react-router-dom";
import Header from '../../Components/Header/Header';
import swal from 'sweetalert';
import axios from 'axios';

const EmployeeAdd = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState();
    const handleChange = (event) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0])
    }
    const onSubmit = data => {
        const formData = new FormData();
        formData.append("empId", data.empId);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("designation", data.designation);
        formData.append("company", data.company);
        formData.append("department", data.department);
        formData.append("joiningDate", data.joiningDate);
        formData.append("gender", data.gender);
        formData.append("profile", selectedFile);
        formData.append("status", data.status);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ':' + pair[1]);
        }
        axios.post(EMPLOYEE_API, formData, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                if (res.status === 200) {
                    navigate('/allemployee');
                    swal({
                        position: 'centerd',
                        icon: 'success',
                        title: 'Employee Added Successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    swal({
                        position: 'centerd',
                        icon: 'danger',
                        title: 'Employee is Not Added.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                reset();
            })
        reset();
    }
    return (
        <>
            <div style={{ backgroundColor: '#f1f4fb' }}>
                <Topbar />
                <div className='emplist_top'>
                 <Header HeadingName="Employees Add"/>
                    <div className='empadd_card'>
                        <Row>
                            <Col className="perform_box">
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Employee Id"
                                                    {...register("empId", { required: true, maxLength: 10 })} />
                                                <div className='form-error-login'>
                                                    {errors.empId && "Please Enter EmpId."}
                                                    {errors.empId === "maxLength" && (
                                                        <p >EmpId cannot exceed 10 characters</p>
                                                    )}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name "
                                                    {...register("name", { required: true, maxLength: 50 })} />
                                                <div className='form-error-login'>
                                                    {errors.name && "Please Enter Name."}
                                                    {errors.name === "maxLength" && (
                                                        <p>Name cannot exceed 50 characters</p>
                                                    )}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <div className="md-form mb-0">
                                                <input {...register("email", { required: true, maxLength: 30, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" } })} type="email" className="form-control" placeholder='Your Email' />
                                                <span className='form-error-login'>
                                                    {errors.email && "Please Enter Email its required"}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Phone "
                                                    {...register("phone", { required: true, maxLength: 10, pattern: [0 - 9] })} />
                                                <div className='form-error-login'>
                                                    {errors.phone && "Please Enter Phone."}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <select className="form-control" {...register("designation", { required: true })}>
                                                <option name="designation" value="">Select Designation </option>
                                                <option name="designation" value="Software Developer" >Software Developer</option>
                                                <option name="designation" value="Digital Marketing Director">Digital Marketing Director</option>
                                                <option name="designation" value="Graphics Designer">Graphics Designer</option>
                                                <option name="designation" value="Content Writer">Content Writer</option>
                                                <option name="designation" value="Lead Generation Executive">Lead Generation Executive</option>
                                                <option name="designation" value="Demand Generation Executive">Demand Generation Executive</option>
                                                <option name="designation" value="Sales Executive">Sales Executive</option>
                                                <option name="designation" value="FullStack Developer">FullStack Developer</option>
                                                <option name="designation" value="Email Marketing Executive">Email Marketing Executive</option>
                                                <option name="designation" value="Digital Marketing Executive">Digital Marketing Executive</option>
                                                <option name="designation" value="HR">HR</option>
                                            </select>
                                            <span className='form-error-login'>
                                                {errors.designation && "Please Fill Designation."}
                                            </span>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="company"
                                                    {...register("company", { required: true, maxLength: 50 })} />
                                                <div className='form-error-login'>
                                                    {errors.company && "Please Enter company."}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <select className="form-control"  {...register("department", { required: true })}>
                                                <option value="">Select Department</option>
                                                <option value="IT" >IT</option>
                                                <option value="Digital Marketing">Digital Marketing</option>
                                                <option value="Quality Analyst">Quality Analyst</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Operations">Operations</option>
                                            </select>
                                            <span className='form-error-login'>
                                                {errors.department && "Please Fill Department."}
                                            </span>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="date"
                                                    {...register("joiningDate", { required: true })} />
                                                <div className='form-error-login'>
                                                    {errors.joiningDate && "Please Select JoiningDate."}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <label className='d-flex mx-2'>Profile Photo</label>
                                            <input name='profile' type="file" {...register("profile", { required: true })} className="form-control" placeholder="Upload Your CV here..." onChange={handleChange}
                                            />
                                            <div className='form-error-login'>
                                                {errors.profile && "Please Select Profile."}
                                            </div>
                                        </Col>
                                        <Col lg="6" md="6" sm="12" className="my-2">
                                            <div className="mt-4" style={{ textAlign: 'justify' }}>
                                                <label className='mx-2'>Select Gender </label>
                                                <div className='d-flex mx-2'>
                                                    <input className='mt-2' {...register("gender", { required: true })} type="radio" value="male" name="gender" />
                                                    <label className='mx-2'>Male</label>
                                                    <input className='mt-2' {...register("gender", { required: true })} type="radio" value="female" name="gender" />
                                                    <label className='mx-2'>Female</label>
                                                </div>
                                                <div className='form-error-login'>
                                                    {errors.gender && "Please Select Gender."}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button classNames="allbtncss" type="submit" btnName="Submit" />
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default EmployeeAdd;









