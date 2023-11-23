import { Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";









function App() {
  //кнопка корзины
  const [cardOpened, setCardOpened] = useState(false);
  //элементы на главной странице
  const [items, setItems] = useState([]);
  //элементы в корзине
  const [cartItems, setCartItems] = useState([]);
  //поиск
  const [searchValue, setSearchValue] = useState("");
  //Элементы в зкаладках
  const [favorites, setFavorites] = useState([]);
  // Стейт для рендеринга пустых или непустых карточек
  const [isLoading, setIsLoading] = useState(true);

  //Достаём значение из инпута
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  //бэк
  useEffect(() => {
    async function fetchData() {
      try {

       
        //получаем данные  с бека на корзину с товарами
        const cartResponse = await axios
        .get("https://64c3c47267cfdca3b6604227.mockapi.io/cart/");
        //получаем данные  с бека на закладки с товарами
        const favoriteResponse = await axios
        .get("https://64c7dde3a1fe0128fbd5660a.mockapi.io/favorites/");
        //получаем данные  с бека на главную страницу с товарами
        const itemsResponse = await axios
        .get("https://64c3c47267cfdca3b6604227.mockapi.io/Items/");

        //После загрузки показывает нормальные карточки
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data); 
      } catch (error) {
        alert("Ошибка при запросе данных");
        
      }

    }
    fetchData()
  }, []);

  //Функция добавления товара в корзину
  const onAddToCart = async (obj) => {

    try {
      const findItem=cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://64c3c47267cfdca3b6604227.mockapi.io/cart/${findItem.id}`);
  
      }
      else {
        
        const {data}= await axios.post("https://64c3c47267cfdca3b6604227.mockapi.io/cart/", obj)
        setCartItems((prev) => [...prev, data]);
        
  
      }
      
    } catch (error) {
      alert("Ошибка при добавлении в корзину")
      
    }

  };

  //функция удаления товара из корзины
  const onRemoveItem = (id) => {
    try {
    //удаление из бека
    axios.delete(`https://64c3c47267cfdca3b6604227.mockapi.io/cart/${id}`);
    //удаление рендер 
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении из корзины")
      
    }
  }

  //функция добавленния закладок
  const onAddFavorite = async (obj) => {
    try {
      //Удаление закладок
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://64c7dde3a1fe0128fbd5660a.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      }

      else {
        //отправляем товар из закладок в бэк
        const { data } = await axios.post("https://64c7dde3a1fe0128fbd5660a.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное")
    }
  };

  const isItemAdded = (id) => {
    return (
      cartItems.some((obj) => Number(obj.parentId) === Number(id))
      )
  }


  return (


    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCardOpened, setCartItems, onAddFavorite, onAddToCart }}>
      <div className="wrapper clear">
        {cardOpened && ( //если cardOpened равен true, то панель корзины открывается
        
          <Drawer items={cartItems} onClosed={() => setCardOpened(false)} onRemove={onRemoveItem} />
        )}
        <Header onCardOpened={() => setCardOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddFavorite={onAddFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />}
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/favorites"
            element={
              <Favorites/>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/orders"
            element={
              <Orders items={cartItems}/>
            }
          ></Route>
        </Routes>




      </div>
    </AppContext.Provider>
    

  );
}

export default App;
