import React from "react";
import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import LoadingBar from "../../LoadingBar/LoadingBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Popup from "../../Popup/Popup";
import SingleTeacher from "./SingleTeacher";
import AddTeacher from "./Forms/AddTeacher";
import AddManyTeachers from "./Forms/AddManyTeachers";

const Teachers = observer(() => {
  const { teachers } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  return (
    <div style={{ width: "90%" }}>
      <h2>Nauczyciele</h2>
      {teachers.loading ? (
        <LoadingBar />
      ) : teachers.error ? (
        <p>{teachers.error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <caption>
              <Stack gap={1} flexDirection={"row"}>
                <Button color="secondary" startIcon={<ImportExportIcon />}>
                  Zaimportuj
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button
                  color="warning"
                  startIcon={<LibraryAddIcon />}
                  onClick={() => setIsManyOpen(true)}
                >
                  Dodaj wiele
                </Button>
              </Stack>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>Lp.</TableCell>
                <TableCell>Imię i nazwisko</TableCell>
                <TableCell align="right">Akcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers?.data?.map((row, index) => (
                <SingleTeacher teacher={row} index={index} />
              ))}
              <AddTeacher teacherLength={teachers.data.length} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isManyOpen && (
        <Popup
          title="Dodaj wielu nauczycieli"
          handleClose={() => setIsManyOpen(false)}
          isOpen={isManyOpen}
        ><AddManyTeachers/></Popup>
      )}
    </div>
  );
});

export default Teachers;
