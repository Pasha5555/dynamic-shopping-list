import { useMemo, useContext, FormEvent } from 'react';
import CartContext from '../../store/CartContext';
import UserProgressCtx from '../../store/UserProgressContext';
import { currencyFormatter } from '../../util/util';
import Button from '../UI/Button';
import Error from '../UI/Error';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import useDynamicList from '../../hooks/useDynamicList';
import classes from './Checkout.module.css';
import { InputType } from '../../models';

const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

interface ICheckout {
    updateList: (id: string, value: InputType, prop: string) => void;
}

export default function Checkout({ updateList }: ICheckout) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressCtx);
    const { 
        data, isLoading: isSending, error, sendRequest, clearData 
    } = useDynamicList(`/orders`, config, null);
    
    const totalPrice = useMemo<number>(() => {
        return cartCtx.items.reduce((acc, item) => acc += item.quantity * parseFloat(item.price), 0);
    }, [cartCtx.items]);

    const handleClose = () => userProgressCtx.hideCheckout();
    const handleFinish = () => {
        cartCtx.clearCart();
        userProgressCtx.hideCheckout();
        updateList(null, false, 'isPurchased');
        clearData();
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const customerData = Object.fromEntries(fd.entries()) as Record<string, string>;

        sendRequest({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        });
    };

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button textOnly={false}>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = (<span>Sending order data...</span>);
    }

    if (data && !error) {
        return (<Modal
            className=''
            open={userProgressCtx.progress === 'checkout'} 
            onClose={handleClose}
        >
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details.</p>
            <p className={classes['modal-actions']}>
                <Button textOnly={false} onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>);
    }

    return (
        <Modal className={classes.checkout} open={userProgressCtx.progress === 'checkout'} onClose={handleClose} >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

                <Input type="text" id="name" label="Full Name" />
                <Input type="email" id="email" label="Email" />
                <Input type="text" id="street" label="Street" />
                <div className={classes['control-row']}>
                    <Input type="text" id="postal-code" label="Postal Code" />
                    <Input type="text" id="city" label="City" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}
                <p className={classes['modal-actions']}>{actions}</p>
            </form>
        </Modal>
    );
}
