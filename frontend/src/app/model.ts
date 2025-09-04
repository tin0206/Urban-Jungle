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
    date_added: string;
}

export type CartItem = {
    id: number;
    plant_id: number;
    plant_name: string;
    quantity: number;
    price: number;
}

export type TempDeleteCartItem = {
    plant_id: number;
    plant_name: string;
    quantity: number;
}

export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
}

export type Order = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    country: string;
    street_address: string;
    postal_code: string;
    city: string;
    phone: string;
    email: string;
    additional_information: string;
    total_amount: number;
    status: string;
    order_date: string;
}

export type OrderItem = {
    id: number;
    plant_id: number;
    plant_name: string;
    quantity: number;
    price: number;
    total: number;
}

export type OrderInformation = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    country: string;
    street_address: string;
    postal_code: string;
    city: string;
    phone: string;
    email: string;
    additional_information: string;
    total_amount: number;
    status: string;
    order_date: string;
    items: OrderItem[];
}