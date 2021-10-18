import classNames from "classnames";
import "./button.css";

export interface ButtonPros
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({ children, className, ...props }: ButtonPros) => {
  const klassName = classNames("button", className);
  return (
    <button className={klassName} {...props}>
      {children}
    </button>
  );
};
