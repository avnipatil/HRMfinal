import './Employee.css';
import React, { useState, useEffect } from "react";
import { FaUserEdit } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom';
import Topbar from '../../Components/TopBar/Topbar';
import Footer from '../../Components/Footer/Footer'
import Pagination from "../../Components/Pagination/Pagination";
import { Form } from "react-bootstrap";
import axios from "axios";
import { EMPLOYEE_API } from '../../endpoint'
import EmpDelete from './EmpDelete';
import Header from '../../Components/Header/Header';

const EmployeeList = () => {
  //GET Api Call
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState();

  // GET Api Calling for
  useEffect(() => {
    axios.get(EMPLOYEE_API, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoader(false)
        } else {
          console.log("error")
          setLoader(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Search data filter from table API Data
  const [searchInput, setSearchInput] = useState("");
  const searchItems = data.filter((item) => {
    if (searchInput !== "") {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    } else {
      return item;
    }
  });

  //pagination
  const [postsPerPage, setpostPerPage] = useState(10);
  var dataLimit = postsPerPage;
  var pageLimit = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return searchItems.slice(startIndex, endIndex);
  };
  console.log(searchItems);

  //Department filter
  const [setSearchdep2,setSearchItems2] = useState([]);
  const resdepartment = [...new Set(data.map((item) => item.department))]
  console.log(resdepartment);
  const FilterData = (event) => {
    switch (event) {
      case "All":
        const Alldeptdata = resdepartment;
        setSearchItems2(Alldeptdata)
        return console.log(Alldeptdata);
      case "IT":
        const result = resdepartment.filter(word => word.department === "IT");
        setSearchItems2(result)
        return console.log(result);
      case "Sales":
        const result2 = resdepartment.filter(word => word.department === "Sales");
        setSearchItems2(result2)
        return console.log(result2);
      case "Digital Marketing":
        const result3 = resdepartment.filter(word => word.department === "Digital Marketing");
        setSearchItems2(result3)
        return console.log(result3);
      case "Quality Analyst":
        const result4 = resdepartment.filter(word => word.department === "Quality Analyst");
        setSearchItems2(result4)
        return console.log(result4);
      default:
    }
  }
 
  return (
    <>
      <div style={{ backgroundColor: '#f1f4fb' }}>
        <Topbar />
        <div className='row emplist_top'>
          <Header HeadingName="Employees List"/>
          <div className='col-lg-12 col-md-12 col-sm-12 perform_box mt-4'>
            <div className='row'>
              <div className='col-lg-3 mb-4'>
                <Form.Select
                  className="Table-entry"
                  value={postsPerPage}
                  onChange={(e) => {
                    setpostPerPage(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show Entries {pageSize}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className='col-lg-3 mb-4'></div>
              <div className='col-lg-3 mb-4'>
                <div className="" >
                  <Link to="/addemployee"><Button classNames="allbtncss" btnName="+ Add Employee" /></Link>
                </div>
              </div>
              <div className='col-lg-3 mb-4'>
                <form>
                  <input className='form-control' type='search' placeholder='Search...'
                    onChange={(e) => setSearchInput(e.target.value)} />
                </form>
              </div>
            </div>
      {/*Filters Here  */}
            <div className='row'>
              <div className='col-lg-3 mb-4'>
                <Form.Select onChange={FilterData}>
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Quality Analyst">Quality Analyst</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </Form.Select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table mb-0 text-nowrap table-hover">
                <thead>
                  <tr style={{ textAlign: 'justify' }}>
                    <th className='tab_head' scope="col">Sr.</th>
                    <th className='tab_head' scope="col">Name</th>
                    <th className='tab_head' scope="col">Emp ID</th>
                    <th className='tab_head' scope="col">Department</th>
                    <th className='tab_head' scope="col">Designation</th>
                    <th className='tab_head' scope="col">Company</th>
                    <th className='tab_head' scope="col">Phone Number</th>
                    <th className='tab_head' scope="col">Join Date</th>
                    <th className='tab_head' scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table lenght empty condition loader */}
                  {data.length === 0 ? <div className="loader_table"></div> : ""}
                  {getPaginatedData().map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        {!Loader ?
                          <tr className="border-bottom" style={{ textAlign: 'justify' }} key={i}>
                            <div className="" style={{ padding: '20px' }}>
                              {i + 1}
                            </div>
                            <td>
                              <div className="d-flex" style={{ textAlign: 'justify' }}>
                                <img className='allemp_tabpro mx-2' src={item.profile} alt="tabprofile" />
                                <div className="mx-2 d-block">
                                  <h6 className="mb-0 fs-13 font-weight-semibold">{item.name}</h6>
                                  <div className="clearfix"></div>
                                  <small className="text-muted">{item.email}</small>
                                </div>
                              </div>
                            </td>
                            <td className="text-left fs-13">{item.employeeId}</td>
                            <td className="text-left fs-13"><span className='me-1'></span>{item.department}</td>
                            <td className="text-left fs-13"><span className='me-1'></span>{item.designation}</td>
                            <td className="text-left fs-13"><span className='me-1'></span>{item.company}</td>
                            <td className="text-left fs-13"><span className='me-1'></span>{item.phone}</td>
                            <td className="text-left fs-13"><span className='me-1'></span>{item.joiningDate}</td>
                            <td className="text-end">
                              <Link to={"/update-emp/" + item._id}>
                                <span className="action-button btn-mail me-2"><FaUserEdit /></span>
                              </Link>
                              <EmpDelete id={item._id} />
                              <a href={`mailto:${item.email}`}>
                                <span className="action-button btn-mail me-2">
                                  <AiOutlineMail />
                                </span>
                              </a>
                              <a href={`tel:${item.phone}`}>
                                <span className="action-button btn-call me-2">
                                  <BiPhoneCall />
                                </span>
                              </a>
                            </td>
                          </tr>
                          :
                          <tr key={i}></tr>}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className='row mt-4'>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div
                  className="dataTables_info d-flex"
                  id="DataTables_Table_0_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 1 to {postsPerPage} of {data.length} entries
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="Pagination-div">
                  {data.length > 5 ? (
                    <Pagination
                      setCurrentPage={setCurrentPage}
                      dataLimit={dataLimit}
                      currentPage={currentPage}
                      pageLimit={pageLimit}
                      length={data.length}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default EmployeeList;