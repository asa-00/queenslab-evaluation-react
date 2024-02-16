import { forwardRef } from "react";
import _ from "lodash";
import "./FormInput.scss";
import {
  DeepMap,
  FieldError,
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormFeedback from "../common/FormFeedback";
import { Card } from "./validationSchema";

type InputType = "text" | "number";

type FormInputProps<Card extends FieldValues> = {
  id: string;
  name: Path<Card>;
  label: string;
  placeholder: string;
  className?: string;
  type?: InputType;
  register?: UseFormRegister<Card>;
  rules?: RegisterOptions;
  onBlur: () => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors?: Partial<DeepMap<Card, FieldError>>;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps<Card>>(({
  name,
  id,
  label,
  placeholder,
  register,
  rules,
  type = "text",
  errors,
  className,
  ...props
}, ref ) => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = _.get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div style={{ marginBottom: 20 }} className={className} aria-live="polite">
      <label className="label">{label}</label>
      <input
        data-testid={`${_.kebabCase(name)}-input`}
        aria-describedby="card-number-error"
        aria-invalid={hasError}
        id={id}
        name={name}
        type={type}
        ref={ref}
        aria-label={label}
        placeholder={placeholder}
        className={`input ${className}`}
        {...register?.(name, rules)}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name as never}
        render={({ message }) => (
          <FormFeedback
            message={message}
            id={`${_.kebabCase(name)}-error`}
            type="warning"
          />
        )}
      />
    </div>
  );
});
