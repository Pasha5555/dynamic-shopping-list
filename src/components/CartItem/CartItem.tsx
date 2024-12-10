import { MouseEvent } from 'react';
import { currencyFormatter } from '../../util/util';
import classes from './CartItem.module.css';

export interface IAppProps {
    name: string;
    quantity: number;
    price: string;
    onIncrease: (e: MouseEvent<HTMLButtonElement>) => void;
    onDecrease: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function CartItem ({ name, quantity, price, onIncrease, onDecrease }: IAppProps) {
  return (
    <li className={classes['cart-item']}>
      <p>{name} - {quantity} * {currencyFormatter.format(parseFloat(price))}</p>
      <p className={classes['cart-item-actions']}>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
