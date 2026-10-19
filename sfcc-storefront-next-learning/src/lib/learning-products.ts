
const products = {
    '12345': {
        name: 'Arizona Sandal',
        category: 'Sandals',
        price: 100,
    },
    '67890': {
        name: 'Boston Clog',
        category: 'Clogs',
        price: 150,
    },
};

export async function getLearningProduct(productId: string) {
    return products[productId as keyof typeof products] ?? null;
}