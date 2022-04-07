import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { MdContactPage, MdEvent } from 'react-icons/md'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { AiOutlineMail, AiFillSetting } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import DoughnutChart from './Doughnut'
import LineChart from './LineChart'
import Topbar from '../../Components/TopBar/Topbar'
import FooterBar from '../../Components/Footer/Footer'
import { DASH_COUNT , EVENTS , EMPLOYEE_API , INTERVIEW_LIST} from '../../endpoint'
import axios from 'axios'
import moment from 'moment'
import Header from '../../Components/Header/Header'
const Dashboard = () => {

  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [interview, setinterview] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [Loder, setLoader] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'));
    axios.get(DASH_COUNT, { headers: { "Authorization": `Bearer ${user}` } }).then(res => {
      setTotalData(res.data);
    })
    setLoader(true)
    try {
      axios.get(EVENTS, { headers: { "Authorization": `Bearer ${user}` } }).then(res => {
        setEvents(res.data);
        setLoader(false)
      })
    } catch (error) {
      console.warn(error)
      setLoader(true)
    }
    axios.get(EMPLOYEE_API, { headers: { Authorization: `Bearer ${user}` } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(INTERVIEW_LIST, { headers: { Authorization: `Bearer ${user}` } })
      .then((res) => {
        setinterview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const dayString = `${month}/${day}/${year}`;
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }
  events.sort(GetSortOrder("eventDate"));
  // console.log("Sorted Events : ");
  for (var item in events) {
  console.log(events[item].eventDate);
  }
  const eventData = events.map((d, index2) => {
    return dayString <= d.eventDate ?
      <tr className="d-table-row justify-content-center align-items-center align-content-center " key={index2}>
        <td>
          <div className={index2 % 2 === 0 ? "blockText1" : "blockText2"} >
            {moment(d.eventDate).format('DD')}
            <br />
            {moment(d.eventDate).format('MMM')}
          </div>
        </td>
        <td className="text-left">
          <div><h6 className='mb-0'>{d.eventTitle}</h6></div>
          <div style={{ fontSize: "13px" }}>{d.eventDesc}</div>
        </td>
      </tr>
      :
      <tr key={index2}></tr>
  })

  const eventDataSkeleton = [0, 1, 2, 3].map(() => {
    return (
      <div className="Skeleton-Dash " key={Math.random()}>
        <div className='Sk1'>

        </div>
        <div className="text-left">
        </div>
      </div>
    )
  })

  return (
    <div className='dashboard'>
      <div className='sidebar-text-content'>
        <Topbar />
        <div className='Page-Content'>
          {/* <div className='dashboard-header text-center'>HR <span className='text-muted'>Dashboard</span></div> */}
          <Header HeadingName="HR"  MutedHeadName="  Dashboard"/>
          <div className='row'>
            <div className='col-lg-9'>
              <div className='Total-cards'>
                <div className='row'>
                  <div className='col-lg-4 col-md-6'>
                    <div className='card'>
                      <div className='row d-flex justify-content-center align-items-center'>
                        <div className='col-lg-8'>
                          <h6 className="mb-0">Total Employees</h6>
                          <h2>{totalData.employee}</h2>
                          <span className='text-muted'>
                            <BsFillArrowUpRightCircleFill className='me-2' style={{ color: '#0dcd94' }} />
                            <span className='me-2' style={{ color: '#0dcd94' }}>{totalData.employee}</span>
                            for last month
                          </span>
                        </div>
                        <div className='col-lg-4'><span style={{ fontSize: '60px', color: '#0dcd94' }}><MdContactPage /></span></div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-6'>
                    <div className='card'>
                      <div className='row d-flex justify-content-center align-items-center'>
                        <div className='col-lg-8'>
                          <h6 className="mb-0">Total Job Applications</h6>
                          <h2>{totalData.candidate}</h2>
                          <span className='text-muted'>
                            <BsFillArrowUpRightCircleFill className='me-2' style={{ color: '#36f' }} />
                            <span className='me-2' style={{ color: '#36f' }}>{totalData.candidate}</span>
                            for last month
                          </span>
                        </div>
                        <div className='col-lg-4'><span style={{ fontSize: '60px', color: '#36f' }}><AiFillSetting /></span></div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-6'>
                    <div className='card'>
                      <div className='row d-flex justify-content-center align-items-center'>
                        <div className='col-lg-8'>
                          <h6 className="mb-0">Total Events</h6>
                          <h2>{totalData.events}</h2>
                          <span className='text-muted'>
                            <BsFillArrowUpRightCircleFill className='me-2' style={{ color: '#fe7f00' }} />
                            <span className='me-2' style={{ color: '#fe7f00' }}>{totalData.events}</span>
                            for last month
                          </span>
                        </div>
                        <div className='col-lg-4'><span style={{ fontSize: '60px', color: '#fe7f00' }}><MdEvent /></span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-2'>
                  {/* */}
                  <div className='col-lg-12'>
                    <div className='card'>
                      <h6>Number of Hirings</h6>
                      <div>
                        <LineChart></LineChart>
                        {/* <LineChart /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='col-lg-3'>
              <div className='events'>
                <div className='card Upcoming-table-dash'>
                  <h6>Events In This Month</h6>
                  <div className="table-responsive recent_jobs pt-2 pb-2 pl-2 pr-2" style={{ height: "290px" }}>
                    <table className="table mb-0 text-nowrap ">
                      <tbody>
                        {!Loder ? eventData : eventDataSkeleton}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="Gender-chart">
                <div className='card mt-3 '>
                  <h6 className="mb-0">Gender By Employees</h6>
                  <div>
                    <DoughnutChart />
                    <div className='overlayChart'>
                      Total Employees<br />{data.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-2'>
            <div className='col-lg-6 Recently-joined'>
              <div className="card">
                <h6 className='mb-1'>Recently Joined Employees</h6>
                <div className="table-responsive recent_jobs pt-2 pb-2 pl-2 pr-2" style={{ height: "420px" }}>
                  <table className="table mb-0 text-nowrap">
                    <tbody>
                      <tr className="border-bottom d-table-row gray-color">
                        <td>
                        <th className="text-left">Name</th>
                        <th className="text-left">Joining Date</th>
                        <th className="text-left">Department</th>
                        <th className="text-center">Actions</th>
                        </td>
                      </tr>
                      {/* //////////////////// */}
                      {data.slice(0, 5).map((d, i) => (
                        <tr className="border-bottom d-table-row justify-content-center align-items-center align-content-center" key={i}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={d.profile} alt="img" className="avatar avatar-md brround me-3" />
                              <div className="mr-3 mt-0 mt-sm-1 d-block">
                                <h6 className="mb-0 text-left">{d.name}</h6>
                                <small className="text-muted">{d.designation}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-left fs-13">{d.joiningDate}</td>
                          <td className="text-left fs-13">{d.department}</td>
                          <td className="text-end">
                            <a href={`mailto:${d.email}`}>
                              <span className='action-button btn-mail me-2'><AiOutlineMail /></span>
                            </a>
                            <a href={`tel:${d.phone}`}>
                              <span className='action-button btn-call me-2'><BiPhoneCall /></span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
            <div className='col-lg-6 Gender-chart Rec-Jobs'>
              <div className='card'>
                <h6 className='mb-1'>Interview List</h6>

                <div className="table-responsive recent_jobs pt-2 pb-2 pl-2 pr-2" style={{ height: "420px" }}>
                  <table className="table mb-0 text-nowrap">
                    <tbody>
                      <tr className='gray-color border-bottom d-table-row'>
                        <th className="text-left">Name</th>
                        <th className="text-left">Interview Date</th>
                        <th className='text-left'>Time</th>
                        <th className="text-center">Actions</th>
                      </tr>
                      {/* //////////////////// */}
                      {interview.length === 0 ? <tr>No data found</tr> : interview.slice(0, 5).map((d, ind) => (
                        <tr className="border-bottom d-table-row justify-content-center align-items-center align-content-center" key={ind}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="mr-3 mt-0 mt-sm-1 d-block">
                                <h6 className="mb-0">{d.name}</h6>
                                <small className="text-muted">{d.designation}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-left fs-13">{d.interviewDate}</td>
                          <td className="text-left fs-13">{d.interviewTime}</td>
                          <td className="text-end">
                            <a href={`mailto:${d.email}`}>
                              <span className='action-button btn-mail me-2'><AiOutlineMail /></span>
                            </a>
                            <a href={`tel:${d.phone}`}>
                              <span className='action-button btn-call me-2'><BiPhoneCall /></span>
                            </a>
                          </td>
                        </tr>
                      ))}
                      {/* //////////////////// */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <FooterBar />
        </div>
      </div>
    </div>
  )
}
export default Dashboard