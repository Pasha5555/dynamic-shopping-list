import { useContext, useState } from 'react';
import { IProduct } from '../../models';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../util/util';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import classes from './ProductItem.module.css';
import { BASE_URL, PRODUCT_OPTIONS } from '../../constants';

export interface IProductItemProps {
    product: IProduct,
    removeItem: (id: string) => void;
    editItem: (updatedItem: IProduct) => void;
    updateList: (id: string, value: string | boolean, prop: string) => void;
}

export default function ProductItem ({ product, editItem, updateList, removeItem }: IProductItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(product);

    const context = useContext(CartContext);
    const handleAddToCart = () => {
        context.addItem(product);
        updateList(product.id, !product.isPurchased, 'isPurchased');
    };

    const handleEdit = () => {
        isEditing && editItem({ ...editedItem });
        setIsEditing(!isEditing);
    };

    return (
        <li className={`${classes['product-item']} ${product.isPurchased ? classes.purchased : ''}`}>
            <article>
                <img src={`${BASE_URL}/${product.image}`} alt={product.name} />
                {isEditing ? (
                        <>
                            <Input
                                id={'name'}
                                type={"text"}
                                label={'New name'} 
                                value={editedItem.name} 
                                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}                    
                            />
                            <Select 
                                id={"category"}
                                value={editedItem.category}
                                onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })} 
                                label={'New category'} 
                                options={PRODUCT_OPTIONS}                        
                            />
                            <Button 
                                textOnly={false} 
                                onClick={handleEdit} 
                                className={classes['edit']}
                            >
                                Edit
                            </Button>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                                <p>{product.quantity}</p>
                                <p className={classes['product-item-price']}>
                                    {currencyFormatter.format(parseFloat(product.price))}
                                </p>
                            </div>
                            <div className={classes['product-item-actions']}>
                                <Button 
                                    textOnly={false} 
                                    onClick={handleAddToCart}
                                    disabled={product.isPurchased}
                                >
                                    {product.isPurchased ? 'Purchased' : 'Add to cart'}
                                </Button>
                                <div className={classes['product-item-actions-wrapper']}>
                                    <Button textOnly onClick={handleEdit}>Edit</Button>
                                    <Button textOnly onClick={removeItem.bind(null, product.id)}>Remove</Button>
                                </div>
                            </div> 
                        </>
                    )}
            </article>
        </li>
    );
}
