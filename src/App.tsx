import CreditCardForm from "./components/form/CreditCardForm";
import "./App.scss";

function App() {
  return (
    <div className="App" data-testid="app">
      <main className="main">
          <CreditCardForm />
      </main>
    </div>
  );
}

export default App;
