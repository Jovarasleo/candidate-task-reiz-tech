import { countriesData } from "../App";

function DataFilter(
  filterSize: Boolean,
  filterRegion: Boolean,
  data: Array<countriesData>
) {
  return data
    .filter((country) => {
      if (filterSize) {
        return country.area < 65300;
      } else return country;
    })
    .filter((country) => {
      if (filterRegion) {
        return country.region === "Oceania";
      } else return country;
    });
}
export default DataFilter;
