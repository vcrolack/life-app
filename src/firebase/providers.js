import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import { firebaseAuth } from './config';

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      //user info
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch(error) {
    return {
      ok: false,
    }
  }

}

export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {

  try {

    const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password );
    const { uid, photoURL } = resp.user;

    await updateProfile( firebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    }

  } catch(error) {
    // en este punto se hacen las validaciones del tipo de error.
    return { ok: false, errorMessage: error.message };
  }
 
}

export const loginWithEmailPassword = async ({ email, password }) => {
  // signInWithEmailPassword 
  try {
    const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const {uid, photoURL, displayName} = resp.user

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch(error) {
    return {ok: false, errorMessage: error.message};
  }
}
 
export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
}