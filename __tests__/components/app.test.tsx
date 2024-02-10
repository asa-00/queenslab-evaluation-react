import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({ card: {
    cardNumber: "#### #### #### ####",
    cardHolder: "John Doe",
    cardMonth: "MM",
    cardYear: "YY",
    cardCvv: "***",
} }); // Pass initial state if needed

const app = <Provider store={store}><App /></Provider>

describe('App component', () => {
  xit('renders the App component correctly', () => {
    const { getByTestId } = render(app);
    const appElement = getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  xit('handles card input focus correctly', () => {
    const { getByTestId } = render(app);
    
    // Simulate focusing on card number input
    const cardNumberInput = getByTestId('card-number-input');
    const cardNumber = getByTestId('credit-card-number');
    fireEvent.focus(cardNumberInput);
    expect(cardNumber).toHaveClass('focused');

    // Simulate focusing on CVV input
    const cardHolderInput = getByTestId('form-card-holder-input');
    const cardHolder = getByTestId('card-holder');
    fireEvent.focus(cardHolderInput);
    expect(cardHolder).toHaveClass('focused');
  });

  xit('handles card input blur correctly', () => {
    const { getByTestId } = render(app);
    
    // Simulate focusing and then blurring card number input
    const cardNumberInput = getByTestId('card-number-input');
    fireEvent.focus(cardNumberInput);
    fireEvent.blur(cardNumberInput);
    // Ensure that the class 'focused' is removed
    expect(cardNumberInput).not.toHaveClass('focused');

    // Simulate focusing and then blurring CVV input
    const cvvInput = getByTestId('form-cvv-input');
    fireEvent.focus(cvvInput);
    fireEvent.blur(cvvInput);
    // Ensure that the class 'focused' is removed
    expect(cvvInput).not.toHaveClass('focused');
  });
});
