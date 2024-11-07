import type { Metadata } from "next";
import "./globals.css";
import { ContextoTarefasProvider } from "./context/contexto-tarefas";

export const metadata: Metadata = {
  title: "Minhas tarefas",
  description: "Uma aplicação para gerenciar minhas tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
          <ContextoTarefasProvider>
            {children}
          </ContextoTarefasProvider>
      </body>
    </html>
  );
}
