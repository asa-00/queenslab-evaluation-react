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

  // Function to toggle api error on form submit for debug perpose
  const toggleToSimulateApiError = () => {
    setIsApiError(!isApiError);
  };

   // Function to toggle loding on form for debug perpose
  const toggleToSimulateLoading = () => {
    setIsLoading(!isLoading);
  };

   // Function to toggle and diplay content of redux state for credit card for debug perpose
  const toggleDisplayState = () => {
    setDisplayState(!displayState);
  };

  return (
    <div className="App" data-testid="app">
      <main className="main">
        {/* isApiError and isLoading passed to CreditCardForm for debug menu useage. 
        This props can be remove when application is ready fro production */}
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
