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
        onChange={(e) => setEstoque(e.target.value)}
      />
      <input
        type="number"
        placeholder="Estoque mínimo"
        value={minimo}
        onChange={(e) => setMinimo(e.target.value)}
      />
      <button onClick={adicionarProduto}>Adicionar</button>

      <hr />

      <h3>Produtos</h3>

      {produtos.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            background: p.estoque <= p.minimo ? "#ffe0e0" : "#e0ffe0",
          }}
        >
          <strong>{p.nome}</strong>
          <p>Estoque: {p.estoque}</p>
          <p>Vendidos: {p.vendas}</p>
          <p>Comprados: {p.compras}</p>

          {p.estoque <= p.minimo && (
            <p style={{ color: "red" }}>
              ⚠️ Estoque mínimo atingido — comprar produto
            </p>
          )}

          <button onClick={() => vender(i)}>Vender</button>
          <button onClick={() => comprar(i)}>Comprar</button>
        </div>
      ))}
    </div>
  );
}
