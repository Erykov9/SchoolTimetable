import React, { useState } from "react";
import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
import { toJS } from "mobx";
import {
  Accordion,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
  Button,
  Typography,
  Stack,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Lessons = () => {
  const { classes, subjects, teachers } = SchoolInfoStore;
  const [size, setSize] = useState(1);
  const [teacherState, setTeacherState] = useState("");
  console.log(toJS(subjects));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" mb={2}>
        Lekcje
      </Typography>
      <Stack gap={2} sx={{ width: "90%" }}>
        {classes?.data?.map((schoolClass) => (
          <Accordion key={schoolClass.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Klasa {schoolClass.name}
            </AccordionSummary>
            <AccordionDetails>
              {/* DISPLAY SUBJECTS */}
              <Stack gap={2} sx={{ width: "90%" }}>
                {subjects?.data?.map((subject) => (
                  <p>{subject.name}</p>
                ))}
              </Stack>
              <Button variant="contained">+</Button>
              <Box component={"form"}>
                <Stack gap={1}>
                  <Autocomplete
                    disablePortal
                    id="teacher"
                    label="Przedmiot"
                    options={teachers?.data || []}
                    getOptionLabel={(options) => options.name || ""} 
                    value={size}
                    renderInput={(params) => (
                      <TextField {...params} label="Nauczyciel" />
                    )}
                    
                  />
                  <TextField
                    id="teacher"
                    label="Nauczyciel"
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />

                  <TextField
                    id="lesson_duration"
                    label="Czas trwania lekcji"
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <TextField
                    id="teacher"
                    label="Etykieta"
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Label"
                    />
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="Required"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Disabled"
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </AccordionDetails>
            <AccordionActions>
              <Button size="small">Edytuj</Button>
              <Button size="small">Usuń</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Stack>
    </div>
  );
};

export default Lessons;
