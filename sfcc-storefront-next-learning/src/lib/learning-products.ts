
const products = {
    '12345': {
        id: '12345',
        name: 'Arizona Sandal',
        category: 'Sandals',
        price: 100,
        image: '/images/arizona.jpg',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    },
    '67890': {
        id: '67890',
        name: 'Boston Clog',
        category: 'Clogs',
        price: 150,
        image: '/images/boston.jpg',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    },
};

export async function getLearningProduct(productId: string) {
    return products[productId as keyof typeof products] ?? null;
}
