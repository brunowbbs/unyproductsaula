import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import axios from "axios";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { customStyles, Product } from "../home";

import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";


export default function Details() {

  const navigate = useNavigate()

  const [product, setProduct] = useState<Product>({} as Product);

  const [isLoading, setIsLoading] = useState(false);

  const [statusModal, setStatusModal] = useState(false);

  const [statusModalDelete, setStatusModalDelete] = useState(false);


  const [formState, setFormState] = useState({
    nome: "",
    preco: "",
    fornecedor: "",
    url: "",
    descricao: "",
  });

  const { id } = useParams();

  async function getDetailsProduct() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api-produtos-unyleya.vercel.app/produtos/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      alert("Erro ao buscar produto");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDetailsProduct();
  }, []);

  async function editProduct() {
    try {
      await axios.put(`https://api-produtos-unyleya.vercel.app/produtos/${id}`, {
        nome: formState.nome,
        preco: formState.preco,
        fornecedor: formState.fornecedor,
        url_imagem: formState.url,
        descricao: formState.descricao,
      })
    } catch (error) {
      alert("Erro ao editar produt")
    } finally {
      getDetailsProduct();
      setStatusModal(false)
    }
  }

  async function removeProduct() {
    try {
      await axios.delete(`https://api-produtos-unyleya.vercel.app/produtos/${id}`)
    } catch (error) {
      alert("Erro ao editar produt")
    } finally {
      setStatusModalDelete(false)
      navigate(-1)
      //
    }
  }

  return (
    <>
      <Header />

      {isLoading ? (
        <h4>Carregando...</h4>
      ) : (
        <div className="flex p-10 gap-10">


          <img
            className="w-72"
            src="https://www.camainbox.com.br/media/catalog/product/cache/0a0c65509d6052414e566f979b0217be/1/c/1cinza_4.jpg"
          />

          <div>
            <p className="font-bold"> {product.nome}</p>
            <div className="flex">

              <FaEdit size={30} cursor="pointer" onClick={() => {
                setStatusModal(true);
                setFormState({
                  descricao: product.descricao,
                  fornecedor: product.fornecedor,
                  nome: product.nome,
                  preco: String(product.preco),
                  url: product.url_imagem
                })
              }} />

              <MdOutlineDeleteOutline onClick={() => setStatusModalDelete(true)} size={30} cursor="pointer" />
            </div>

            <p className="mt-3 font-bold text-lg">R$ {product.preco}</p>

            <p className="mt-2 font-thin text-sm">{product.fornecedor}</p>

            <p className="mt-3">{product.descricao}</p>
          </div>
        </div>
      )}
      <Modal
        isOpen={statusModal}
        onRequestClose={() => setStatusModal(false)}
        style={customStyles}
      >
        <div className="w-96">
          <h3 className="text-center mb-2 font-bold">Editar Produto</h3>

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
              onClick={editProduct}
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

      <Modal
        isOpen={statusModalDelete}
        onRequestClose={() => setStatusModalDelete(false)}
        style={customStyles}
      >
        <div className="w-96">
          <h3 className="text-center mb-2 font-bold">Remover Produto</h3>



          <p className="mb-3 text-center">Deseja realmente excluir o item?</p>

          <div className="flex justify-center">
            <button
              onClick={removeProduct}
              className="bg-[#F9CA24] rounded-md p-2 w-32"
            >
              Sim
            </button>
            <button
              onClick={() => setStatusModalDelete(false)}
              className="border-2 rounded-md border-[#F9CA24] p-2 w-32 ml-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
