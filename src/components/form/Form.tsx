import React, { useEffect } from "react";
import { Card, addCard, initialState } from "../../store/redux/features/cardSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import "./Form.scss";
import { handleCreditCardNumber } from "../../utils/utils";
import { months, years } from "./constants";
import { creditCardSchema } from "./validationSchema";
import FormFeedback from "../common/FormFeedback";
import Loader from "../common/Loader";
import { publish } from "../../utils/events";

interface FormProps {
  onCardInputFocus?: ({ target }: { target: EventTarget | null }) => void;
  onCardInputBlur?: () => void;
}

const Form: React.FC<FormProps> = ({ onCardInputFocus, onCardInputBlur }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.card);
  const initialCreditCardNumber = "################";
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Card>({ resolver: zodResolver(creditCardSchema), mode: "onBlur" });
  const removeCreditCardNumberAnimation = (): void => {
    const characters = document.getElementById("credit-card-number-characters");
    if (characters) {
      Array.from(characters.children).forEach((span) => {
        span.classList.add("wavy");
      });
    }
  };

  const handleChange = ({ target }: { target: EventTarget | null }): void => {
    const { value, name } = target as HTMLInputElement;
    const unMaskedNumber = handleCreditCardNumber(
      initialCreditCardNumber,
      value,
      true
    );

    if (name.includes("cardNumber")) {
      dispatch(
        addCard({ ...card, [name]: unMaskedNumber, cardNumberValue: value })
      );
    } else {
      dispatch(addCard({ ...card, [name]: value }));
    }
  };

  const onSubmit: SubmitHandler<Card> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (data) {
        dispatch(addCard(initialState));
        reset();
      }
    } catch (error: unknown) {
      publish('form-submit', { isSubmitting, error });
      setError("root", {
        message: `There was a error precessing your request. Check ${error} and try again`,
      });
    }
  };

  useEffect(() => {
    publish('form-submit', { isSubmitting, error: null });
    removeCreditCardNumberAnimation();
  }, [card, setFocus, errors, isSubmitting]);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <label
            htmlFor="cardNumberLabel"
            className="input-cardnumber-label label"
          >
            Card Number
          </label>
          <input
            className="card-number-input input"
            {...register("cardNumber", {
              onChange: handleChange,
              required: true
            })}
            type="text"
            data-testid="card-number-input"
            onBlur={onCardInputBlur}
            onFocus={onCardInputFocus}
            maxLength={19}
          />
          {errors.cardNumber && (
            <FormFeedback message={errors.cardNumber.message} />
          )}
        </div>
        <div className="form-input">
          <label htmlFor="cardNameLabel" className="form-name-label label">
            Card Name
          </label>
          <input
            className="form-card-holder-input input"
            {...register("cardHolder", {
              onChange: handleChange,
              required: true
            })}
            type="text"
            data-testid="form-card-holder-input"
            onBlur={onCardInputBlur}
            onFocus={onCardInputFocus}
          />
          {errors.cardHolder && (
            <FormFeedback message={errors.cardHolder.message} />
          )}
        </div>
        <div className="form-input">
          <div className="form-input-group">
            <div className="form-input-date-month">
              <label
                htmlFor="cardMonthLabel"
                className="form-month-input-label label"
              >
                Expiration
              </label>
              <select
                className="card-mounth-select select"
                {...register("cardMonth", {
                  onChange: handleChange,
                })}
                onBlur={onCardInputBlur}
                onFocus={onCardInputFocus}
              >
                <option value="">Month</option>
                {months.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.cardMonth && (
                <FormFeedback message={errors.cardMonth.message} />
              )}
            </div>
            <div className="form-input-date-year">
              <label
                htmlFor="cardYearLabel"
                className="form-year-input-label label"
              >
                &nbsp;
              </label>
              <select
                className="card-year-select select"
                {...register("cardYear", {
                  onChange: handleChange,
                })}
                onBlur={onCardInputBlur}
                onFocus={onCardInputFocus}
              >
                <option value="">Year</option>
                {years.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.cardYear && (
                <FormFeedback message={errors.cardYear.message} />
              )}
            </div>
            <div className="form-input-cvv">
              <label htmlFor="cardCvv" className="form-cvv-label label">
                CVV
              </label>
              <input
                className="form-cvv-input input"
                {...register("cardCvv", {
                  onChange: handleChange,
                })}
                type="text"
                data-testid="form-cvv-input"
                onBlur={onCardInputBlur}
                onFocus={onCardInputFocus}
                maxLength={4}
              />
              {errors.cardCvv && (
                <FormFeedback message={errors.cardCvv.message} />
              )}
            </div>
          </div>
        </div>
        <div className="form-submit-button">
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loader size={30} backdrop={undefined} /> : "Submit"}
          </button>
        </div>
        {errors.root && <FormFeedback message={errors.root.message} />}
      </form>
    </div>
  );
};

export default Form;
