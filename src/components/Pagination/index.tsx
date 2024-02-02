import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  allToursNumber: number;
  elementsOnPage: number;
  setCurrentPageHandler: (selectedItem: { selected: number }) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  allToursNumber,
  elementsOnPage,
  setCurrentPageHandler,
  currentPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={setCurrentPageHandler}
      forcePage={currentPage - 1}
      pageRangeDisplayed={elementsOnPage}
      pageCount={Math.ceil(allToursNumber / elementsOnPage)}
      renderOnZeroPageCount={null}
      activeClassName={styles.paginateActive}
    />
  );
};

export default Pagination;
