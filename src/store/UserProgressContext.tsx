import { createContext, useState } from "react";

export interface IUserProgressState {
    progress: string;
    showCart: () => void,
    hideCart: () => void,
    showCheckout: () => void,
    hideCheckout: () => void,
}

const initialState = {
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
};
const UserProgressCtx = createContext<IUserProgressState>(initialState);

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    const showCart = () => setUserProgress('cart');
    const hideCart = () => setUserProgress('');
    const showCheckout = () => setUserProgress('checkout');
    const hideCheckout = () => setUserProgress('');

    const UserProgressContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return (
        <UserProgressCtx.Provider value={UserProgressContext}>
            {children}
        </UserProgressCtx.Provider>
    );
}

export default UserProgressCtx;