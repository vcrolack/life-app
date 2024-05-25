import { useDispatch, useSelector } from "react-redux"

import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { LifeLayout } from "../layout/LifeLayout"
import { NoteView, NothingSelectedView } from "../views"
import { startNewNote } from "../../store/life"


export const LifePage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.life);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <LifeLayout>

      { (active !== null)
       ? <NoteView />
       : <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity:0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined />
      </IconButton>
    </LifeLayout>
  )
}
