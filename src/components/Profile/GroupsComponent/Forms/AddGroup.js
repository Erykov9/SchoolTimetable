import React from "react";
import {
  Button,
  TextField,
  Stack,
  TableRow,
  TableCell,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useState } from "react";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import CustomAlert from "../../../Alert/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

const AddGroup = ({ groupLength }) => {
  const { classes } = SchoolInfoStore;

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(false);
  const [groupClass, setGroupClass] = useState(classes.data[0] || { name: ""});

  const handleGroupChange = (e) => {
    const toFind = e.target.value;
    const found = classes.data.find((item) => item.name === toFind);
    setGroupClass(found);
  };

  const handleAdd = async () => {
    setError(false);
    if (groupName.length === 0 || groupName.trim().length === 0) {
      setError("Nazwa grupy nie może być pusta");
      return console.log("forbidden");
    }

    const response = await SchoolInfoStore.addItem(
      { name: groupName, student_class_id: groupClass?._id || null},
      "groups",
      "grupa",
      "classGroup"
    );
    if (response?.error) {
      return setError(response.errorMessage);
    }

    setGroupName("");
    return;
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {groupLength + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={groupName}
            id="new_group"
            label="Dodaj grupę"
            onChange={(e) => setGroupName(e.target.value)}
            error={error}
          ></TextField>
          {error && <CustomAlert status={"error"} message={error} />}
        </Stack>
      </TableCell>
      <TableCell>
        <FormControl>
        <InputLabel id="select-class">Klasa</InputLabel>
        <Select id="select-class" label="Wybór klasy" value={groupClass.name} onChange={handleGroupChange}>
          {classes?.data?.map((classGroup) => (
            <MenuItem key={`selectClassGroup-${classGroup._id.$oid}`} value={classGroup.name}>
              {classGroup.name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              setGroupName("");
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

export default AddGroup;
