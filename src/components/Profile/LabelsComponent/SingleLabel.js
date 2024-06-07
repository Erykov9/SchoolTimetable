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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

import SchoolInfoStore from "../../../mobx/SchoolInfoStore";

const SingleLabel = ({ label, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [labelData, setLabelData] = useState({
    name: label?.name,
  });
  const [error, setError] = useState(false);

  const onSubmit = async () => {
    setError(false);
    if (labelData.name.length === 0 || labelData.name.trim().length === 0) {
      setError("Nazwa etykiety nie może być pusta");
      return;
    }

    const response = await SchoolInfoStore.editItem(
      { ...label, name: labelData.name },
      "labels",
      "etykieta",
      "lessonLabel"
    );
    if (response?.error) {
      return setError(response.error);
    }

    setIsEdit(false);
    return;
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async (id) => {
    setError(false);
    const response = await SchoolInfoStore.deleteItem(id, "labels", "lessonLabel");

    if (response?.error) {
      return setError(`${response.errorMessage}. Błąd: ${response.status}`);
    }
    setIsEdit(false);
  };

  return (
    <TableRow key={label.name} height={isEdit ? 90 : 60}>
      <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
        {index + 1}.
      </TableCell>
      <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
        {isEdit ? (
          <Stack
            justifyContent={"flexStart"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={2}
          >
            <HelpIcon sx={{ color: "grey" }} />
            <TextField
              value={labelData?.name}
              id={label.name}
              label="Edytuj etykietę"
              onChange={(e) => setLabelData({ name: e.target.value })}
              error={error}
            ></TextField>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        ) : (
          <p>{labelData.name}</p>
        )}
      </TableCell>
      <TableCell align="right" sx={{ padding: "5px 15px" }}>
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          {!isEdit ? (
            <Button startIcon={<EditIcon />} onClick={editHandler} />
          ) : (
            <>
              <Button sx={{ color: "grey" }} onClick={editHandler}>
                <RefreshIcon />
              </Button>
              <Divider orientation="vertical" flexItem />

              <Button color="primary" onClick={onSubmit}>
                <CheckIcon />
              </Button>

              <Divider orientation="vertical" flexItem />

              <Button color="error" onClick={() => handleDelete(label._id)}>
                <DeleteIcon />
              </Button>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SingleLabel;
