import React from 'react'
import { EVENTS } from '../../../../endpoint';
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios';
import './CalendarStyle.css'
import swal from 'sweetalert';

const DeleteEventModal = ({ id }) => {
  const user = JSON.parse(localStorage.getItem('token'));
  //delete from ap
  const Delete = () => {
    axios.delete(EVENTS + "/" + id, { headers: { "Authorization": `Bearer ${user}` } }).then((res) => {
      if (res.status === 200) {
        swal({
          position: 'centerd',
          icon: 'success',
          title: 'Event deleted Successfully.',
          showConfirmButton: false,
          timer: 1500
        }).then(window.location.reload())
      } else {
        console.log('error')
      }
    })
  }
  return (
    <>
      <button className='btn btn-outline-danger position-relative btn-sm' onClick={() => Delete()}><AiOutlineDelete /></button>&nbsp;
    </>
  )
}
export default DeleteEventModal
