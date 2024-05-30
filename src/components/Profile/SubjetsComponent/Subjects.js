import React from 'react';
import styles from "../style.module.scss";
import { observer } from 'mobx-react';
import SchoolInfoStore from '../../../mobx/SchoolInfoStore';
import LoadingBar from '../../LoadingBar/LoadingBar';
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
} from "@mui/material";
import { toJS } from 'mobx';

const Subjects = observer(() => {
  const { subjects } = SchoolInfoStore;
  console.log(toJS(subjects));

  return (
    <div className={styles.subjects} style={{width: '90%'}}>
      <h2>Przedmioty</h2>
      {subjects.loading ? (
        <LoadingBar />
      ) : subjects.error ? (
        <p>{subjects.error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <caption>
              <Button>Dodaj przedmiot</Button>
              <Button color="secondary">Zaimportuj</Button>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Przedmiot</TableCell>
                <TableCell>Etykieta</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects?.data?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">{row?.label ? row.label : "Brak etykiety"}</TableCell>
                  <TableCell align="right">
                    <Stack
                      gap={1}
                      flexDirection={"row"}
                      justifyContent={"flex-end"}
                    >
                      <Button variant="contained" color="success">
                        Dodaj etykietę
                      </Button>
                      <Button variant="contained" color="secondary">
                        Edytuj
                      </Button>
                      <Button variant="contained" color="error">
                        Usuń
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
});

export default Subjects;