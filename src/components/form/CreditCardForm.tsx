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
import { FormInput } from "../common/FormInput";
import FormSelect from "../common/FormSelect";

export interface Message {
  type: string;
  message: string;
}
interface CardElementsRef {
  [key: string]: React.RefObject<HTMLDivElement>;
}

type FormProps = {
  isApiError: boolean;
  isLoading: boolean;
};

const CreditCardForm: React.FC<FormProps> = ({ isApiError, isLoading }) => {
  const dispatch = useAppDispatch();
  const card: Card = useAppSelector((state) => state.card);
  const initialCreditCardNumber: string = "################";
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Card>({
    resolver: zodResolver(creditCardSchema),
    mode: "onBlur",
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
    },
  });
  const [focusedElement, setFocusedElement] =
    useState<React.RefObject<HTMLElement> | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [success, setSuccess] = useState<Message>();

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
    if (name === "cardCvv") {
      setIsFlipped(true);
      setFocusedElement(refByName);
    } else {
      setIsFlipped(false);
    }
    setFocusedElement(refByName);
  };

  const handleCardInputBlur = useCallback(() => {
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

      if (isApiError) {
        throw new Error("Api Error");
      }

      if (data) {
        // Send the data to the server, reset the global state and form
        setSuccess({ message: 'Success', type: "success" });
        dispatch(addCard(initialState));
        reset();
      }
    } catch (error: unknown) {
      setError("root", {
        message: `There was an error precessing your request. Try again [${error}]`,
        type: "error"
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

  const handleAlertClose = useCallback(() => {
    setError("root", {});
    setSuccess(undefined);
  }, [setError]);
  
  useEffect(() => {
    removeCreditCardNumberAnimation();
    subscribe("close-alert", handleAlertClose);

    return () => {
      unsubscribe("close-alert", handleAlertClose);
    };
  }, [card, setFocus, errors, isSubmitting, setError, isApiError, isLoading, handleAlertClose]);

  return (
    <div className="credit-card-container">
      <CreditCard
        isFlipped={isFlipped}
        isSubmitting={isSubmitting || isLoading}
        focusedElm={focusedElement}
        cardNumberRef={cardElementsRef.cardNumber}
        cardHolderRef={cardElementsRef.cardHolder}
        cardMonthRef={cardElementsRef.cardMonth}
        cardYearRef={cardElementsRef.cardYear}
        cardDate={cardElementsRef.cardDate}
        cardCvvRef={cardElementsRef.cardCvv}
        error={errors?.root as Message}
        success={success as Message}
      />
      <div className="form-container" data-testid="form-container">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Credit Card Form"
        >
          <FormInput
            id="form-card-number-input"
            label="Card Number"
            className="card-number-input"
            register={register}
            {...register("cardNumber", { onChange: handleChange })}
            type="text"
            onBlur={handleCardInputBlur}
            onFocus={handleCardInputFocus}
            placeholder="Enter card number"
            errors={errors}
          />
          <FormInput
            id="form-card-holder-input"
            label="Card Holder Name"
            className="card-holder-input"
            register={register}
            {...register("cardHolder", { onChange: handleChange })}
            type="text"
            onBlur={handleCardInputBlur}
            onFocus={handleCardInputFocus}
            placeholder="Enter card holder name"
            errors={errors}
          />
          <div className="form-input">
            <div className="form-input-group">
              <div className="form-input-date-month">
                <FormSelect
                  label="Expiration"
                  id="card-expiration-month"
                  aria-label="Card Month"
                  className="card-month-select"
                  aria-describedby="card-month-error"
                  {...register("cardMonth", { onChange: handleChange })}
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                  options={months}
                  errors={errors}
                />
              </div>
              <div className="form-input-date-year">
                <FormSelect
                  label="&nbsp;"
                  id="card-expiration-year"
                  aria-label="Card Year"
                  className="card-year-select"
                  aria-describedby="card-year-error"
                  {...register("cardYear", { onChange: handleChange })}
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                  options={years}
                  errors={errors}
                />
              </div>
              <div className="form-input-cvv">
                <FormInput
                  id="form-cvv-input"
                  label="CVV"
                  className="cvv-input"
                  register={register}
                  {...register("cardCvv", { onChange: handleChange })}
                  type="text"
                  onBlur={handleCardInputBlur}
                  onFocus={handleCardInputFocus}
                  placeholder="Enter CVV"
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div className="form-submit-button">
            <button
              disabled={isSubmitting}
              type="submit"
              data-testid="form-submit-button"
            >
              {isSubmitting || isLoading ? (
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
