import React from 'react'
import { EMPLOYEE_API } from '../../endpoint';
import axios from 'axios';
import swal from 'sweetalert';
import { AiOutlineDelete } from 'react-icons/ai'

const EmpDelete = ({ id }) => {
  const user = JSON.parse(localStorage.getItem('token'));
  //delete from ap
  const Delete = () => {
    axios.delete(EMPLOYEE_API + "/" + id, { headers: { "Authorization": `Bearer ${user}` } }).then((res) => {
      if (res.status === 200) {
        console.log(res)
        swal({
          position: 'centerd',
          icon: 'success',
          title: 'Employee deleted Successfully.',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload()
      } else {
        console.log('error')
      }
    })
  }

  return (
    <>
      <span className='action-button btn-delete me-2' onClick={() => Delete()}><AiOutlineDelete /></span>&nbsp;

    </>
  )
}
export default EmpDelete
