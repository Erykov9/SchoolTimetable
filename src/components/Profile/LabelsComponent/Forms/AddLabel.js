import React from "react";
import {
  Button,
  TextField,
  Stack,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";
import { useState } from "react";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import CustomAlert from "../../../Alert/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

const AddLabel = ({ lessonLabelLength }) => {
  const [lessonLabelName, setLessonLabelName] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async () => {
    setError(false);
    if (lessonLabelName.length === 0 || lessonLabelName.trim().length === 0) {
      setError("Nazwa etykiety nie może być pusta");
      return console.log("forbidden");
    }

    const response = await SchoolInfoStore.addLabel({ name: lessonLabelName });
    if (response?.error) {
      return setError(response.errorMessage);
    }

    setLessonLabelName("");
    return;
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {lessonLabelLength + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={lessonLabelName}
            id="new_label"
            label="Dodaj klasę"
            onChange={(e) => setLessonLabelName(e.target.value)}
            error={error}
          ></TextField>
          {error && <CustomAlert status={"error"} message={error} />}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              setLessonLabelName("");
              setError(false);
            }}
            sx={{ color: "grey" }}
          >
            <RefreshIcon />
          </Button>
          <Divider flexItem orientation="vertical" />
          <Button onClick={handleAdd}>
            <AddIcon />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default AddLabel;
