import type { ShopFilter, InputShopFilter } from "../types/filterProductsTypes";

export const shopFilters: ShopFilter[] = [
    {
        id: 1,
        title: 'CATEGORIES',
        type: 'category',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'EarPods', data: 'earpods' },
            { id: 3, title: 'Joysticks', data: 'joysticks' },
            { id: 4, title: 'Laptops', data: 'laptops' },
            { id: 5, title: 'Phones', data: 'phones' },
            { id: 6, title: 'PlayStations', data: 'playstations' },
            { id: 7, title: 'Digital Watches', data: 'digital-watches' },
        ],
    },
    {
        id: 2,
        title: 'BRANDS',
        type: 'brand',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'Apple', data: 'apple' },
            { id: 3, title: 'Samsung', data: 'samsung' },
            { id: 4, title: 'Sony', data: 'sony' },
            { id: 5, title: 'Xiaomi', data: 'xiaomi' },
            { id: 6, title: 'Asus', data: 'asus' },
            { id: 7, title: 'Lenovo', data: 'lenovo' },
            { id: 8, title: 'JBL', data: 'jbl' },
            { id: 9, title: 'Microsoft', data: 'microsoft' },
            { id: 10, title: 'Dell', data: 'dell' },
            { id: 11, title: 'HP', data: 'hp' },
            { id: 12, title: 'Logitech', data: 'logitech' },
        ],
    },
    {
        id: 3,
        title: 'TAGS',
        type: 'tag',
        filters: [
            { id: 1, title: 'All', data: 'all' },
            { id: 2, title: 'New', data: 'new' },
            { id: 3, title: 'Popular', data: 'popular' },
            { id: 4, title: 'Premium', data: 'premium' },
            { id: 5, title: 'Budget', data: 'budget' },
            { id: 6, title: 'Gaming', data: 'gaming' },
            { id: 7, title: 'Wireless', data: 'wireless' },
        ],
    },
];

export const shopPriceFilter: InputShopFilter = {
    id: 4,
    title: 'PRICE',
    filters: [
        {
            id: 1,
            title: 'Min price',
            placeholder: 'Min price',
            action: 'minPrice',
        },
        {
            id: 2,
            title: 'Max price',
            placeholder: 'Max price',
            action: 'maxPrice',
        },
    ],
}

