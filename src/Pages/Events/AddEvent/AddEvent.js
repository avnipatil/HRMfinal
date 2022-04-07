import React, {useState, useEffect } from 'react'
import './AddEvent.css'
import Topbar from '../../../Components/TopBar/Topbar';
import FooterBar from '../../../Components/Footer/Footer';
import Calendar from './CalenderMain/Calendar';
import { EVENTS } from '../../../endpoint';
import axios from 'axios';
import moment from 'moment';
import Header from '../../../Components/Header/Header';
const Events = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('token'));
        axios.get(EVENTS, { headers: { "Authorization": `Bearer ${user}` } }).then(res => {
            setEvents(res.data);
        })

    }, [])

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const dayString = `${month}/${day}/${year}`;
    const DateType = moment(dayString).format('MMM')
    return (
        <>
            <div className='sidebar-text-content'>
                <Topbar />
                <div className='Page-Content Events-text-content'>
                    <Header HeadingName="Add Event"/>
                    <div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='events'>
                                    <div className='card Upcoming-event-new'>
                                        <h6 className='mb-0'>Events In This Month</h6>
                                        <div className="table-responsive recent_jobs pt-2 pb-2 pl-2 pr-2">
                                            <table className="table mb-0 text-nowrap ">
                                                <tbody>
                                                    {events.map((d, index) => {
                                                        return DateType === moment(d.eventDate).format('MMM') ?
                                                            <tr className="d-table-row justify-content-center align-items-center align-content-center" key={index}>
                                                                <td>
                                                                    <div className={index % 2 === 0 ? "blockText1" : "blockText2"}>
                                                                        {moment(d.eventDate).format('DD MMMM')}
                                                                    </div>
                                                                </td>
                                                                <td className="text-left">
                                                                    <div><h6 className='mb-0'>{d.eventTitle}</h6></div>
                                                                    <div style={{ fontSize: "13px" }}>{d.eventDesc}</div>
                                                                </td>
                                                            </tr>
                                                            :
                                                            <div></div>
                                                    }
                                                    )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <div className='cal-style'>
                                    <div className='card'>
                                        <Calendar ></Calendar>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <FooterBar />
            </div>
        </>
    )
}
export default Events
