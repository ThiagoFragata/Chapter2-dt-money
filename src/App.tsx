import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";

import Modal from "react-modal";

import { GlobalStyle } from "./styles/globals";

import { createServer, Model } from "miragejs";

import { useState } from "react";
import { TransactionsProvider } from "./hooks/useTransactionsContext";

Modal.setAppElement("#root");

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Salário",
          type: "deposit",
          category: "Desenvolvimento",
          amount: 1000,
          createAt: new Date(),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 350,
          createAt: new Date(),
        },
        {
          id: 3,
          title: "Conta de Luz",
          type: "withdraw",
          category: "Casa",
          amount: 150,
          createAt: new Date(),
        },
        {
          id: 4,
          title: "Conta de Internet",
          type: "withdraw",
          category: "Casa",
          amount: 20,
          createAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}
