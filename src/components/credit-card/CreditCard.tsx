import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import {
  creditCardLogoByType,
  creditCardTypeByNumber,
} from "../../utils/utils";
import "./CreditCard.scss";
import chip from "../../assets/chip.png";
import Loader from "../common/Loader";
import { Card } from "../../store/redux/features/cardSlice";
import Alert from "../common/Alert";

interface CreditCardProps {
  cardNumberRef: React.RefObject<HTMLDivElement>;
  cardHolderRef: React.RefObject<HTMLDivElement>;
  cardMonthRef: React.RefObject<HTMLDivElement>;
  cardYearRef: React.RefObject<HTMLDivElement>;
  cardDate: React.RefObject<HTMLDivElement>;
  cardCvvRef: React.RefObject<HTMLDivElement>;
  focusedElm: React.RefObject<HTMLElement> | null;
  isFlipped: boolean;
  isSubmitting: boolean;
  error: string | undefined
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumberRef,
  cardHolderRef,
  cardMonthRef,
  cardYearRef,
  cardCvvRef,
  focusedElm,
  isFlipped,
  isSubmitting,
  error,
}) => {
  const card: Card = useAppSelector((state) => state.card);
  const {
    cardNumber,
    cardHolder,
    cardMonth,
    cardYear,
    cardCvv,
    cardNumberValue,
  } = card;
  const [focused, setFocused] = useState<HTMLElement | null>(null);

  const currentlyFocused = (ref: React.RefObject<HTMLElement>): string => {
    if (ref?.current && focused) {
      return ref.current === focused ? "focused" : "";
    }
    return "";
  };

  const displayCardNumber = (cardNumber: string): JSX.Element => {
    return (
      <div id="credit-card-number-characters">
        {cardNumber.split("").map((char, i) => (
          <span className="character" key={`${char}-${i + 1}`}>
            {char}
          </span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (focusedElm?.current) {
      setFocused(focusedElm.current);
    } else {
      setFocused(null);
    }
  }, [focusedElm, cardNumber, isSubmitting]);

  const cardDateRef = cardMonthRef || cardYearRef

  return (
    <div className="card">
      <div
        className="card-inner"
        style={
          isFlipped
            ? { transform: "rotateY(180deg)" }
            : { transform: "rotateY(0deg)" }
        }
      >
        <div className="card-front" data-testid="credit-card-front">
          <div className="card-img-container">
            <img
              className="chip"
              src={chip}
              alt="Chip"
              height={50}
              width={50}
            />
            <img
              className="type"
              src={creditCardLogoByType(
                creditCardTypeByNumber(cardNumberValue)
              )}
              alt="Card Type"
              height={35}
              width={50}
            />
          </div>
          <div
            data-testid="credit-card-number"
            className={`credit-card-number ${currentlyFocused(cardNumberRef)}`}
            ref={cardNumberRef}
          >
            <div className={"credit-card-number-label"}>
              {displayCardNumber(cardNumber)}
            </div>
            <Alert size={30} message={error} backdrop />
            {isSubmitting ? (
              <Loader
                size={40}
                backdrop
                message="Submitting Credit Card Information"
              />
            ) : null}
          </div>
          <div className="card-holder-expiration">
            <div
              data-testid="card-holder"
              className={`card-holder ${currentlyFocused(cardHolderRef)}`}
              ref={cardHolderRef}
            >
              <span className="card-holder-label">Card Holder</span>
              <span className="card-holder-name">{cardHolder}</span>
            </div>
            <div
              className={`card-expiration ${currentlyFocused(cardDateRef)}`}
              ref={cardDateRef}
            >
              <span className="card-expiration-label">Expires</span>
              <span className="card-expiration-date">{`${cardMonth}/${cardYear}`}</span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="card-magnet"></div>
          <div className="cvv-container">
            <span className="card-cvv-label">CVV</span>
            <div data-testid="card-cvv" className="card-cvv">
              <span className="cvv" ref={cardCvvRef}>
                {cardCvv}
              </span>
            </div>
          </div>
          <div className="typ-img-container">
            <img
              className="card-back-type-img"
              src={creditCardLogoByType(
                creditCardTypeByNumber(cardNumberValue)
              )}
              alt="Card Type"
              height={35}
              width={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
