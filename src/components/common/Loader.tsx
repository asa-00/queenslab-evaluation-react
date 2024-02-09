import { FC, ReactElement, CSSProperties } from "react";
import "./Loader.scss";

interface LoaderProps {
  size: number | undefined;
  backdrop: boolean | undefined
  message: string | undefined
}

const Loader: FC<LoaderProps> = ({ size, backdrop, message }) => {
  const loader = (customStyle: CSSProperties | undefined): ReactElement => ( 
    <div className="loader-container" style={customStyle}>
      <div className="loader" style={{ height: size, width: size }} />
      <div className="loader-message">{message ?? message}</div>
    </div>
  );

  if (backdrop) {
    return <div className="lodader-backdrop">{loader({ top: '60px' })}</div>;
  }

  return loader({});
};

export default Loader;
