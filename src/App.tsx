import { useAppSelector } from "./store/store";
import CreditCardForm from "./components/form/CreditCardForm";
import { Card } from "./store/redux/features/cardSlice";
import "./App.scss";
import { useState } from "react";
import DebugMenu from "./DebugMenu";

function App() {
  const [isApiError, setIsApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayState, setDisplayState] = useState(false);
  const card: Card = useAppSelector((state) => state.card);

  const toggleToSimulateApiError = () => {
    setIsApiError(!isApiError);
  };

  const toggleToSimulateLoading = () => {
    setIsLoading(!isLoading);
  };

  const toggleDisplayState = () => {
    setDisplayState(!displayState);
  };

  return (
    <div className="App" data-testid="app">
      <main className="main">
        <CreditCardForm isApiError={isApiError} isLoading={isLoading} />
        <DebugMenu
          toggleToSimulateApiError={toggleToSimulateApiError}
          toggleToSimulateLoading={toggleToSimulateLoading}
          toggleDisplayState={toggleDisplayState}
          displayState={displayState}
          card={card}
        />
      </main>
    </div>
  );
}

export default App;
