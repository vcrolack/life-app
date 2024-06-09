import { authSlice, checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../../fixtures/authFixtures";

describe('Testing on Auth Slice', () => {

  it('Should return an object with the initial state', () => {

    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);

  });

  it('Should realize the authentication', () => {

    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);

  });

  it('Should realize the logout without arguments', () => { 

    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: notAuthenticatedState.uid,
      email: notAuthenticatedState.email,
      displayName: notAuthenticatedState.displayName,
      photoURL: notAuthenticatedState.photoURL,
      errorMessage: undefined,
    });

  });

  it('Should realize the logout without arguments and shows an error', () => { 

    const errorMessage = 'An error occurred';

    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: notAuthenticatedState.uid,
      email: notAuthenticatedState.email,
      displayName: notAuthenticatedState.displayName,
      photoURL: notAuthenticatedState.photoURL,
      errorMessage: errorMessage,
    })


  });

  it('should change state to checking', () => {

    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
    
  });

})
