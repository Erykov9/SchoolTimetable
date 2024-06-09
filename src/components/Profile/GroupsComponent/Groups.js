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
import SingleGroup from "./SingleGroup";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Popup from "../../Popup/Popup";
import AddGroup from "./Forms/AddGroup";
import AddManyGroups from "./Forms/AddManyGroups";

const Groups = observer(() => {
  const { groups } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  return (
    <div style={{width: "90%"}}>
      <h2>Grupy</h2>
      {groups.loading ? (
        <LoadingBar />
      ) : groups.error ? (
        <p>{groups.error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 300}} aria-label="caption table">
            <caption>
              <Stack gap={1} flexDirection={"row"}>
                <Button color="secondary" startIcon={<ImportExportIcon />}>
                  WKLEJ Z EXCELA
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
                <TableCell>Grupa</TableCell>
                <TableCell>Klasa</TableCell>
                <TableCell align="right">Akcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.data.map((group, index) => (
                <SingleGroup key={`group-${group._id.$oid}`} group={group} index={index} />
              ))}
              <AddGroup groupLength={groups.data.length} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Popup
        isOpen={isManyOpen}
        handleClose={() => setIsManyOpen(false)}
        title={"Dodaj wiele grup"}
      >
        <AddManyGroups />
      </Popup>

    </div>
  );
});

export default Groups;
