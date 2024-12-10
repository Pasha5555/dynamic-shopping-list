import { useMemo, useContext } from 'react';
import CartContext from '../../store/CartContext';
import UserProgressCtx from '../../store/UserProgressContext';
import { currencyFormatter } from '../../util/util';
import CartItem from '../CartItem/CartItem';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { InputType } from '../../models';

interface ICart {
    updateList: (id: string, value: InputType, prop: string) => void;
}

export default function Cart({ updateList }: ICart) {
    const context = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressCtx);

    const totalPrice = useMemo<number>(() => {
        return context.items.reduce((acc, item) => acc += item.quantity * parseFloat(item.price), 0);
    }, [context.items]);

    const handleCloseCart = () => userProgressCtx.hideCart();
    const handleGoCheckout = () => userProgressCtx.showCheckout();

    return (
        <Modal 
            className={classes.cart}
            open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {context.items.map((item) => 
                    <CartItem 
                        key={item.id} 
                        {...item} 
                        onIncrease={() => {
                            context.addItem(item);
                            updateList(item.id, item.quantity + 1, 'quantity');
                        }}
                        onDecrease={() => {
                            context.removeItem(item.id);
                            item.quantity === 1 
                                ? updateList(item.id, false, 'isPurchased')
                                : updateList(item.id, item.quantity - 1, 'quantity');
                        }} 
                    />)}
            </ul>
            <p className={classes['cart-total']}>{currencyFormatter.format(totalPrice)}</p>
            <p className={classes['modal-actions']}>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {context.items.length 
                    ? <Button textOnly={false} onClick={handleGoCheckout}>Go to checkout</Button> 
                    : null}
            </p>
        </Modal>
    );
}
