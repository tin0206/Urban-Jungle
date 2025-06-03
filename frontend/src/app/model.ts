export type Category = {
    id: number;
    name: string;
}

export type Plant = {
    id: number;
    name: string;
    category_name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export type CartItem = {
    id: number;
    plant_id: number;
    plant_name: string;
    quantity: number;
    price: number;
}