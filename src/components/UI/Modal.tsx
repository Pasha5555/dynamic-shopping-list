import * as React from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './UI.module.css';

export interface IModalProps {
    children: React.ReactNode;
    open: boolean;
    className: string;
    onClose: () => void;
}

export default function Modal({ children, open, onClose, className = '' }: IModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    useEffect(() => {
        const modal = dialogRef.current;
        open && modal.showModal();
        
        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog 
            ref={dialogRef} 
            className={`${classes.modal} ${className}`} 
            onClose={onClose}
        >
            {children}
        </dialog>, 
        document.getElementById('modal')
    );
}
