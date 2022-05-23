import { useEffect, useCallback, useState } from "react";
import CountryCard from "./components/countryCard";
import Button from "./components/button";
import FetchAPI from "./fetchAPI";
import "./App.css";

interface countriesData {
  name: string;
  region: string;
  area: number;
}

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [filterRegion, setFilterRegion] = useState(false);
  const [filterSize, setFilterSize] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectPage = useCallback(
    (increment: number) => {
      setPage(increment);
      setStartFrom(increment * 10);
      setEndTo((increment + 1) * 10);
    },
    [setPage, setStartFrom, setEndTo]
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

  const sortList = () => {
    setSort(!sort);
    setData(data.reverse());
  };

  const filteredData = data
    .filter((country: countriesData) => {
      if (filterSize) {
        return country.area < 65300;
      } else return country;
    })
    .filter((country: countriesData) => {
      if (filterRegion) {
        return country.region === "Oceania";
      } else return country;
    });

  let pageCount: number = Math.ceil(filteredData.length / 10);

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [getData, loading]);

  useEffect(() => {
    if (page <= pageCount) return;
    else {
      selectPage(pageCount - 1);
    }
  }, [pageCount, page, selectPage]);

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
            {sort ? "Descending" : "Ascending"}
          </Button>
        </div>
      </div>
      {error ? <div>{error}</div> : null}
      {loading ? <div>Loading...</div> : null}
      {filteredData
        .slice(startFrom, endTo)
        .map(({ name, region, area }: countriesData, index) => {
          return (
            <CountryCard name={name} area={area} region={region} key={index} />
          );
        })}
      <div className="pagination">
        {Array(pageCount)
          .fill(0)
          .map((_, i) => {
            return (
              <Button
                key={i}
                onClick={() => selectPage(i)}
                className={
                  i === page ? "pagination__btn current" : "pagination__btn"
                }
              >
                {`${i + 1}`}
              </Button>
            );
          })}
      </div>
    </div>
  );
}

export default App;
