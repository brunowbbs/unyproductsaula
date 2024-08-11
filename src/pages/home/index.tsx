import axios from "axios";
import Modal from "react-modal";

import Header from "../../components/header";
import CardProduct from "../../components/card-product";
import { useEffect, useState } from "react";

//GET -> Buscar rescursos
//POST -> Criar um recurso
//PUT -> Editar um recurso
//DELETE -> Excluir um recurso

export type Product = {
  _id: string;
  nome: string;
  preco: number;
  fornecedor: string;
  url_imagem: string;
  descricao: string;
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [formState, setFormState] = useState({
    nome: "",
    preco: "",
    fornecedor: "",
    url: "",
    descricao: "",
  });

  const [statusModal, setStatusModal] = useState(false);

  async function getProductsByApi() {
    try {
      const response = await axios.get(
        "https://api-produtos-unyleya.vercel.app/produtos"
      );
      setProducts(response.data);
    } catch (error) {
      alert("Houve um erro ao buscar produtos");
    }
  }

  useEffect(() => {
    getProductsByApi();
  }, []);

  async function saveProduct() {
    try {
      await axios.post("https://api-produtos-unyleya.vercel.app/produtos", {
        nome: formState.nome,
        preco: formState.preco,
        fornecedor: formState.fornecedor,
        url_imagem: formState.url,
        descricao: formState.descricao,
      });
      alert("Produto salvo com sucesso");
    } catch (error) {
      alert("Erro ao salvar o produto");
    } finally {
      setFormState({
        nome: "",
        preco: "",
        fornecedor: "",
        url: "",
        descricao: "",
      });
      getProductsByApi();
      setStatusModal(false);
    }
  }

  return (
    <div>
      <Header />

      <h2 className="font-bold m-4">Produtos</h2>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <CardProduct product={product} />
        ))}
      </div>


      {products.length < 1 ? <p>Nenhum produto cadastrado</p> : null}

      <button
        onClick={() => setStatusModal(true)}
        className="bg-[#F9CA24] w-10 h-10 rounded-full text-lg shadow-md absolute bottom-4 right-4"
      >
        +
      </button>
      <Modal
        isOpen={statusModal}
        onRequestClose={() => setStatusModal(false)}
        style={customStyles}
      >
        <div className="w-96">
          <h3 className="text-center mb-2 font-bold">Cadastro de Produto</h3>

          <div>
            <input
              value={formState.nome}
              onChange={(event) =>
                setFormState({ ...formState, nome: event.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Nome do produto"
            />
          </div>

          <div>
            <input
              value={formState.preco}
              onChange={(event) =>
                setFormState({ ...formState, preco: event.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Preço"
            />
          </div>

          <div>
            <input
              value={formState.fornecedor}
              onChange={(event) =>
                setFormState({ ...formState, fornecedor: event.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Fornecedor"
            />
          </div>

          <div>
            <input
              className="border p-2 w-full mb-2"
              value={formState.url}
              onChange={(event) =>
                setFormState({ ...formState, url: event.target.value })
              }
              placeholder="URL da imagem"
            />
          </div>

          <div>
            <textarea
              value={formState.descricao}
              onChange={(event) =>
                setFormState({ ...formState, descricao: event.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Descrição"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={saveProduct}
              className="bg-[#F9CA24] rounded-md p-2 w-32"
            >
              Salvar
            </button>
            <button
              onClick={() => setStatusModal(false)}
              className="border-2 rounded-md border-[#F9CA24] p-2 w-32 ml-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
