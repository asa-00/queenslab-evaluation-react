import CreditCardForm from "./components/form/CreditCardForm";
import "./App.scss";
import { useState } from "react";

function App() {
  const [isApiError, setIsApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleToSimulateApiError = () => {
    setIsApiError(!isApiError);
  };

  const toggleToSimulateLoading = () => {
    setIsLoading(!isLoading);
  };
  
  return (
    <div className="App" data-testid="app">
      <main className="main">
        <CreditCardForm isApiError={isApiError} isLoading={isLoading} />
        <div>
          <p className="slider-title">Simulate api error</p>
          <label className="switch">
            <input type="checkbox" onChange={toggleToSimulateApiError}></input>
            <span className="slider round"></span>
          </label>
          <p className="slider-title">Simulate loading</p>
          <label className="switch">
            <input type="checkbox" onChange={toggleToSimulateLoading}></input>
            <span className="slider round"></span>
          </label>
        </div>
      </main>
    </div>
  );
}

export default App;
