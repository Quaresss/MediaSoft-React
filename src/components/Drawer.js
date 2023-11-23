import React, { useState } from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";


const Drawer = ({ items, onRemove, onClosed }) => {



  const { totalPrice, cartItems, setCartItems } = useCart();
  //Заказ товара
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  //передача id на бек
  const [isOrderId, setIsOrderId] = useState(null);
  //загрузка
  const [isLoading, setIsLoading] = useState(false);
  //функция оформления товара
  const onClickOrder = async () => {




    //оформление заказа и отправка на бэк
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://64c7dde3a1fe0128fbd5660a.mockapi.io/order", { items: cartItems });
      setIsOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);


      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://64c3c47267cfdca3b6604227.mockapi.io/cart/" + item.id)
      }
    } catch (error) {
      alert("Ошибка оформления заказа");
    }
    setIsLoading(false)

  }



  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClosed}
            className="removeBtn cu-p"
            width={32}
            height={32}
            src="/img/btn-remove.svg"
            alt="Remove"
          ></img>
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map(
                (
                  obj//Вывод добавленного товара в корзине с помощью списка
                ) => (
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <img
                      className="mr-20"
                      width={70}
                      height={70}
                      src={obj.img}
                      alt=""
                    ></img>
                    <div className="mr-20">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      width={32}
                      height={32}
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    ></img>
                  </div>
                )
              )}
            </div>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li className="">
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder}>Оплатить</button>
            </div>
          </div>
        ) : (
          <Info title={isOrderComplete ? "Ура" : "Корзина пуста"} image={isOrderComplete ? "/img/ordered.svg" : "/img/empty-cart.jpg"} description={isOrderComplete ? `Ура, ваш товар ${isOrderId}` : "Добавте товар"} />


        )}
      </div>
    </div>
  );
};

export default Drawer;
