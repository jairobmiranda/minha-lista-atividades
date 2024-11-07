"use client";

import { TypeTarefa } from "../types/interfaces";

export const getAtividades = (): TypeTarefa[] => {
  const atividades = localStorage.getItem("atividades");
  return atividades ? JSON.parse(atividades) : [];
};

// Salva as atividades no localStorage
const saveAtividades = (atividades: TypeTarefa[]) => {
  localStorage.setItem("atividades", JSON.stringify(atividades));
};

// Adiciona uma nova atividade
export const adicionarAtividade = (text: string): void => {
  const novasAtividades = [
    ...getAtividades(),
    { id: Date.now(), texto: text, concluida: false },
  ];
  saveAtividades(novasAtividades);
};

// Remove uma atividade pelo id
export const removerAtividade = (id: number): void => {
  const novasAtividades = getAtividades().filter(
    (atividade) => atividade.id !== id
  );
  saveAtividades(novasAtividades);
};

// Atualiza o texto de uma atividade
export const atualizarAtividade = (id: number, novoTexto: string): void => {
  const novasAtividades = getAtividades().map((atividade) =>
    atividade.id === id ? { ...atividade, text: novoTexto } : atividade
  );
  saveAtividades(novasAtividades);
};

// Marca uma atividade como concluída
export const marcarComoConcluida = (id: number): void => {
  const novasAtividades = getAtividades().map((atividade) =>
    atividade.id === id
      ? { ...atividade, concluida: !atividade.concluida }
      : atividade
  );
  saveAtividades(novasAtividades);
};
