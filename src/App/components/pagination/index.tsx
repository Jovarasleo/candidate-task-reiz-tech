import Button from "../button";
import { useState, useEffect, useCallback } from "react";
import "./index.css";
interface paginationProps {
  pageCount: number;
  currentPage: number;
  changePage: (i: number) => void | null;
}
function Pagination({ pageCount, currentPage, changePage }: paginationProps) {
  const visibleNumbers = 5;
  const [position, setPosition] = useState(0);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(visibleNumbers);

  const nextPage = (value: number) => {
    handleClick(value);
  };
  const handleClick = useCallback(
    (i: number) => {
      setPosition(i);
      changePage(i);
      if (i + 1 === endTo && endTo < pageCount) {
        setStartFrom(startFrom + 1);
        setEndTo(endTo + 1);
      }
      if (i === startFrom && startFrom > 0) {
        setStartFrom(startFrom - 1);
        setEndTo(endTo - 1);
      }
      if (i === 0) {
        setStartFrom(0);
        setEndTo(visibleNumbers);
      }
      if (i === pageCount - 1) {
        setStartFrom(pageCount - visibleNumbers);
        setEndTo(pageCount);
      }
      if (pageCount < visibleNumbers) {
        setStartFrom(0);
        setEndTo(visibleNumbers);
      }
    },
    [changePage, endTo, pageCount, startFrom]
  );

  useEffect(() => {
    handleClick(currentPage);
  }, [pageCount, currentPage, handleClick]);

  return (
    <div className="pagination">
      {pageCount ? (
        <div
          className={
            position === 0
              ? "pagination__arrow arrow--left arrow--inactive"
              : "pagination__arrow arrow--left"
          }
          onClick={position > 0 ? () => nextPage(position - 1) : () => null}
        ></div>
      ) : null}
      {startFrom > 0 ? (
        <div className="pagination__endpoint">
          <Button className="pagination__btn" onClick={() => handleClick(0)}>
            1
          </Button>
          {startFrom > 1 ? <div className="endpoint--spacer">...</div> : null}
        </div>
      ) : null}

      {Array(pageCount)
        .fill(0)
        .map((_, i) => {
          return (
            <Button
              key={i}
              onClick={() => handleClick(i)}
              className={
                i === currentPage
                  ? "pagination__btn current"
                  : "pagination__btn"
              }
            >
              {`${i + 1}`}
            </Button>
          );
        })
        .slice(startFrom, endTo)}
      {endTo < pageCount ? (
        <div className="pagination__endpoint">
          {endTo < pageCount - 1 ? (
            <div className="endpoint--spacer">...</div>
          ) : null}
          <Button
            className="pagination__btn"
            onClick={() => handleClick(pageCount - 1)}
          >{`${pageCount}`}</Button>
        </div>
      ) : null}
      {pageCount ? (
        <div
          className={
            position === pageCount - 1
              ? "pagination__arrow arrow--right arrow--inactive"
              : "pagination__arrow arrow--right"
          }
          onClick={
            position < pageCount - 1 ? () => nextPage(position + 1) : () => null
          }
        ></div>
      ) : null}
    </div>
  );
}
export default Pagination;
