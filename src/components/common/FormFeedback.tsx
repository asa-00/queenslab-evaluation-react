import { FC } from 'react';
import './FormFeedback.scss';

interface FormFeedbackProps {
    message: string | undefined;
    id: string | undefined
}

const FormFeedback: FC<FormFeedbackProps> = ({ message, id }) => (
    <div id={id} className="form-feedback">
        <span className='icon'>&#9888;{' '}</span>
        {message ?? ''}
    </div>
);

export default FormFeedback;
