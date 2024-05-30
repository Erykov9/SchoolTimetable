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
  Divider
} from "@mui/material";
import { useState } from "react";
import AddClassroom from "./Forms/AddClassroom";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Popup from "../../Popup/Popup";
import AddManyClassrooms from "./Forms/AddManyClassrooms";
import SingleClassroom from "./SingleClassroom";

const Classrooms = observer(() => {
  const { classRooms } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  return (
    <div style={{ width: "90%" }}>
      <h2>Klasy</h2>
      {classRooms.loading ? (
        <LoadingBar />
      ) : classRooms.error ? (
        <p>{classRooms.error}</p>
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
                <TableCell>Nr/Nazwa sali</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classRooms?.data?.map((row, index) => (
                <SingleClassroom classroom={row} index={index}/>
              ))}
              <AddClassroom classroomLength={classRooms?.data?.length} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isManyOpen && (
        <Popup
          title="Dodaj wiele klas"
          isOpen={isManyOpen}
          handleClose={() => setIsManyOpen(false)}
          children={<AddManyClassrooms />}
        />
      )}
    </div>
  );
});

export default Classrooms;
