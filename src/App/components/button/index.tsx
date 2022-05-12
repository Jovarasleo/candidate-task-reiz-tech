import "./index.css";
interface btnProps {
  children: string;
  onClick?: any;
  className?: string;
}
function Button({ children, onClick, className }: btnProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
