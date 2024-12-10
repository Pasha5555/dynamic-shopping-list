import { useMemo, useState } from 'react';
import { InputType, IProduct } from '../../models';
import ProductItem from '../ProductItem/ProductItem';
import Error from '../UI/Error';
import Select from '../UI/Select';
import classes from './Products.module.css';
import { capitalize } from '../../util/util';
import React from 'react';
import { PRODUCT_OPTIONS } from '../../constants';

interface IProductsProps {
    products: IProduct[],
    isLoading: boolean;
    error: string;
    removeItem: (id: string) => void;
    editItem: (updatedItem: IProduct) => void;
    updateList: (id: string, value: InputType, prop: string) => void;
}

export default function Products({ 
    products, 
    isLoading, 
    error, 
    editItem, 
    removeItem, 
    updateList 
}: IProductsProps) {
    const [filterValue, setFilterValue] = useState('');
    const productsByCategory = useMemo(() => {
        return products.filter((product: IProduct) => product.category.toLowerCase() === filterValue.toLowerCase());
    }, [filterValue]);
    const filteredProducts = (!filterValue || filterValue === 'all') ? products : productsByCategory;
    const categories = useMemo(() => {
        return Array.from(new Set(filteredProducts.map((product: IProduct) => product.category)))
    }, [filteredProducts]);
    const productsMap = useMemo(() => 
        filteredProducts.reduce((acc: IProduct[], item: IProduct) => {
            return { ...acc, [item.category]: [...acc[item.category], item]}
        }, {fruits: [], dairy: [], vegetables: []})
    , [filteredProducts]);
  
    if (isLoading) {
        return <p className='center'>Fetching products...</p>
    }

    if (error) {
        return <Error title="Failed to fetch" message={error} />
    }    

    return (
        <>
            <div className={classes['categories-select-wrapper']}>
                <Select 
                    id="category"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)} 
                    label={'Filter by category'} 
                    options={['All', ...PRODUCT_OPTIONS]}            
                />
            </div>
            {
                categories.map((category: string) => (
                    <React.Fragment key={category}>
                        <h2 className={classes.categoryGroup}>{capitalize(category)}</h2>
                        <ul className={classes['products']}>
                            {productsMap[category]?.map((product: IProduct) => (
                                <ProductItem 
                                    key={product.id} 
                                    product={product}
                                    editItem={editItem}
                                    removeItem={removeItem}
                                    updateList={updateList}
                                />
                            ))}
                        </ul>
                    </React.Fragment>
                ))
            }
        </>
    );
}
