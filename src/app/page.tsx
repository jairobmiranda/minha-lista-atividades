"use client";

import Grid from "@mui/material/Grid2";
import ListaAtividades from "./components/shared/lista-atividades";

export default function Home() {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid size={{ xs: 12, md: 8, lg: 5 }} sx={{ mt: 2, maxWidth: 600 }}>
        <ListaAtividades />
      </Grid>
    </Grid>
  );
}
