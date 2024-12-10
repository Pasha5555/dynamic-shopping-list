import classes from './UI.module.css';

export interface IErrorProps {
    title: string;
    message: string;
}

export default function Error({ title, message }: IErrorProps) {
    return (
        <div className={classes.error}>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
}
