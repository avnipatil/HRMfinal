import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { EVENTS } from '../../../../endpoint';
import axios from 'axios';
import swal from 'sweetalert';

const NewEventModal = ({ onSave, onClose, eDate }) => {
    const user = JSON.parse(localStorage.getItem('token'));
    const [error, setError] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        axios.post(EVENTS, data ,{ headers: {"Authorization" : `Bearer ${user}`}}).then(res => {
            onSave()
             if (res.status === 200) {
                swal({
                    position: 'centerd',
                    icon: 'success',
                    title: 'Event Added Successfully.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(
                    window.location.reload()
                )             
                reset();
             } 
             else{
                 setError()
             }
        })
    }

    return (
        <>
            <div id="newEventModal">
                <h4>New Event</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("eTitle", {
                            required: true,
                        })}
                        className={error ? 'error' : ''}
                        id="eventTitleInput"
                        placeholder="Event Title"
                    />
                    <textarea
                        {...register("eDesc", {
                            required: true,
                        })}
                        className={error ? 'error' : ''}
                        id="eventDescriptionInput"
                        placeholder="Event Description"
                    />
                    <label
                        {...register("eDate", {
                            isDisabled: true,
                            value:eDate
                        })}
                    />
                    <div className='actiobButtonsSV'>
                        <button
                            className='btn'
                            type='submit'
                            id="saveButton">Save</button>
                        <button
                            className='btn'
                            onClick={onClose}
                            id="cancelButton">Cancel</button>
                    </div>
                </form>
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
}
export default NewEventModal