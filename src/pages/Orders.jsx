import { useState, useEffect} from "react";
import axios from "axios";
import Card from "../components/Card/Card";


const Orders = ({items}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);


  const Arr = [];
    for (let i = 0; i < 8; i++) {
      Arr.push(i);
    }

  
  
  
  useEffect(() => {

    (async  () => {
      try {
        const { data } = await axios.get(
          "https://64c7dde3a1fe0128fbd5660a.mockapi.io/order"
        )
        setOrders(data.reduce((prev, obj)=>[...prev, ...obj.items],[]));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка");
        
      }

    })()
    
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закакзы</h1>
      </div>

      <div className="d-flex flex-wrap">{
        (isLoading ? Arr : orders).map((item)=>(
          <Card
            title={item.title}
            price={item.price}
            img={item.img}
            id={item.id}
            key={item.id}
            loading={isLoading}
           />
        ))
      }</div>
      
    </div>
  );
};

export default Orders;
