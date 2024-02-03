import { useState, useRef, useCallback, useEffect } from "react";
import CreditCard from "./components/credit-card/CreditCard";
import Form from "./components/form/Form";
import "./App.scss";
interface CardElementsRef {
  [key: string]: React.RefObject<HTMLDivElement>;
}

function App() {
  const [focusedElement, setFocusedElement] = useState<React.RefObject<HTMLElement> | null>(null);
  const [focusedInputName, setFocusedInputName] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const cardElementsRef: CardElementsRef = {
    cardNumber: useRef<HTMLDivElement>(null),
    cardHolder: useRef<HTMLDivElement>(null),
    cardDate: useRef<HTMLDivElement>(null),
    cardCvv: useRef<HTMLDivElement>(null),
  };

  const handleCardInputFocus = ({target}: {target: EventTarget | null}): void => {
    const {name} = target as HTMLInputElement;
    const refByName = cardElementsRef[name];
    setFocusedInputName(name);
    if (name === 'cardCvv') {
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

  useEffect(() => {
  }, [focusedInputName]); 

  return (
    <div className="App" data-testid="app">
      <div className="container">
        <CreditCard
          isFlipped={isFlipped}
          focusedElm={focusedElement}
          cardNumberRef={cardElementsRef.cardNumber}
          cardHolderRef={cardElementsRef.cardHolder}
          cardDateRef={cardElementsRef.cardDate}
          cardCvvRef={cardElementsRef.cardCvv}
        />
        <div className="form-container">
          <Form
            onCardInputFocus={handleCardInputFocus} 
            onCardInputBlur={handleCardInputBlur}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
