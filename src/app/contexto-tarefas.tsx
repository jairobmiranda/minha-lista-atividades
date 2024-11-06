'use client';

import { Tarefa } from "@/lib/types/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextoTarefasProps {
  tarefas: Tarefa[];
  adicionarTarefa: (texto: string) => void;
  alternarStatusTarefa: (id: number) => void;
}

// Criando o contexto com valor padrão
const ContextoTarefas = createContext<ContextoTarefasProps | undefined>(
  undefined
);

// Criando o provider para o contexto
export function ContextoTarefasProvider({ children }: { children: ReactNode }) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefa = (texto: string) => {
    setTarefas((tarefasAntigas) => [
      ...tarefasAntigas,
      { id: Date.now(), texto, concluida: false },
    ]);
  };

  const alternarStatusTarefa = (id: number) => {
    setTarefas((tarefasAntigas) =>
      tarefasAntigas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  return (
    <ContextoTarefas.Provider
      value={{ tarefas, adicionarTarefa, alternarStatusTarefa }}
    >
      {children}
    </ContextoTarefas.Provider>
  );
}

// Hook para usar o contexto
export function useContextoTarefas() {
  const contexto = useContext(ContextoTarefas);
  if (!contexto) {
    throw new Error(
      "useContextoTarefas deve ser usado dentro de um ContextoTarefasProvider"
    );
  }
  return contexto;
}
