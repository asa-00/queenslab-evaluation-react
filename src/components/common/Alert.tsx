import { FC, ReactElement, CSSProperties, useState, useEffect, ReactNode } from "react";
import "./Alert.scss";
import { publish } from "../../utils/events";
import { Message } from "../form/CreditCardForm";
interface AlertProps {
  backdrop: boolean;
  message: Message | undefined;
}

const Alert: FC<AlertProps> = ({ backdrop, message }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO Close success after period of time

  // Close the alert and publish the close event
  const handleClose = (): void => {
    setIsOpen(false);
    publish('close-alert');
  };

  const alertMessage = (messge: Message) => <div className={`alert-message ${messge.type}`}>{message?.message}</div>

  const alertIcon = (type: string): ReactNode => {
    switch (type) {
      case "info":
        return <div className="alert-icon info-icon">&#8505;</div>;
      case "success":
        return <div className="alert-icon success-icon">&#10003;</div>;
      case "error":
        return <div className="alert-icon error-icon">&#10539;</div>;
      default:
        return null; // Return null for unsupported types
    }
  };
  
  const messageType = (type: string): string => {
    if (type === "success" || type === "error") {
      return type;
    }
    return "";
  };

  const renderAlert = (customStyle: CSSProperties): ReactElement => (
    <div className="alert-container" style={customStyle}>
      {isOpen && <button onClick={handleClose} className="close-button">close</button>}
      {alertIcon(message?.type ?? 'default')}
      {alertMessage(message as Message)}
    </div>
  );


  useEffect(() => {
    setIsOpen(!!message);
  }, [message, isOpen]);

  // Render the alert component based on props
  if (message?.message && isOpen) {
    const customStyle: CSSProperties = backdrop ? { top: "60px", display: 'block' } : {};
    const alertType: string = messageType(message.type);

    return (
      <div className={`alert-backdrop ${alertType}`}>
        {renderAlert(customStyle)}
      </div>
    );
  }
  
  return null;
};

export default Alert;
