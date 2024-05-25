import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./lifeSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers";
import { set } from "firebase/database";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    }

    const newDoc = await addDoc(collection(firebaseDB, `${uid}/life/notes`), newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));

  }
}

export const startLoadingNotes = () => {
  return async(dispatch, getState) => {

    const {uid} = getState().auth;
    if (!uid) throw new Error('Uid del usuario no existe');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));

  }
}

export const startSaveNote = () => {
  return async(dispatch, getState) => {
    dispatch(setSaving());
    
    const { uid } =getState().auth;
    const { active:note } = getState().life;

    const noteToFirestore = {...note}
    delete noteToFirestore.id;

    const firestoreDoc = doc(firebaseDB, `${uid}/life/notes/${note.id}`);
    await setDoc(firestoreDoc, noteToFirestore)

    dispatch(updateNote(note));

  }
}

export const startUploadingFiles = (files = []) => {
  return async(dispatch, getState) => {
    dispatch( setSaving() );
  
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    const {uid} = getState().auth;
    const {active:note} = getState().life;

    const firestoreDoc = doc(firebaseDB, `${uid}/life/notes/${note.id}`);
    await deleteDoc(firestoreDoc);

    dispatch(deleteNoteById(note.id));
  }
}
