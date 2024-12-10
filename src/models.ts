export interface IProduct {
    id: string;
    name: string;
    category: string;
    quantity: number;
    isPurchased: boolean;
    image: string;
    price: string;
}

export type InputType = string | boolean | number;