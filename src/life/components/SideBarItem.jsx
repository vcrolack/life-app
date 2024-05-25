import React, { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/life";

export const SideBarItem = ({ title='', body, id, date, imageUrls=[] }) => {

  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);

  

  const onClickNote = () => {
    dispatch(setActiveNote({id, title, body, date, imageUrls}));
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container display="flex" flexDirection="column">
          <ListItemText primary={newTitle} />
          <ListItemText
            secondary={body}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
