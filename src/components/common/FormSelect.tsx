import { FC, forwardRef } from "react";
import "./FormSelect.scss";
import _ from "lodash";
import {
    DeepMap,
    FieldError,
    UseFormRegister,
    Path
  } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import FormFeedback from "./FormFeedback";
import { Card } from "../../store/redux/features/cardSlice";

type SelectProps<Card extends Record<never, never>> = {
  id: string;
  name: Path<Card>;
  label: string;
  options: string[];
  className?: string;
  register?: UseFormRegister<Card>;
  onBlur: () => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors?: Partial<DeepMap<Card, FieldError>>;
};

const Select: FC<SelectProps<Card>> = forwardRef<HTMLSelectElement, SelectProps<Card>>(({
  id,
  name,
  label,
  className = "",
  options,
  register, 
  errors,
  onFocus,
  onBlur,
  ...props
}, ref ) => {
  const errorMessages = _.get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <>
      <label className="label">{label}</label>
      <select
        name={name}
        id={id}
        data-testid={`${_.kebabCase(name)}-select`}
        aria-label={label}
        ref={ref}
        className={`select ${className}`}
        aria-describedby={`${name}-error`}
        aria-invalid={hasError}
        onBlur={onBlur}
        onFocus={onFocus as never}
        {...register}
        {...props}
      >
        <option value="">Select {_.startCase(name).split(" ")[1]}</option>
        {options.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage
        errors={errors}
        name={name as never}
        render={({ message }) => (
          <FormFeedback message={message} id={`${_.kebabCase(name)}-error`} type="warning" />
        )}
      />
    </>
  );
});

export default Select;
