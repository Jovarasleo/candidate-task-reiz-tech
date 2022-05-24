import { countriesData } from "../App";

function DataFilter(
  filterSize: Boolean,
  filterRegion: Boolean,
  data: Array<countriesData>
) {
  const lithuania = data.find((country) => country.name === "Lithuania");
  return data
    .filter((country) => {
      if (filterSize) {
        if (lithuania) {
          return country.area < lithuania.area;
        } else return country;
      } else return country;
    })
    .filter((country) => {
      if (filterRegion) {
        return country.region === "Oceania";
      } else return country;
    });
}
export default DataFilter;
