import React,{useState} from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import Button from '../../Components/Button/Button';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom"
import { LOGIN } from '../../endpoint';
function Login() {
  const navigate = useNavigate()
  const [items,setItems]=useState();
  const [msgusername,setMsgusername]=useState('');
  const { register, handleSubmit ,reset, formState:{errors}} = useForm(); 
  const onSubmit = (data)=> {
    console.log(data);
    localStorage.setItem('username',JSON.stringify(data.username));
    axios.post(LOGIN,data)
    .then(res => {
      setItems(res.data);
      setMsgusername(res.data.message);
      localStorage.setItem('token',JSON.stringify(res.data.token));
      console.log(items);
      if(res.data.username === "itsswapnil" || res.data.password === "itsswapnil"){    
      }        
      else if(res.status === 200)
      {
           swal({
            position: 'centerd',
            icon: 'success',
            title: 'Your Login Succesful...',
            showConfirmButton: false,
            timer: 2000
        }).then(
          navigate('/dashboard')  
        )
      }
     reset();
    })     
  }
  return (
       <>
          <section className='Login-Form-HRM'>
              <div className='container login-form-cont'>
                      <div className='row'>
                              <div className='col-lg-12 col-md-12 col-sm-12 Login-form-col'>
                                  <div className='Login_Title'>
                                    <h2 className='d-flex justify-content-center align-items-center my-2'>Login</h2>
                                  </div>
                                <div className='Login-form'>
                                    <form className="Login-form-inpute" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='backcolor-error mb-4' style={{ backgroundColor: msgusername ? "#00009c" : "transparent" }}>
                                            <span className=''>{msgusername}</span>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className='form-icon'>
                                              <i className='fa fa-user'></i>
                                            </div>
                                            <div className="form-group">
                                              <input type="text" name="username" className="form-control form-in" {...register("username", { required: true })} placeholder="Enter email"/>
                                              <span className='form-error-login'>
                                                {errors.username && "Please Enter Username."}
                                              </span>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className='form-icon'>
                                              <i className='fa fa-lock'></i>
                                            </div>
                                            <div className="form-group">
                                              <input type="password" name="password" className="form-control form-in" {...register("password", { required: true})}  placeholder="Password"/>
                                              <span className='form-error-login'>
                                                  {errors.password && "Please Enter Password."}
                                              </span>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className='form-icon_login sign-in-icon'>
                                                  <i className='fa fa-arrow-circle-right'></i>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center w-100'>
                                                 <Button classNames='Login-btn1' btnName="Login" type="submit"></Button>
                                            </div>                                        
                                        </div>
                                    </form>
                                </div>
                          </div>
                        </div>
              </div>
          </section>
       </>  
    )
}

export default Login