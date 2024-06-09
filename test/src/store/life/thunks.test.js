
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { firebaseDB } from "../../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../../src/store/life/lifeSlice";
import { startNewNote } from "../../../../src/store/life/thunks";

describe('Test on life thunks', () => {

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('startNewNote should create a new blank note', async () => {

    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid } })

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      title: '',
      body: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: [],
    }));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      title: '',
      body: '',
      id: expect.any(String),
      date: expect.any(Number),
      imageUrls: [],
    }));

    // Borrar de firebase
    const collectionRef = collection(firebaseDB, `${uid}/life/notes`);
    const docs  = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach(doc => {
      deletePromises.push( deleteDoc(doc.ref));
    }); 

    await Promise.all(deletePromises, );

  }, 20000);

})