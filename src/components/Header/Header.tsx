import { useContext, useMemo } from 'react';
import logoImg from '../../assets/logo.jpg';
import CartContext from '../../store/CartContext';
import UserProgressCtx from '../../store/UserProgressContext';
import Button from '../UI/Button';
import classes from './Header.module.css';

export default function Header() {
    const context = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressCtx);
    const totalCartItems = useMemo<number>(() => 
        context.items.reduce((acc, item) => acc += item.quantity, 0), 
        [context.items]
    );

    const handleShowCart = () => userProgressCtx.showCart();

    return (
        <header id={classes['main-header']}>
            <div id={classes.title}>
                <img src={logoImg} alt="Shopping" />
                <h1>Dynamic shopping</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}
