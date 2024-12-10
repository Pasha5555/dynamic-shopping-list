import { createContext, useReducer } from "react";
import { IProduct } from "../models";

type ICartProduct = IProduct & {quantity: number};
type CartAction = {
    type: string;
    item?: ICartProduct,
    id?: string;
}
export interface ICartState {
    items: ICartProduct[],
    addItem: (item: IProduct) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

const initialState = {
    items: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {}
};
const CartContext = createContext<ICartState>(initialState);

function cartReducer(state: ICartState, action: CartAction): ICartState {
    let updatedItems = [...state.items];

    switch(action.type) {
        case 'ADD_ITEM':
            const existingCartIndex = updatedItems.findIndex((item) => item.id === action.item.id);
            const existingCartItem = updatedItems[existingCartIndex];

            if (existingCartIndex > -1) {
                updatedItems[existingCartIndex] = {...existingCartItem, quantity: existingCartItem.quantity + 1};
            } else {
                updatedItems.push({ ...action.item });
            }

            break;
        case 'REMOVE_ITEM':
            const existingCartItemIndex = updatedItems.findIndex((item) => item.id === action.id);
            const existingItem = updatedItems[existingCartItemIndex];

            if (existingItem.quantity === 1) {
                updatedItems = updatedItems.filter((item) => item.id !== action.id);
            } else {
                updatedItems[existingCartItemIndex] = { ...existingItem, quantity: existingItem.quantity - 1 };
            }

            break;
        case 'CLEAR_CART': 
            updatedItems = [];
            break;
        default:
            return state;
    }
    return { ...state, items: updatedItems };
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer<React.Reducer<ICartState, CartAction>>(cartReducer, initialState);

    const addItem = (item: ICartProduct): void => dispatchCartAction({ type: 'ADD_ITEM', item });
    const removeItem = (id: string): void => dispatchCartAction({ type: 'REMOVE_ITEM', id });
    const clearCart = () => dispatchCartAction({ type: 'CLEAR_CART' });

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>;
}

export default CartContext;