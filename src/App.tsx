import AddProductForm from './components/AddProductForm/AddProductForm';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import useDynamicList from './hooks/useDynamicList';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

const config = {
  method: 'GET'
};

function App() {   
  const { 
    data: products, isLoading, error, addItem, editItem, removeItem, updateList 
  } = useDynamicList(`/products`, config, []); 

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <main>
          <AddProductForm onAddItem={addItem} />
          <Products 
            products={products} 
            isLoading={isLoading}
            error={error}
            editItem={editItem}
            removeItem={removeItem}
            updateList={updateList}
          />
          <Cart updateList={updateList} />
          <Checkout updateList={updateList} />
        </main>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
