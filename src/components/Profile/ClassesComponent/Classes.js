import React from "react";
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
import Popup from "../../Popup/Popup";
import { useState } from "react";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddManyClasses from "./Forms/AddManyClasses";
import SingleClass from "./SingleClass";
import AddClass from "./Forms/AddClass";

const Classes = observer(() => {
  const { classes } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  const handleDelete = (classId) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tę klasę?');
    if (confirmDelete) {
      SchoolInfoStore.deleteClass(classId);
    }
  };

  return (
    <div style={{ width: "90%" }}>
      <h2>Lista klas</h2>
      {classes.loading ? (
        <LoadingBar />
      ) : classes.error ? (
        <p>{classes.error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <caption>
              <Stack gap={1} flexDirection={"row"}>
                <Button color="secondary" startIcon={<ImportExportIcon/>}>Zaimportuj</Button>
                <Divider orientation="vertical" flexItem />
                <Button color="warning" startIcon={<LibraryAddIcon/>} onClick={() => setIsManyOpen(true)}>Dodaj wiele</Button>
              </Stack>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell >Lp.</TableCell>
                <TableCell >Klasa</TableCell>
                <TableCell align="right" width={250}>Akcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes?.data?.map((row, index) => (
                <SingleClass key={row.name} schoolClass={row} index={index} handleDelete={handleDelete} />
              ))}
              <AddClass classesLength={classes.data.length} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isManyOpen && (<Popup title="Dodaj wiele klas" handleClose={() => setIsManyOpen(false)} isOpen={isManyOpen}><AddManyClasses/></Popup>)}
    </div>
  );
});

export default Classes;
