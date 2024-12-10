import { MouseEvent } from 'react';
import classes from './UI.module.css';

export interface IButtonProps {
    children?: any;
    textOnly: boolean;
    className?: string;
    type?: 'submit' | 'button';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export default function Button ({ children, textOnly, className, type, onClick, disabled }: IButtonProps) {
    const cssClasses = (classes[textOnly ? 'text-button' : 'button']) + (className ? ' ' + classes[className] : '');

    return (
        <button 
            type={type} 
            className={cssClasses} 
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
