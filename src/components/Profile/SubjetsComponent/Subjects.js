import React from "react";
import styles from "../style.module.scss";
import { observer } from "mobx-react";
import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
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
import SingleSubject from "./SingleSubject";
import AddSubject from "./Forms/AddSubject";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddManySubjects from "./Forms/AddManySubjects";
import Popup from "../../Popup/Popup";

const Subjects = observer(() => {
  const { subjects } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  return (
    <div className={styles.subjects} style={{ width: "90%" }}>
      <h2>Przedmioty</h2>
      {subjects.loading ? (
        <LoadingBar />
      ) : subjects.error ? (
        <p>{subjects.error}</p>
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
                <TableCell>#</TableCell>
                <TableCell>Przedmiot</TableCell>
                <TableCell align="right">Akcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects?.data?.map((row, index) => (
                <SingleSubject key={`subject-${row.name}`} subject={row} index={index} />
              ))}
              <AddSubject subjectLength={subjects?.data?.length || 0} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isManyOpen && (
        <Popup
          title={"Dodaj wiele przedmiotów"}
          handleClose={() => setIsManyOpen(false)}
          isOpen={isManyOpen}
        >
          <AddManySubjects />
        </Popup>
      )}
    </div>
  );
});

export default Subjects;
