import { useEffect, useCallback, useState } from "react";
import CountryCard from "./components/countryCard";
import Button from "./components/button";
import FetchAPI from "./utility/fetchAPI";
import DataFilter from "./utility/dataFilter";
import Spiner from "./components/spinner";
import Pagination from "./components/pagination";
import "./App.css";

export interface countriesData {
  name: string;
  region: string;
  area: number;
}

function App() {
  const [data, setData] = useState<countriesData[]>([]);
  const [sort, setSort] = useState(false);
  const [filterRegion, setFilterRegion] = useState(false);
  const [filterSize, setFilterSize] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectPage = useCallback(
    (increment: number) => {
      setCurrentPage(increment);
      setStartFrom(increment * 10);
      setEndTo((increment + 1) * 10);
    },
    [setCurrentPage, setStartFrom, setEndTo]
  );

  const getData = useCallback(async () => {
    try {
      const responseData = await FetchAPI(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      if (responseData.length) {
        setData(responseData);
        setLoading(false);
      } else {
        setError("Request Failed");
        setLoading(false);
      }
    } catch (error) {
      setError("Request Failed");
      setLoading(false);
    }
  }, [setData, setError]);

  const filteredData: Array<countriesData> = DataFilter(
    filterSize,
    filterRegion,
    data
  );

  const sortList = () => {
    if (sort) {
      const sortASC = data.sort((a, b) =>
        a.name.localeCompare(b.name, "en", {
          ignorePunctuation: true,
        })
      );
      setData(sortASC);
    }
    if (!sort) {
      const sortDSC = data.sort((a, b) =>
        b.name.localeCompare(a.name, "en", { ignorePunctuation: true })
      );
      setData(sortDSC);
    }
    setSort(!sort);
  };

  let pageCount: number = Math.ceil(filteredData.length / 10);

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [getData, loading]);

  useEffect(() => {
    if (currentPage <= pageCount) return;
    else {
      selectPage(pageCount - 1);
    }
  }, [pageCount, currentPage, selectPage]);

  return (
    <div className="App">
      <div className="console">
        <div className="console__filters">
          <Button
            onClick={() => setFilterSize(!filterSize)}
            className={filterSize ? "filters__btn selected" : "filters__btn"}
          >
            {"Smaller than Lithuania by area"}
          </Button>
          <Button
            onClick={() => setFilterRegion(!filterRegion)}
            className={filterRegion ? "filters__btn selected" : "filters__btn"}
          >
            {"Oceania region"}
          </Button>
        </div>
        <div className="console__filters">
          <Button onClick={() => sortList()} className={"filters__btn"}>
            {sort ? "DSC" : "ASC"}
          </Button>
        </div>
      </div>
      {error ? <div>{error}</div> : null}
      <div className="cards__container">
        {loading ? <Spiner /> : null}
        {filteredData
          .slice(startFrom, endTo)
          .map(({ name, region, area }: countriesData, index: number) => {
            return (
              <CountryCard
                name={name}
                area={area}
                region={region}
                key={index}
              />
            );
          })}
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        changePage={selectPage}
      />
    </div>
  );
}

export default App;
