import React, { useState, useEffect } from "react";
import "./InterviewTableData.css";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import user from "../../assets/images/Interviewer_IMG/user.png";
import { Link, useNavigate } from "react-router-dom";
import FooterBar from "../../Components/Footer/Footer";
import Topbar from "../../Components/TopBar/Topbar";
import { Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Button from "../../Components/Button/Button";
import Pagination from "../../Components/Pagination/Pagination";
import { INTERVIEW_LIST } from "../../endpoint";
import Header from "../../Components/Header/Header";
const InterviewTableData = () => {
  const navigate = useNavigate();
  //Api Calling for
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [Loader,setLoader] =useState();
  useEffect(() => {
    setLoader(true);
    axios
      .get(INTERVIEW_LIST, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setData(res.data);   
      })
      .catch((err) => {
        console.log(err);
      });
      setLoader(false);
  }, []);
  //delete data
  const onDelete = (_id) => {
    axios
      .delete(`${INTERVIEW_LIST}/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Record Deleted Successfully") {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              navigate("/interviewtabledata");
              swal("Record has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        }
      });
  };
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
  //For show entry
  const [postsPerPage, setpostPerPage] = useState(10);
  // downLoad CV
  const DownloadCV = (resume) => {
    window.open(resume, "_blank");
  };
  //download Photo
  const DownloadPhoto = () => {};
  //pagination
  var dataLimit = postsPerPage;
  var pageLimit = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return searchItems.slice(startIndex, endIndex);
  };
  //filter data
  const setSearchItems = useState([]);
  const unique = [...new Set(data.map((item) => item.status))];
  const FilterData = () => {
    switch (status) {
      case "All":
        const AllDataresult = unique;
        setSearchItems(AllDataresult);
        return AllDataresult;
      case "Hired":
        const result = unique.filter((status) => status === "Hired");
        setSearchItems(result);
        return result;
      case "Schedule":
        const result2 = unique.filter((status) => status === "Schedule");
        setSearchItems(result2);
        return result2;
      case "Rejected":
        const result3 = unique.filter((status) => status === "Rejected");
        setSearchItems(result3);
        return result3;
      default:
    }
  };
  return (
    <>
      <div className="interviewSchedule">
        <Topbar />
        <div className="row Interview_Form">
          <div className="Heading_interview">
            <Header HeadingName="Interview Schedule Table"></Header>
            <div className="card">
              <div className="table-responsive">
                <table className="table mb-0 text-nowrap table-hover allint_table">
                  <thead>
                    <tr>
                      <td colSpan={1}>
                        <label>Show Entries</label>
                        <Form.Select
                          className="Table-entry"
                          value={postsPerPage}
                          onChange={(e) => {
                            setpostPerPage(Number(e.target.value));
                          }}
                        >
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              {pageSize}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td colSpan={5}></td>
                      <td colSpan={2}>
                        <form>
                          <div className="d-flex justify-content-center align-items-center">
                            <input
                              type="search"
                              placeholder="Search"
                              className="form-control mx-2 searchbox"
                              aria-label="Search"
                              onChange={(e) => setSearchInput(e.target.value)}
                              style={{ verticalAlign: "none",padding:"5px 5px" }}
                            />
                          </div>
                        </form>
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={2}>
                        <Link to="/interviewschedule">
                          <Button
                            classNames="allbtncss"
                            btnName="+ Add Interview"
                          ></Button>
                        </Link>
                      </td>
                      <td colSpan={1}></td>
                    </tr>
                    <tr className="text-center">
                      <th className="tab_head text-center" scope="col">
                        Sr. No
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Name / Email
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Phone Number
                      </th>
                      <th className="tab_head text-center" scope="col">
                        gender
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Date Of Interview
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Time Of Interview
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Designation
                      </th>
                      <th className="tab_head text-center" scope="col">
                        CV
                      </th>
                      <th className="tab_head text-center" scope="col">
                        Status
                        <div className="d-flex align-items-center">
                          <label className="me-2 text-white"></label>
                          <form onSubmit={FilterData}>
                            <select
                              className="form-select select-filter"
                              id="order-sort"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value={"fgh"}>sdfg</option>
                              {unique.map((statusdata) => {
                                return (
                                  <option value={statusdata}>
                                    {statusdata}
                                  </option>
                                );
                              })}
                            </select>
                          </form>
                        </div>
                      </th>
                      <th colSpan={2} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {/*------------------- table body------------ */}
                  <tbody>
                    {/* Table lenght empty condition loader */}
                    {data.length === 0 ? (
                      <div className="loader_table"></div>
                    ) : (
                      ""
                    )}
                    {getPaginatedData().map((item, i) => { 
                      return (
                        <React.Fragment key={i}>
                          {!Loader ?
                          <tr className="border-bottom">
                            <td>
                              <div className=" me-3">
                                <span
                                  className="mt-2 text-center"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {i + 1}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <img
                                  className="allin_tabpro mx-2"
                                  src={user}
                                  alt="img"
                                  onClick={DownloadPhoto(user)}
                                />
                                <div className="me-3 mt-1 d-block">
                                  <h6 className="mb-0 fs-13 font-weight-semibold">
                                    {item.name}
                                  </h6>
                                  <div className="clearfix"></div>
                                  <small className="text-muted">
                                    {item.email}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td className="text-left fs-13">{item.phone}</td>
                            <td className="text-left fs-13">
                              <span className="me-1"></span>
                              {item.gender}
                            </td>
                            <td className="text-left fs-13">
                              <span className="me-1"></span>
                              {item.interviewDate}
                            </td>
                            <td className="text-left fs-13">
                              <span className="me-1"></span>
                              {item.interviewTime}
                            </td>
                            <td className="text-left fs-13">
                              <span className="me-1"></span>
                              {item.designation}
                            </td>
                            <td className="text-left fs-13">
                              <span
                                href={item.resume}
                                className="mx-4 btn btn-primary badge bg-info"
                                target="_blank"
                                onClick={() => DownloadCV(item.resume)}
                                download
                              >
                                DOWNLOAD
                              </span>
                            </td>
                            <td className="text-left fs-13">
                              <button className="me-1 Status_interview badge bg-success bg-opacity-60 bg-lighten-xl">
                                {item.status}
                              </button>
                            </td>
                            <td className="text-end">
                              <Link to={"/interviewupdate/" + item._id}>
                                <span className="action-button btn-mail me-2">
                                  <FaUserEdit />
                                </span>
                              </Link>
                              <span className="action-button btn-delete me-2">
                                <AiOutlineDelete
                                  onClick={() => onDelete(item._id)}
                                />
                              </span>
                              <span className="action-button btn-mail me-2">
                                <a href={`mailto:${item.email}`}>
                                  <AiOutlineMail />
                                </a>
                              </span>
                              <span className="action-button btn-call me-2">
                                <a href={`tel:${item.phone}`}>
                                  <BiPhoneCall />
                                </a>
                              </span>
                            </td>
                          </tr>
                          :<tr key={i}></tr>}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row mt-4">
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
                    {/* Pagination */}
                    {data.length > 10 ? (
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
            <FooterBar />
          </div>
        </div>
      </div>
    </>
  );
};
export default InterviewTableData;
