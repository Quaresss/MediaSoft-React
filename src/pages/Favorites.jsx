import { useContext } from "react";
import Card from "../components/Card/Card";

import AppContext from "../context";


const Favorites = () => {

 
  const {favorites, onAddFavorite} = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          Мои закладки
        </h1>
      
      </div>

      <div className="d-flex flex-wrap">
      {favorites //Поиск и фильтрация
         
          .map(
            (
              item //Вывод товара на главной странице с помощью списка
            ) => (
              <Card
                key={item.title}
                title={item.title}
                price={item.price}
                img={item.img}
                id={item.id}
                favorited={true}
                onFavorite={(obj) => onAddFavorite(obj)}
              />
            )
          )}
    
      </div>
    </div>
  );
};

export default Favorites ;
