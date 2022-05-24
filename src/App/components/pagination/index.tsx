import Button from "../button";
import "./index.css";
interface paginationProps {
  pageCount: number;
  currentPage: number;
  changePage: (i: number) => void;
}
function Pagination({ pageCount, currentPage, changePage }: paginationProps) {
  return (
    <div className="pagination">
      {Array(pageCount)
        .fill(0)
        .map((_, i) => {
          return (
            <Button
              key={i}
              onClick={() => changePage(i)}
              className={
                i === currentPage
                  ? "pagination__btn current"
                  : "pagination__btn"
              }
            >
              {`${i + 1}`}
            </Button>
          );
        })}
    </div>
  );
}
export default Pagination;
