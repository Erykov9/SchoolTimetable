import React from "react";
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import RefreshIcon from "@mui/icons-material/Refresh";
import { observer } from "mobx-react";

const AddClass = observer(({ classesLength }) => {
  const [className, setClassName] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async () => {
    setError(false);
    if (className.length === 0 || className.trim().length === 0) {
      setError("Nazwa klasy nie może być pusta");
      return console.log("forbidden");
    }
    
    const response = await SchoolInfoStore.addClass({name: className});
    if(response?.error) {
      console.log(className)
      return setError(response.errorMessage);
    }

    setClassName("");
    return;
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {classesLength + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={className}
            id="new_class"
            label="Dodaj klasę"
            onChange={(e) => setClassName(e.target.value)}
            error={error}
          ></TextField>
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button onClick={() => setClassName("")} sx={{color: 'grey'}}><RefreshIcon/></Button>
          <Divider flexItem orientation="vertical"/>
          <Button onClick={handleAdd}>
            <AddIcon />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
});

export default AddClass;
