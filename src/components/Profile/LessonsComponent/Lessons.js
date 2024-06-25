import React, { useEffect, useState } from "react";
import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
import {
  Accordion,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SingleClassLessons from "./SingleClassLessons/SingleClassLessons";
import { observer } from "mobx-react";

const Lessons = observer(() => {
  const { classes, lessons } = SchoolInfoStore;

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
        {classes.data.map((schoolClass) => (
          <Accordion key={schoolClass._id.$oid}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Klasa {schoolClass.name}
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={2} sx={{ width: "100%" }}>
                <SingleClassLessons
                  singleClass={schoolClass}
                  lessons={lessons}
                />
              </Stack>
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
});

export default Lessons;
