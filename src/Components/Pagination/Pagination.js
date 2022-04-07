import React, { useState } from 'react'
import '../Components.css'
const Pagination = React.memo((props) => {

    const [pages] = useState(Math.round(props.length / props.pageLimit));

    const getPaginationGroup = () => {
        let start = Math.floor((1 - 1) / 2) * 2;
        return new Array(props.pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    function goToNextPage() {
        if(props.currentPage){
            props.setCurrentPage((page) => page + 1);
        }
        else{
            props.setCurrentPage("No Data Found");
        }
    }

    function goToPreviousPage() {
        props.setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        props.setCurrentPage(pageNumber);
    }

    return (
        <div className="d-flex justify-content-between pt-2">
            <ul className='propagination'>
                <li className='propage-item'>
                    <button className={`propage-link ${props.currentPage === 1 ? "disabled" : ""}`}
                        onClick={goToPreviousPage}
                        disabled={props.currentPage === 1 ? true : false}
                    >
                        <i className="fa fa-angle-left mx-2"></i>
                        Prev
                    </button>
                </li>
            </ul>
            <ul className='propagination'>

                {getPaginationGroup().map((item, index) => (
                    <li
                        key={index}
                        onClick={changePage}
                        style={{ cursor: "pointer" }}
                        className={`propage-item d-none d-sm-block ${props.currentPage === item ? 'active' : null}`}
                    >
                        <span className='propage-link'>{item}</span>
                    </li>
                ))}
            </ul>
            <ul className='propagination'>
                <li className='propage-item'>
                    <button className={`propage-link ${props.currentPage === pages ? "disabled" : ""}`}
                        onClick={goToNextPage}
                        disabled={props.currentPage === pages ? true : false}
                    >
                        Next <i className="fa fa-angle-right mx-1"></i>
                    </button>
                </li>
            </ul>
        </div>
    )
})

export default Pagination
