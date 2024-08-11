import { Link } from "react-router-dom"
import { Product } from "../../pages/home"

type Props = {
  product: Product
}

export default function CardProduct(props: Props) {
  return (
    <Link to={`/details/${props.product._id}`}>
      <div className="shadow-lg w-44 rounded-md p-4 m-2">
        <p>{props.product.nome}</p>

        <div className="flex items-center justify-center">
          <img className="w-28" src={props.product.url_imagem} />
        </div>

        <p className="font-thin text-sm">{props.product.fornecedor}</p>
        <p className="font-bold text-lg">R$ {props.product.preco}</p>
      </div>
    </Link>
  )
}