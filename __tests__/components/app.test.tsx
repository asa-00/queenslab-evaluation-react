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
  const cardHolderInput = screen.getByTestId("form-card-holder-input");
  const cardHolder = screen.getByTestId("card-holder");
  const cvvInput = screen.getByTestId("form-cvv-input");
  const formSubmitButton = screen.getByTestId("form-submit-button");

  return {
    cardNumberInput,
    cardNumber,
    cardHolderInput,
    cardHolder,
    cvvInput,
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
});
