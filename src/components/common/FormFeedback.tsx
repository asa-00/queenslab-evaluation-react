import { FC } from "react";
import "./FormFeedback.scss";

interface FormFeedbackProps {
  message: string | undefined;
  id: string | undefined;
  type: string | undefined;
}

const FormFeedback: FC<FormFeedbackProps> = ({ message, id, type }) => {
  if (message) {
    return (
      <div id={id} className="form-feedback">
        {type === "warning" && <span className="icon-warning">&#9888; </span>}
        {type === "error" && <span className="icon-error">&#10539; </span>}
        <span className={`message-${type}`}>{message ?? ""}</span>
      </div>
    );
  }
  return null;
};

export default FormFeedback;
