import React, { useState, useEffect } from "react";
import { placeOrder, positionsWithQuote } from "./util-robinhood";

export const Trade = () => {
  const [order, setOrder] = useState(null);
  const [positions, setPositions] = useState(null);
  useEffect(() => {
    positionsWithQuote().then((resp) => {
        setPositions(resp);
    });
  }, []);
  
  const handlePlaceOrder = () => {
    placeOrder(order).then((resp) => {
        setOrder(null)
        positionsWithQuote().then((resp) => {
            setPositions(resp);
        });
    });
  }

  const positionList = positions.map((position, index) => {
    const { symbol,  quantity, cost_basis, last, diff, percent, gain } = position;

    return (
      <div key={index}>
        <span>{symbol}</span>
        <span>{quantity}</span>
        <span>{cost_basis}</span>
        <span>{last}</span>
        <span>{diff}</span>
        <span>{percent}</span>
        <span>{gain}</span>
        <button onClick={() => setOrder({symbol, price, quantity, type: 'buy'})}>
          Buy
        </button>
        <button onClick={() => setOrder(({symbol, price, quantity, type: 'sell'}))}>
          Sell
        </button>
        {order && (
          <div>
            <input
              type="text"
              value={order.quantity}
              onChange={(e) => setOrder({...order, quantity: e.target.value})}
            />
            <input
              type="text"
              value={order.price}
              onChange={(e) => setOrder({...order, price: e.target.value})}
            />

            <button onClick={() => handlePlaceOrder()}>Order</button>
            <button onClick={() => setOrder(null)}>Cancel</button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <div>{positionList}</div>
    </div>
  );
};

export default Tasks;
