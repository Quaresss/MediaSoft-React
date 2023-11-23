
import Card from "../components/Card/Card";



const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
  isLoading,
}) => {


  //Отдельная функция для рендеринга карточек на главной странице
  const renderItems = () => {
    //Поиск и фильтрация
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const Arr = [];
    for (let i = 0; i < 8; i++) {
      Arr.push(i);
    }

    //Условные рендеринг. Если загрузка идёт, то прогрузи пустык карточки, если isLoading falese, то полные

    return (isLoading ? Arr : filtredItems).map(
      (
        item //Вывод товара на главной странице с помощью списка
      ) => (
        <Card
          key={item.id}
          title={item.title}
          price={item.price}
          img={item.img}
          id={item.id}
          //Проверка на товар из корзины, если товар уже есть в корзине, то галочка будет зелёная
          //Пропс загрузки
          loading={isLoading}
          //Берёт данные с Card
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddFavorite(obj)}
        />
      )
    );
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все товары"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="" />

          {searchValue && ( //если searchValue true, то появляется крестик
            <img
              onClick={() => setSearchValue("")}
              className="removeBtn cu-p clear"
              width={32}
              src="/img/btn-remove.svg"
              alt="Remove"
            ></img>
          )}

          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
