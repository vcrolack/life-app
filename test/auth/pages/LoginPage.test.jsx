import { MemoryRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({email, password})
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  }
});

describe("Testing on LoginPage", () => {

  beforeEach(() => jest.clearAllMocks() );

  it("Should render the component", () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  it("Google button should call startGoogleSignIn", () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByLabelText("google-btn");

    fireEvent.click(googleButton);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
    
  });

  it("Submit should call startLoginWithEmailPassword", () => {

    const email = "victorolack@gmail.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: 'email', value: email}});

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, { target: { name: 'password', value: password}});

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({ email, password });

  });

});
