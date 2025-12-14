import { useState } from "react";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [estoque, setEstoque] = useState("");
  const [minimo, setMinimo] = useState("");

  function adicionarProduto() {
    if (!nome || !estoque || !minimo) return;

    setProdutos([
      ...produtos,
      {
        nome,
        estoque: Number(estoque),
        minimo: Number(minimo),
        vendas: 0,
        compras: 0,
      },
    ]);

    setNome("");
    setEstoque("");
    setMinimo("");
  }

  function vender(index) {
    const copia = [...produtos];
    if (copia[index].estoque > 0) {
      copia[index].estoque--;
      copia[index].vendas++;
      setProdutos(copia);
    }
  }

  function comprar(index) {
    const copia = [...produtos];
    copia[index].estoque++;
    copia[index].compras++;
    setProdutos(copia);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>📦 LRG STORE – Controle de Estoque</h1>

      <h3>Adicionar Produto</h3>
      <input
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Qtd inicial"
        value={estoque}
        onChange={(e) => setEstoque(e.target.value
