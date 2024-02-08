import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { creditCardLogoByType, creditCardTypeByNumber } from "../../utils/utils";
import "./CreditCard.scss";
import chip from "../../assets/chip.png";
import { subscribe, unsubscribe } from "../../utils/events";
import Loader from "../common/Loader";

interface CreditCardProps {
  cardNumberRef: React.RefObject<HTMLDivElement>;
  cardHolderRef: React.RefObject<HTMLDivElement>;
  cardMonthRef: React.RefObject<HTMLDivElement>;
  cardYearRef: React.RefObject<HTMLDivElement>;
  cardDate: React.RefObject<HTMLDivElement>;
  cardCvvRef: React.RefObject<HTMLDivElement>;
  focusedElm: React.RefObject<HTMLElement> | null;
  isFlipped: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumberRef,
  cardHolderRef,
  cardMonthRef,
  cardYearRef,
  cardCvvRef,
  focusedElm,
  isFlipped,
}) => {
  const card = useAppSelector((state) => state.card);
  const { cardNumber, cardHolder, cardMonth, cardYear, cardCvv, cardNumberValue } = card;
  const [focused, setFocused] = useState<HTMLElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
          <span className="character" key={`${char}-${i+1}`}>
            {char}
          </span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    subscribe('form-submit', (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsSubmitting(customEvent.detail?.isSubmitting)
    })

    if (focusedElm?.current) {
      setFocused(focusedElm.current);
    } else {
      setFocused(null);
    }
    console.log(isSubmitting)
    return (() => {
      unsubscribe('form-submit', (e: Event) => {
        const customEvent = e as CustomEvent;
        setIsSubmitting(customEvent.detail?.isSubmitting)
      });
    })
  }, [focusedElm, cardNumber, isSubmitting]);
  
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
        <div className="card-front">
          <div className="card-img-container">
            <img className="chip" src={chip} alt="Chip" />
            <img className="type" src={creditCardLogoByType(creditCardTypeByNumber(cardNumberValue))} alt="Card Type" />
          </div>
          <div
            data-testid="credit-card-number"
            className={`credit-card-number ${currentlyFocused(cardNumberRef)}`}
            ref={cardNumberRef}
          >
            <div className={"credit-card-number-label"}>
              {displayCardNumber(cardNumber)}
            </div>
            {isSubmitting ? <Loader size={60} backdrop />: null}
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
              className={`card-expiration ${currentlyFocused(
                cardMonthRef.current ? cardMonthRef : cardYearRef
              )}`}
              ref={cardMonthRef || cardYearRef}
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
            <img className="card-back-type-img" src={creditCardLogoByType(creditCardTypeByNumber(cardNumberValue))} alt="Card Type" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
