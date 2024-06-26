import React, { useEffect, useState } from "react";
import { toJS } from "mobx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import AddLesson from "./AddLesson";
import ModalComponent from "../../../Modal/ModalComponent";
import { observer } from "mobx-react";

const SingleClassLessons = observer(({ singleClass, lessons }) => {
  const [classLessons, setClassLessons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const getClassLessons = (classId) => {
    const lessonsData = toJS(lessons.data);
    const classLessons = lessonsData
      .filter((lesson) => {
        return lesson.student_class_id?.$oid === classId;
      })
      .sort((a, b) => a.lessonType.name.localeCompare(b.lessonType.name));

    setClassLessons(classLessons);
    return classLessons;
  };

  useEffect(() => {
    getClassLessons(singleClass._id.$oid);
  }, [singleClass]);

  console.log(toJS(classLessons))
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Przedmiot</TableCell>
            <TableCell>Rozmiar lekcji</TableCell>
            <TableCell>Ilość lekcji w tyg.</TableCell>
            <TableCell>Nauczyciel</TableCell>
            <TableCell>Etykieta</TableCell>
            <TableCell>Grupy</TableCell>
            <TableCell>Dozwolone sale</TableCell>
            <TableCell>Akcja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
        {classLessons.map((row, index) => (
          <TableRow key={`singleClassLesson-${row._id.$oid}`}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.lessonType?.name}</TableCell>
            <TableCell>{row.size} godz.</TableCell>
            <TableCell>{row.amountPerWeek}</TableCell>
            <TableCell>{row.teacher?.name}</TableCell>
            <TableCell>{row.lessonLabel?.name || "Brak"}</TableCell>
            <TableCell>
              <Stack flexDirection={"row"} gap={1}>
                {row?.groupsDetails?.legnth === 0 ? "Brak dodanych grup" :row?.groupDetails?.map((group) => (
                  <Chip label={group?.name} key={`group-${group._id.$oid}`} />
                ))}
              </Stack>
            </TableCell>
            <TableCell>
              <Stack flexDirection={"row"} gap={1}  >
                {row?.allowedClassroomsDetails?.length === 0
                  ? "Nie dodano"
                  : row.allowedClassroomsDetails?.map((group) => (
                      <Chip label={group?.name} key={`group-${group._id.$oid}`}/>
                    ))}
              </Stack>
            </TableCell>
          </TableRow>
        ))}
        {isOpen && (
          <ModalComponent isOpen={isOpen} handleClose={handleClose}>
            <AddLesson singleClass={singleClass}/>
          </ModalComponent>
        )}
        <Button variant="contained" onClick={() => setIsOpen(true)} style={{margin: '10px'}}>
          Dodaj lekcję
        </Button>

      </Table>
    </TableContainer>
  );
});

export default SingleClassLessons;
