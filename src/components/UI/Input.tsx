import * as React from 'react';
import classes from './UI.module.css';

export interface IInputProps {
    label: string;
    id: string;
    type: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function Input({ label, id, onChange, value, ...props }: IInputProps) {
    return (
        <p className={classes.control}>
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                name={id} 
                value={value}
                onChange={onChange} 
                required 
                {...props} 
            />
        </p>
    );
}
