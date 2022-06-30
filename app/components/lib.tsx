import { FaSpinner } from "react-icons/fa";
import type { IconBaseProps } from "react-icons/lib";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`rounded border border-gray-200 bg-gray-100 py-2 px-3 ${className}`}
    />
  );
};

const Spinner = ({ ...props }: { props?: IconBaseProps }) => {
  return <FaSpinner aria-label="loading" className="animate-spin" {...props} />;
};

export { Input, Spinner };
