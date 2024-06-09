import React from "react";
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  Divider,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
import { toJS } from "mobx";

const SingleGroup = ({ group, index }) => {
  const { classes } = SchoolInfoStore;
  const [groupClass] = classes?.data?.filter(
    (item) => item._id.$oid === group?.student_class_id?.$oid
  );
  const [isEdit, setIsEdit] = useState(false);
  const [groupData, setGroupData] = useState({
    name: group?.name,
  });
  const [error, setError] = useState(false);
  const [groupClassData, setGroupClassData] = useState(groupClass);

  const handleGroupChange = (e) => {
    const toFind = e.target.value;
    const found = classes.data.find((item) => item.name === toFind);
    setGroupClassData(found);
  };

  const onSubmit = async () => {
    setError(false);
    if (groupData.name.length === 0 || groupData.name.trim().length === 0) {
      setError("Nazwa grupy nie może być pusta");
      return;
    }

    const dataToEdit = {
      ...group,
      name: groupData.name,
      student_class_id: toJS(groupClassData?._id) || null,
    };

    const response = await SchoolInfoStore.editItem(
      dataToEdit,
      'groups',
      'grupa',
      'classGroup'
    );
    if (response?.error) {
      return setError(response.errorMessage);
    }

    setIsEdit(false);
    return;
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async (id) => {
    setError(false);
    const response = await SchoolInfoStore.deleteItem(
      id,
      "groups",
      "classGroup"
    );

    if (response?.error) {
      return setError(`${response.errorMessage}. Błąd: ${response.status}`);
    }
    setIsEdit(false);
    return;
  };

  return (
    <TableRow key={group.name} height={isEdit ? 90 : 60}>
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
              value={groupData?.name}
              id={group.name}
              label="Edytuj grupę"
              onChange={(e) => setGroupData({ name: e.target.value })}
              error={error}
            ></TextField>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        ) : (
          <p>{groupData.name}</p>
        )}
      </TableCell>
      <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
        {isEdit ? (
          <Select
            id="select-class"
            label="Wybór klasy"
            value={groupClassData.name}
            onChange={handleGroupChange}
          >
            {classes?.data?.map((classGroup) => (
              <MenuItem
                key={`selectClassGroup-${classGroup._id.$oid}`}
                value={classGroup.name}
              >
                {classGroup.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <p>{groupClass.name}</p>
        )}
      </TableCell>
      <TableCell align="right" sx={{ padding: "5px 15px" }}>
        <Stack direction="row" gap={1} justifyContent={"flex-end"}>
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
              <Button color="error" onClick={() => handleDelete(group._id)}>
                <DeleteIcon />
              </Button>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SingleGroup;
