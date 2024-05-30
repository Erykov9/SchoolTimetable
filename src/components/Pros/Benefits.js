import React from "react";
import styles from "./Benefits.module.scss";
import { Container, Divider } from "@mui/material";
import { themeColors } from "../../styles/stylesConfig";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StorageIcon from '@mui/icons-material/Storage';
import GridViewIcon from '@mui/icons-material/GridView';
import CachedIcon from '@mui/icons-material/Cached';

import Benefit from "./Benefit/Benefit";

const benefits = [
  {
    id: 1,
    icon: <AccessTimeIcon fontSize="large" sx={{color: themeColors.conflowerBlue}}/>,
    p: 'Oszczędność czasu: ',
    span: 'Automatyzacja procesu tworzenia planu lekcji znacznie redukuje czas potrzebny na jego przygotowanie'
  },
  {
    id: 2,
    icon: <StorageIcon fontSize="large" sx={{color: themeColors.conflowerBlue}}/>,
    p: 'Optymalizacja zasobów: ',
    span: 'Efektywne wykorzystanie sal lekcyjnych, sprzętu i nauczycieli'
  },
  {
    id: 3,
    icon: <GridViewIcon fontSize="large" sx={{color: themeColors.conflowerBlue}}/>,
    p: 'Intuicyjny interfejs: ',
    span: 'Prosty i przejrzysty interfejs umożliwia łatwe wprowadzanie i modyfikowanie zajęć'
  },
  {
    id: 4,
    icon: <CachedIcon fontSize="large" sx={{color: themeColors.conflowerBlue}}/>,
    p: 'Balans obciążenia: ',
    span: 'Możliwość równomiernego rozłożenia zajęć, aby uniknąć przeciążenia nauczycieli.'
  },
];

const Benefits = () => {
  return (
    <Container>
      <div className={styles.benefits}>
        <h2>Co zyskujesz?</h2>
        <div className={styles.wrapper}>
          {benefits.map(benefit => <Benefit key={benefit.id} icon={benefit.icon} p={benefit.p} span={benefit.span}/>)}
        </div>
      </div>
    </Container>
  );
};

export default Benefits;
