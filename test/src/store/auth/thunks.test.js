import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../../src/firebase/providers";
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../../src/store/auth";
import { clearNotesLogout } from "../../../../src/store/life/lifeSlice";
import { demoUser } from "../../../fixtures/authFixtures";

jest.mock("../../../../src/firebase/providers");

describe("Testing on AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("should invoke checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);

    // called with { type: 'auth/checkingCredentials', payload: undefined }
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  it("startGoogleSignIn should call checkcredentials and login", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it("startGoogleSignIn should call checkcredentials and logout error", async () => {
    const loginData = { ok: false, errorMessage: "Error login" };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  it("startLoginWithEmail should call checkcredentials and login - success", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it("startLoginWithEmail should call checkcredentials and login - error", async () => {
    const loginData = { ok: false, errorMessage: "Error login" };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it("startLogout should call logoutFirebase, clearNotesLogout and logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({}));
  });

  it("startCreatingUser with email and password should call checkcredentials and login - success", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });
});
