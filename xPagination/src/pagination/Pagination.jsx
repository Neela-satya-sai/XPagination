import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  function handlePrev() {
    // console.log("clicked prev");
    setCurrentPage((prev) => prev - 1);
  }

  function handleNext() {
    console.log(totalPages);
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className={styles.paginationWrapper}>
      <button onClick={handlePrev} disabled={currentPage == 1}>
        Previous
      </button>

      <p>{currentPage}</p>

      <button onClick={handleNext} disabled={totalPages == currentPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
