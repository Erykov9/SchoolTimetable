import React from "react";
import {
  Button,
  TextField,
  Stack,
  TableRow,
  TableCell,
  Divider,
  Tab,
  Table,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import CustomAlert from "../../../Alert/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

const AddLesson = ({ index }) => {
  const initialValues = {
    lessonName: "",
    lessonSize: 1,
    lessonAmountPerWeek: 1,
    lessonTeacher: "",
    lessonLabel: "",
    lessonGroups: [],
  };

  const initialErrors = {
    lessonName: false,
    lessonSize: false,
    lessonAmountPerWeek: false,
    lessonTeacher: false,
    lessonLabel: false,
    lessonGroups: false,
  };

  const [lesson, setLesson] = useState(initialValues);
  const [error, setError] = useState(initialErrors);

  const handleAdd = () => {
    console.log("hi");
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={lesson.lessonName}
            id="new_subject"
            label="Dodaj przedmiot"
            onChange={(e) =>
              setLesson({ ...lesson, lessonName: e.target.value })
            }
            error={error.lessonName}
          ></TextField>
          {error.lessonName && (
            <CustomAlert status={"error"} message={error.lessonName} />
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <TextField
          value={lesson.lessonSize}
          id="new_size"
          label="Rozmiar lekcji"
          onChange={(e) => setLesson({ ...lesson, lessonSize: e.target.value })}
          error={error.lessonSize}
        ></TextField>
        {error.lessonSize && (
          <CustomAlert status={"error"} message={error.lessonSize} />
        )}
      </TableCell>
      <TableCell>
        <Select
          value={lesson.lessonAmountPerWeek}
          id="new_amount"
          label="Ilość lekcji w tyg."
          onChange={(e) =>
            setLesson({ ...lesson, lessonAmountPerWeek: e.target.value })
          }
          error={!!error.lessonAmountPerWeek}
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {error.lessonAmountPerWeek && (
          <CustomAlert status={"error"} message={error.lessonAmountPerWeek} />
        )}
      </TableCell>
      <TableCell>
        <TextField
          value={lesson.lessonTeacher}
          id="new_teacher"
          label="Nauczyciel"
          onChange={(e) =>
            setLesson({ ...lesson, lessonTeacher: e.target.value })
          }
          error={error.lessonTeacher}
        ></TextField>
        {error.lessonTeacher && (
          <CustomAlert status={"error"} message={error.lessonTeacher} />
        )}
      </TableCell>
      <TableCell>
        <TextField
          value={lesson.lessonLabel}
          id="new_label"
          label="Etykieta"
          onChange={(e) =>
            setLesson({ ...lesson, lessonLabel: e.target.value })
          }
          error={error.lessonLabel}
        ></TextField>
        {error.lessonLabel && (
          <CustomAlert status={"error"} message={error.lessonLabel} />
        )}
      </TableCell>
      <TableCell>
        <TextField
          value={lesson.lessonGroups}
          id="new_groups"
          label="Grupy"
          onChange={(e) =>
            setLesson({ ...lesson, lessonGroups: e.target.value })
          }
          error={error.lessonGroups}
        ></TextField>
        {error.lessonGroups && (
          <CustomAlert status={"error"} message={error.lessonGroups} />
        )}
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              setLesson("");
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

export default AddLesson;
