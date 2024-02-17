import { FC, ReactElement, CSSProperties, useState, useEffect } from "react";
import "./Alert.scss";
import { publish } from "../../utils/events";

interface AlertProps {
  size: number | undefined;
  backdrop: boolean | undefined;
  message: string | undefined;
}

const Alert: FC<AlertProps> = ({ backdrop, message }) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const handleClose = (): void => {
      setIsOpen(false);
      publish('close-alert');
  }
  
  const alert = (customStyle: CSSProperties | undefined): ReactElement => (
    <div className="alert-container" style={customStyle}>
      <button onClick={handleClose} className="close-button">close</button>
      <div className="alert-icon">
        &#10539;
      </div>
      <div className="alert-message">{message ?? message}</div>
    </div>
  );

  useEffect(() => {
    setIsOpen(!!message)
  }, [isOpen, message])
  

  if (message && isOpen) {
    if (backdrop) {
      return <div className={`alert-backdrop ${message === undefined ? 'success' : 'error' }`}>{alert({ top: "60px", display: 'block' })}</div>;
    }

    return alert({});
  }
  return null;
};

export default Alert;
