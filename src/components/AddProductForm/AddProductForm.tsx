import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { IProduct } from '../../models';
import classes from './AddProductForm.module.css';
import Select from '../UI/Select';
import { PRODUCT_OPTIONS } from '../../constants';

interface AddProductFormProps {
  onAddItem: (item: IProduct) => void;
}

export default function AddProductForm({ onAddItem }: AddProductFormProps) {
    const initialItem = {
        id: Date.now().toString(),
        name: '',
        quantity: 1,
        price: '10',
        category: 'fruits',
        image: 'images/new-fruits.jpg',
        isPurchased: false
    };
    const [item, setItem] = useState<IProduct>(initialItem);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
            ...(name === 'category' ? {image: `images/new-${value}.jpg`} : {})
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (item.name.trim() === '' || item.quantity <= 0) {
            alert('Invalid input!');
            return;
        }
        
        onAddItem({ ...item, id: Date.now().toString() });
        setItem(initialItem);
    };

    return (
        <form onSubmit={handleSubmit} className={classes['add-product-form']}>
            <Input
                type="text"
                id="name"
                label="Product name"
                value={item.name}
                onChange={handleChange}
            />
            <Input
                type="number"
                id="quantity"
                label="Initial quantity"
                value={item.quantity}
                onChange={handleChange}
            />
            <Select 
                id="category"
                value={item.category}
                onChange={handleChange} 
                label={'Choose category'} 
                options={PRODUCT_OPTIONS}            
            />
            <Button type="submit" textOnly={false}>Add</Button>
        </form>
    );
};
