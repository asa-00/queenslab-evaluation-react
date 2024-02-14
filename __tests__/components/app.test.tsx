import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  /* within, */ screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  card: {
    cardNumber: "#### #### #### ####",
    cardHolder: "John Doe",
    cardMonth: "MM",
    cardYear: "YY",
    cardCvv: "***",
  },
}); // Pass initial state if needed

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const setup = () => {
  const utils = render(app);
  const cardNumberInput =
    screen.getByTestId<HTMLInputElement>("card-number-input");
  const cardNumber = screen.getByTestId("credit-card-number");
  const cardHolderInput = screen.getByTestId<HTMLInputElement>("form-card-holder-input");
  const cardHolder = screen.getByTestId<HTMLInputElement>("card-holder");
  const cvvInput = screen.getByTestId<HTMLInputElement>("form-cvv-input");
  const monthSelect = screen.getByTestId('form-card-month-select') as HTMLSelectElement;
  const yearSelect = screen.getByTestId('form-card-year-select') as HTMLSelectElement;
  const formSubmitButton = screen.getByTestId<HTMLInputElement>("form-submit-button");

  return {
    cardNumberInput,
    cardNumber,
    cardHolderInput,
    cardHolder,
    cvvInput,
    monthSelect,
    yearSelect,
    formSubmitButton,
    ...utils,
  };
};

describe("App component", () => {
  it("renders the App component correctly", () => {
    const { getByTestId } = render(app);
    const appElement = getByTestId("app");
    expect(appElement).toBeInTheDocument();
  });

  it("handles card input focus correctly", () => {
    const { cardNumberInput, cardNumber, cardHolderInput, cardHolder } =
      setup();

    // Simulate focusing on card number input
    fireEvent.focus(cardNumberInput);
    expect(cardNumber).toHaveClass("focused");

    // Simulate focusing on CVV input
    fireEvent.focus(cardHolderInput);
    expect(cardHolder).toHaveClass("focused");
  });

  it("handles card input blur correctly", () => {
    const { cardNumberInput, cvvInput } = setup();

    // Simulate focusing and then blurring card number input
    fireEvent.focus(cardNumberInput);
    fireEvent.blur(cardNumberInput);
    // Ensure that the class "focused" is removed
    expect(cardNumberInput).not.toHaveClass("focused");

    // Simulate focusing and then blurring CVV input
    fireEvent.focus(cvvInput);
    fireEvent.blur(cvvInput);
    // Ensure that the class "focused" is removed
    expect(cvvInput).not.toHaveClass("focused");
  });

  it("handles credit card number input change correctly", () => {
    const { cardNumberInput, cardNumber } = setup();
    expect(cardNumberInput.value).toBe("");
    expect(cardNumber).toHaveTextContent("#### #### #### ####");

    fireEvent.focus(cardNumberInput);
    expect(cardNumber).toHaveClass("focused");

    fireEvent.change(cardNumberInput, {
      target: { value: "5555555555555555" },
    });
    expect(cardNumberInput.value).toBe("5555555555555555");
  });

  it("handles credit card number validation errors correctly", async () => {
    const { cardNumberInput, formSubmitButton } = setup();

    fireEvent.focus(cardNumberInput);
    fireEvent.change(cardNumberInput, { target: { value: "" } });

    expect(cardNumberInput.value).toBe("");

    userEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId("form-feedback-card-number-error")
      ).toBeInTheDocument();
    });
  });

  it("handles form submit", async () => {
    const { cardNumberInput, cardHolderInput, monthSelect, yearSelect, cvvInput, formSubmitButton } = setup();
    
    fireEvent.change(cardNumberInput, {
      target: { value: "5555555555555555" },
    });
    
    fireEvent.change(cardHolderInput, {
      target: { value: "John Doe" },
    });
    
    fireEvent.change(monthSelect, {
      target: { value: 2 },
    });

    fireEvent.change(cvvInput, {
      target: { value: "555" },
    });

    userEvent.selectOptions(monthSelect, "01");
    userEvent.selectOptions(yearSelect, "2024");
  
    expect(cardNumberInput.value).toBe("5555555555555555");
    expect(cardHolderInput.value).toBe("John Doe");
    await waitFor(() => { expect(monthSelect.value).toBe('01');});
    await waitFor(() => { expect(yearSelect.value).toBe('2024');});
    expect(cvvInput.value).toBe("555");

    userEvent.click(formSubmitButton);
    await waitFor(() => expect(cardNumberInput.value).toBe(""), { timeout: 2000 });
  });
});
