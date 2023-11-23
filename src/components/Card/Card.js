import styles from "./Card.module.scss";
import React, { useContext, useState } from "react";
import ContentLoader from "react-content-loader"

import AppContext from "../../context";



const Card = ({ 
  id,
  onFavorite,
  onPlus,
  img,
  title,
  price,
  favorited = false,
  loading = false }) => {




  //Кнопка на карточке товара 
  const { isItemAdded } = useContext(AppContext)
  
  const [isFavorite, setIsFavorite] = useState(favorited)

  const onClickPlus = () => {
    onPlus({ img, title, price, id, parentId: id });
  };

  const favoriteClick = () => {
    onFavorite({ img, title, price, id });
    setIsFavorite(!isFavorite);
  }

  return (//Условный рендеринг, если loading true, то рендерь пучтые карточки
    <div className={styles.card}>


      {
        loading ? <ContentLoader
          speed={0}
          width={141}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"

        >
          <rect x="0" y="-4" rx="0" ry="0" width="150" height="155" />
          <rect x="61" y="73" rx="0" ry="0" width="34" height="0" />
          <rect x="0" y="170" rx="0" ry="0" width="152" height="15" />
          <rect x="0" y="192" rx="0" ry="0" width="100" height="15" />
          <rect x="0" y="233" rx="0" ry="0" width="80" height="25" />
          <rect x="118" y="228" rx="0" ry="0" width="32" height="32" />
        </ContentLoader> : <>
          <div className="favorite">
            {onFavorite&&(<img onClick={favoriteClick} src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="" />)}
          </div>
          <img width={140} height={140} src={img} alt=""></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && 
            (<img onClick={onClickPlus} 
              className="button" 
              width={32} 
              height={32} 
              alt="" 
              src={isItemAdded(id) ? "/img/check.svg" : "/img/add.svg"} />)}


          </div>
        </>
      }



    </div>
  );
};

export default Card;
