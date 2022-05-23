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
        <p className="section">Country: {name}</p>
      </div>
      <div className="card__section">
        <p className="section">Region: {region}</p>
      </div>
      <div className="card__section">
        <p className="section">Area: {area} km²</p>
      </div>
    </div>
  );
}
export default CountryCard;
