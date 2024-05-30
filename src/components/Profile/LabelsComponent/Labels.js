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
import SingleLabel from "./SingleLabel";
import AddLabel from "./Forms/AddLabel";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddManyLabels from "./Forms/AddManyLabels";
import Popup from "../../Popup/Popup";

const Labels = observer(() => {
  const { labels } = SchoolInfoStore;
  const [isManyOpen, setIsManyOpen] = useState(false);

  return (
    <div style={{ width: "90%" }}>
      <h2>Etykiety</h2>
      {labels.loading ? (
        <LoadingBar />
      ) : labels.error ? (
        <p>{labels.error}</p>
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
                <TableCell>Etykieta</TableCell>
                <TableCell align="right">Akcja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labels?.data?.map((row, index) => (
                <SingleLabel label={row} index={index} />
              ))}
              <AddLabel lessonLabelLength={labels?.data?.length || 0} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isManyOpen && (
        <Popup
          title={"Dodaj wiele etykiet"}
          handleClose={() => setIsManyOpen(false)}
          isOpen={isManyOpen}
        >
          <AddManyLabels />
        </Popup>
      )}
    </div>
  );
});

export default Labels;
