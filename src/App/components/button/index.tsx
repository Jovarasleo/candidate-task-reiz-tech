import "./index.css";
interface btnProps {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
function Button({ children, onClick, className }: btnProps) {
  let classNames = className ? ["btn", className].join(" ") : "btn";
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
