import Button from "../button";
import { useState, useRef } from "react";
import "./index.css";
interface paginationProps {
  pageCount: number;
  currentPage: number;
  changePage: (i: number) => void;
}
function Pagination({ pageCount, currentPage, changePage }: paginationProps) {
  const point = useRef(0);
  const visibleNumbers = 5;
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(visibleNumbers);
  const nextPage = (value: number) => {
    handleClick(value);
  };
  const handleClick = (i: number) => {
    point.current = i;
    changePage(point.current);
    console.log(i, point, currentPage);
    if (point.current + 1 === endTo && endTo < pageCount) {
      console.log("inside if");
      setStartFrom(startFrom + 1);
      setEndTo(endTo + 1);
    }
    if (point.current === startFrom && startFrom > 0) {
      console.log("inside if");
      setStartFrom(startFrom - 1);
      setEndTo(endTo - 1);
    }
    if (point.current === 0) {
      console.log("inside if");
      setStartFrom(0);
      setEndTo(visibleNumbers);
    }
    if (point.current === pageCount - 1) {
      console.log("inside if");
      setStartFrom(pageCount - visibleNumbers);
      setEndTo(pageCount);
    }
  };
  return (
    <div className="pagination">
      <div
        style={point.current === 0 ? { color: "grey" } : {}}
        className="arrow arrow__left"
        onClick={
          point.current > 0
            ? () => nextPage(point.current - 1)
            : () => void point.current
        }
      ></div>
      {startFrom > 0 ? (
        <div style={{ display: "flex", gap: "5px" }}>
          <Button className={"pagination__btn"} onClick={() => handleClick(0)}>
            1
          </Button>
          <div
            style={{
              lineHeight: "25px",
              height: "25px",
              width: "26px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            . . .
          </div>
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
        <div style={{ display: "flex", gap: "5px" }}>
          <div
            style={{
              lineHeight: "25px",
              height: "25px",
              width: "26px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            . . .
          </div>
          <Button
            className={"pagination__btn"}
            onClick={() => handleClick(pageCount - 1)}
          >{`${pageCount}`}</Button>
        </div>
      ) : null}
      <div
        style={point.current === pageCount - 1 ? { color: "grey" } : {}}
        className="arrow arrow__right"
        onClick={
          point.current < pageCount - 1
            ? () => nextPage(point.current + 1)
            : () => void point.current
        }
      ></div>
    </div>
  );
}
export default Pagination;
