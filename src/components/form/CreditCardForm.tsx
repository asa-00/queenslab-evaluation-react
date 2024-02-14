import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Card,
  addCard,
  initialState,
} from "../../store/redux/features/cardSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import "./CreditCardForm.scss";
import { handleCreditCardNumber } from "../../utils/utils";
import { months, years } from "./constants";
import { creditCardSchema } from "./validationSchema";
import FormFeedback from "../common/FormFeedback";
import Loader from "../common/Loader";
import CreditCard from "../credit-card/CreditCard";
import { subscribe, unsubscribe } from "../../utils/events";

interface CardElementsRef {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const CreditCardForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const card: Card = useAppSelector((state) => state.card);
  const initialCreditCardNumber: string = "################";
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Card>({
    resolver: zodResolver(creditCardSchema),
    mode: "onBlur",
      defaultValues: {
        cardNumber: "",
        cardHolder: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: ""
    }
  });
  const [focusedElement, setFocusedElement] =
    useState<React.RefObject<HTMLElement> | null>(null);
  const [focusedInputName, setFocusedInputName] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const cardElementsRef: CardElementsRef = {
    cardNumber: useRef<HTMLDivElement>(null),
    cardHolder: useRef<HTMLDivElement>(null),
    cardMonth: useRef<HTMLDivElement>(null),
    cardYear: useRef<HTMLDivElement>(null),
    cardDate: useRef<HTMLDivElement>(null),
    cardCvv: useRef<HTMLDivElement>(null),
  };

  const handleCardInputFocus = ({
    target,
  }: {
    target: EventTarget | null;
  }): void => {
    const { name } = target as HTMLInputElement;
    const refByName = cardElementsRef[name];
    setFocusedInputName(name);
    if (name === "cardCvv") {
      setIsFlipped(true);
      setFocusedElement(refByName);
    } else {
      setIsFlipped(false);
    }
    setFocusedElement(refByName);
  };

  const handleCardInputBlur = useCallback((): void => {
    setFocusedElement(null);
    setIsFlipped(false);
  }, []);

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
    setError("root", {});
    try {
      // To simulate async api call to server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error("Api Error");

      if (data) {
        dispatch(addCard(initialState));
        reset();
      }
    } catch (error: unknown) {
      setError("root", {
        message: `There was an error precessing your request. Try again [${error}]`,
      });
    }
  };

  const removeCreditCardNumberAnimation = (): void => {
    const characters = document.getElementById("credit-card-number-characters");
    if (characters) {
      Array.from(characters.children).forEach((span) => {
        span.classList.add("wavy");
      });
    }
  };

  useEffect(() => {
    removeCreditCardNumberAnimation();
    subscribe("close-alert", () => setError("root", {}));

    return () => {
      unsubscribe("close-alert", () => setError("root", {}));
    };
  }, [
    card,
    setFocus,
    errors,
    isSubmitting,
    focusedInputName,
    getValues,
    setError,
  ]);

  return (
    <div className="credit-card-container">
      <CreditCard
        isFlipped={isFlipped}
        isSubmitting={isSubmitting}
        focusedElm={focusedElement}
        cardNumberRef={cardElementsRef.cardNumber}
        cardHolderRef={cardElementsRef.cardHolder}
        cardMonthRef={cardElementsRef.cardMonth}
        cardYearRef={cardElementsRef.cardYear}
        cardDate={cardElementsRef.cardDate}
        cardCvvRef={cardElementsRef.cardCvv}
        error={errors?.root?.message}
      />
      <div className="form-container" data-testid="form-container">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Credit Card Form"
        >
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
                required: true,
                value: getValues("cardNumber")
              })}
        
              type="text"
              data-testid="card-number-input"
              onBlur={handleCardInputBlur}
              onFocus={handleCardInputFocus}
              maxLength={19}
              placeholder="Enter card number"
              aria-describedby="card-number-error"
            />
            {errors.cardNumber && (
              <FormFeedback
                message={errors.cardNumber.message}
                id="card-number-error"
                type="warning"
              />
            )}
          </div>
          <div className="form-input">
            <label htmlFor="cardNameLabel" className="form-name-label label">
              Card Holder Name
            </label>
            <input
              className="form-card-holder-input input"
              {...register("cardHolder", {
                onChange: handleChange,
                required: true,
              })}
              type="text"
              data-testid="form-card-holder-input"
              onBlur={handleCardInputBlur}
              onFocus={handleCardInputFocus}
              placeholder="Enter card holder name"
              aria-describedby="card-holder-error"
            />
            {errors.cardHolder && (
              <FormFeedback
                message={errors.cardHolder.message}
                id="card-holder-error"
                type="warning"
              />
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
                  id="card-month"
                  data-testid="form-card-month-select"
                  aria-label="Card Month"
                  className="card-mounth-select select"
                  aria-describedby="card-month-error"
                  {...register("cardMonth", {
                    onChange: handleChange,
                  })}
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                >
                  <option value="">Select month</option>
                  {months.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.cardMonth && (
                  <FormFeedback
                    message={errors.cardMonth.message}
                    id="card-month-error"
                    type="warning"
                  />
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
                  id="card-year"
                  data-testid="form-card-year-select"
                  aria-label="Card Year"
                  className="card-year-select select"
                  aria-describedby="card-year-error"
                  {...register("cardYear", {
                    onChange: handleChange,
                  })}
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                >
                  <option value="">Select year</option>
                  {years.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.cardYear && (
                  <FormFeedback
                    message={errors.cardYear.message}
                    id="card-year-error"
                    type="warning"
                  />
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
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                  maxLength={4}
                  placeholder="Enter CVV"
                  aria-describedby="card-cvv-error"
                />
                {errors.cardCvv && (
                  <FormFeedback
                    message={errors.cardCvv.message}
                    id="card-cvv-error"
                    type="warning"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form-submit-button">
            <button disabled={isSubmitting} type="submit" data-testid="form-submit-button">
              {isSubmitting ? (
                <Loader size={30} backdrop={undefined} message="" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {errors.root && (
            <FormFeedback
              message={errors.root.message}
              id="root-error"
              type="error"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
