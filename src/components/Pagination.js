import React from "react";
import "./Pagination.css";
import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
} from "react-icons/fi";

function Pagination({ totalPosts, itemsPerPage, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button className="pagination-block" disabled={currentPage === pageNumbers[0]} onClick={() => paginate(pageNumbers[0])} >
                <FiChevronsLeft />
            </button>
            <button className="pagination-block" disabled={currentPage === pageNumbers[0]} onClick={() => paginate(currentPage - 1)} >
                <FiChevronLeft />
            </button>
            {pageNumbers.map(number => (
                <button className={number === currentPage ? "active" : "number"} onClick={() => paginate(number)} key={number}>
                    {number}
                </button>
            ))}
            <button className="pagination-block" disabled={currentPage === pageNumbers[pageNumbers.length - 1]} onClick={() => paginate(currentPage + 1)} >
                <FiChevronRight />
            </button>
            <button className="pagination-block" disabled={currentPage === pageNumbers[pageNumbers.length - 1]} onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} >
                <FiChevronsRight />
            </button>



        </div>
    );
}

export default Pagination;
