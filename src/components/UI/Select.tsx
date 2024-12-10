import * as React from 'react';
import classes from './UI.module.css';

export interface ISelectProps {
    label: string;
    id: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options: string[];
}

export default function Select({ label, id, value, onChange, options }: ISelectProps) {    
    return (
        <p className={classes.control}>
            <label htmlFor={id}>{label}</label>
            <select id={id} name={id} value={value} onChange={onChange}>
                { options.map((option) => <option 
                    key={option} 
                    value={option.toLocaleLowerCase()}
                >
                    {option}
                </option>) }
            </select>
        </p>
    );
}
