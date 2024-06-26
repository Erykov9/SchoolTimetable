import React from "react";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
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
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import styles from "./AddLesson.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddLesson = observer(({ singleClass }) => {
  const { classRooms, subjects, teachers, labels } = SchoolInfoStore;
  const [subject, setSubject] = useState(toJS(subjects.data[0]));
  const [lessonLength, setLessonLength] = useState(1);
  const [amountPerWeek, setAmountPerWeek] = useState(1);
  const [teacher, setTeacher] = useState(toJS(teachers.data[0]));
  const [label, setLabel] = useState(null);
  const [allowedClassrooms, setAllowedClassrooms] = useState([]);
  const [groups, setGroups] = useState([]);
  console.log(toJS(singleClass))

  const [error, setError] = useState(false);

  const handleAdd = async () => {
    const data = {
      lesson_type_id: subject._id,
      size: lessonLength,
      amountPerWeek: amountPerWeek,
      teacher_id: teacher._id,
      lesson_label_id: label?._id || null,
      allowedClassrooms: allowedClassrooms.map((classroom) => classroom._id),
      groups: groups.map((group) => group._id),
      student_class_id: singleClass._id,
    };

    const dataForMobx = {
      lessonType: subject,
      size: lessonLength,
      amountPerWeek: amountPerWeek,
      teacher: teacher,
      lessonLabel: label,
      allowedClassrooms: allowedClassrooms,
      groups: groups,
    };

    const response = await SchoolInfoStore.addLesson(data, dataForMobx);

    console.log(response);
  };

  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    console.log(value)

    setAllowedClassrooms(typeof value === "string" ? toJS(value.split(",")) : toJS(value));
  };

  const handleSelectGroup = (event) => {
    const value = event.target.value;

    setGroups(typeof value === "string" ? toJS(value.split(",")) : toJS(value));
  };

  return (
    <div className={styles.addLesson}>
      <h3>Dodaj lekcję</h3>
      <Stack direction="column" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="subject">Przedmiot</InputLabel>
          <Select
            labelId="subject"
            id="subject"
            value={subject?._id?.$oid || ""}
            label="Przedmiot"
            onChange={(e) => {
              const selectedSubject = subjects.data.find(
                (sub) => sub._id.$oid === e.target.value
              );
              setSubject(toJS(selectedSubject));
            }}
            MenuProps={MenuProps}
          >
            {subjects.data.map((subject) => (
              <MenuItem key={subject._id.$oid} value={subject._id.$oid}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="lessonLength">Rozmiar lekcji</InputLabel>
          <Select
            labelId="lessonLength"
            id="lessonLength"
            value={lessonLength}
            label="Rozmiar lekcji"
            onChange={(e) => setLessonLength(e.target.value)}
            MenuProps={MenuProps}
          >
            {[1, 2, 3, 4, 5].map((lessonLength) => (
              <MenuItem
                key={`${lessonLength}-lessonLength`}
                value={lessonLength}
              >
                {lessonLength}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="amountPerWeek">Ilość lekcji w tygodniu</InputLabel>
          <Select
            labelId="amountPerWeek"
            id="amountPerWeek"
            value={amountPerWeek}
            label="Ilość lekcji w tygodniu"
            onChange={(e) => setAmountPerWeek(e.target.value)}
            MenuProps={MenuProps}
          >
            {[1, 2, 3, 4, 5].map((amountPerWeek) => (
              <MenuItem
                key={`${amountPerWeek}-amountPerWeek`}
                value={amountPerWeek}
              >
                {amountPerWeek}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="teacher">Nauczyciel</InputLabel>
          <Select
            labelId="teacher"
            id="teacher"
            value={teacher?._id?.$oid || ""}
            label="Nauczyciel"
            onChange={(e) => {
              const selectedTeacher = teachers.data.find(
                (teacher) => teacher._id.$oid === e.target.value
              );
              setTeacher(toJS(selectedTeacher));
            }}
            MenuProps={MenuProps}
          >
            {teachers.data.map((teacher) => (
              <MenuItem key={teacher._id.$oid} value={teacher._id.$oid}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="label">Etykieta (opcionalnie)</InputLabel>
          <Select
            labelId="label"
            id="label"
            value={label?._id?.$oid || ""}
            label="Etykieta (opcionalnie)"
            onChange={(e) => {
              const selectedLabel = labels.data.find(
                (label) => label._id.$oid === e.target.value
              );
              setLabel(toJS(selectedLabel));
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value={null}>
            {"BRAK"}
            </MenuItem>
            {labels.data.map((label) => (
              <MenuItem key={label._id.$oid} value={label._id.$oid}>
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="allowedClassrooms">Dozwolone sale</InputLabel>
          <Select
            labelId="allowedClassrooms"
            id="allowedClassrooms"
            value={allowedClassrooms}
            label="Dozwolone sale"
            onChange={handleSelectCheckbox}
            MenuProps={MenuProps}
            input={<OutlinedInput label="Dozwolone sale" />}
            renderValue={(selected) =>
              selected.map((item) => item.name).join(", ")
            }
            multiple
          >
            {toJS(classRooms.data).map((classRoom) => (
              <MenuItem key={classRoom._id.$oid} value={classRoom}>
                <Checkbox
                  checked={allowedClassrooms.some(
                    (item) => item._id.$oid === classRoom._id.$oid
                  )}
                />
                <ListItemText primary={classRoom.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="groups">Grupy</InputLabel>
          <Select
            labelId="groups"
            id="groups"
            value={groups}
            label="Grupy"
            onChange={handleSelectGroup}
            MenuProps={MenuProps}
            input={<OutlinedInput label="Grupy" />}
            renderValue={(selected) =>
              selected.map((item) => item.name).join(", ")
            }
            multiple
          >
            {toJS(singleClass.groups).map((group) => (
              <MenuItem key={group._id.$oid} value={group}>
                <Checkbox
                  checked={groups.some(
                    (item) => item._id.$oid === group._id.$oid
                  )}
                />
                <ListItemText primary={group.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleAdd}>Dodaj</Button>
      </Stack>
    </div>
  );
});

export default AddLesson;
