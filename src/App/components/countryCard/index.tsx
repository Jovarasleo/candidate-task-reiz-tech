import "./index.css";
interface cardProps {
  name: string;
  region: string;
  area: number;
}
function CountryCard({ name, region, area }: cardProps) {
  return (
    <div className="card">
      <div className="card__section">
        <p className="section--name">Country: {name}</p>
      </div>
      <div className="card__section">
        <p className="section--region">Region: {region}</p>
      </div>
      <div className="card__section">
        <p className="section--area">Area: {area} km²</p>
      </div>
    </div>
  );
}
export default CountryCard;
