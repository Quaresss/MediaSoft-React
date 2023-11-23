
import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart";





const Header = (props) => {



  const { totalPrice } = useCart();


  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <Link to={"/"}>
          <img width={40} height={40} src="/img/logo.png" alt="" />
        </Link>
        <div>
          <h3 className="text-uppercase">Магазин</h3>
          <p className="opacity-5">Это магазин?</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onCardOpened} className="mr-30 cu-p">
          <img width={20} height={20} src="/img/card.svg" alt="" />
          <span>{totalPrice} руб</span>
        </li>

        <Link to={"/favorites"}>
          <li>
            <img className="mr-20 cu-p" width={20} height={20} src="/img/favorite.svg" alt="" />
          </li>
        </Link>




        <Link to={"/orders"}>
          <li>
            <img width={20} height={20} src="/img/user.svg" alt="" />
          </li>
        </Link>
      </ul>
    </header>
  )
}

export default Header;