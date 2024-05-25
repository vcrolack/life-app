import { collection, getDocs, query } from "firebase/firestore";
import { firebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('Uid del usuario no existe');

  const notesSnap = await getDocs(query(collection(firebaseDB, `${uid}/life/notes`)));
  const notes = [];

  notesSnap.forEach(sonSnap => {
    notes.push({
      id: sonSnap.id,
      ...sonSnap.data(),
    });
  });

  return notes;
}
