"use client";

import {
  adicionarAtividade,
  getAtividades,
  marcarComoConcluida,
  removerAtividade,
} from "@/lib/api/local-storage";
import { TypeTarefa } from "@/lib/types/interfaces";
import { Assignment, Delete, Edit, PlaylistAdd } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";

const ListaAtividades: React.FC = () => {
  const [atividades, setAtividades] = useState<TypeTarefa[]>([]);
  const [valoresFormulario, setValoresFormulario] = useState<TypeTarefa>({
    id: 0,
    texto: "",
    concluida: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    texto: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValoresFormulario({
      ...valoresFormulario,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  // Carrega as atividades apenas no cliente
  useEffect(() => {
    setAtividades(getAtividades());
  }, []);

  const handleSalvar = () => {
    if (!valoresFormulario.texto.trim()) {
      setErrors({
        ...errors,
        texto: true,
      });
      return;
    }
    adicionarAtividade(valoresFormulario.texto);
    setAtividades(getAtividades());
    setValoresFormulario({
      id: 0,
      texto: "",
      concluida: false,
    });
  };

  const handleConcluir = (id: number) => {
    marcarComoConcluida(id);
    setAtividades((prev) =>
      prev.map((atividade) =>
        atividade.id === id
          ? { ...atividade, concluida: !atividade.concluida }
          : atividade
      )
    );
  };

  const handleRemover = (id: number) => {
    removerAtividade(id);
    setAtividades((prev) => prev.filter((atividade) => atividade.id !== id));
  };

  const handleAtualizar = (atividade: TypeTarefa) => {
    setValoresFormulario(atividade);

    // atualizarAtividade(id, novoTexto);
    // setAtividades((prev) =>
    //   prev.map((atividade) =>
    //     atividade.id === id ? { ...atividade, texto: novoTexto } : atividade
    //   )
    // );
  };

  return (
    <>
      {/* Campo para adicionar atividade */}
      <Grid container spacing={2} mb={2} padding={2}>
        <Grid size={{ xs: 12 }}>
            <Card>
            <CardHeader
              title={
              <>
                <Assignment fontSize="large" /> Minhas Tarefas
              </>
              }
              action={
              <Button variant="outlined" color="primary" sx={{ background: "#fff" }}>
                <PlaylistAdd /> Nova Atividade
              </Button>
              }
              sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}
            />
            <CardContent>
              <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                {/* Tabela de atividades */}
                {atividades.length === 0 ? (
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Nenhuma atividade encontrada.
                </Typography>
                ) : (
                <TableContainer component={Paper}>
                  <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>Concluída</TableCell>
                    <TableCell>Atividade</TableCell>
                    <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {atividades.map((atividade, index) => (
                    <TableRow
                      key={atividade.id}
                      sx={{
                      backgroundColor:
                        index % 2 === 0 ? "#f9f9f9" : "#fff",
                      }}
                    >
                      <TableCell>
                      <Checkbox
                        checked={atividade.concluida}
                        onChange={() => handleConcluir(atividade.id)}
                        color="primary"
                      />
                      </TableCell>
                      <TableCell
                      sx={{
                        textDecoration: atividade.concluida
                        ? "line-through"
                        : "none",
                      }}
                      >
                      {atividade.texto}
                      </TableCell>
                      <TableCell align="right">
                      <ButtonGroup>
                        <Button
                        onClick={() => handleAtualizar(atividade)}
                        color="primary"
                        startIcon={<Edit />}
                        variant={
                          valoresFormulario.id === atividade.id
                          ? "contained"
                          : "outlined"
                        }
                        ></Button>
                        <Button
                        onClick={() => handleRemover(atividade.id)}
                        color="error"
                        startIcon={<Delete />}
                        ></Button>
                      </ButtonGroup>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </TableContainer>
                )}
              </Grid>
              <Grid size={{ xs: 8 }}>
                <TextField
                fullWidth
                name="texto"
                label="Descrição da Atividade"
                value={valoresFormulario.texto}
                onKeyUp={(e) => e.key === "Enter" && handleSalvar()}
                onChange={handleInputChange}
                error={errors.texto}
                helperText={errors.texto ? "Campo obrigatório" : ""}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSalvar}
                sx={{ height: "100%" }}
                >
                {valoresFormulario.id !== 0 ? "Atualizar" : "Adicionar"}
                </Button>
              </Grid>
              </Grid>
            </CardContent>
            </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ListaAtividades;
