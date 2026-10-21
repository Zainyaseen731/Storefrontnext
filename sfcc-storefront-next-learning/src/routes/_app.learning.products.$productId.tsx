
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { getLearningProductData } from '@/lib/learning-product-api';

export async function loader({
    params,
}: {
    params: { productId?: string };
}) {
    const productId = params.productId;

    if (!productId || !/^\d+$/.test(productId)) {
        throw new Response('Invalid product ID', { status: 400 });
    }

    const product = await getLearningProductData(productId);

    if (!product) {
        throw new Response('Product not found', { status: 404 });
    }

    return { product };
}

export default function LearningProductPage() {
    const { product } = useLoaderData<typeof loader>();
    const [selectedSize, setSelectedSize] = useState('');
    const [message, setMessage] = useState('');

    function handleAddToCart() {
        if (!selectedSize) {
            setMessage('Please select a size first.');
            return;
        }

        setMessage(`${product.name}, size ${selectedSize}, selected.`);
    }

    return (
        <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '24px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    alignItems: 'start',
                }}
            >

                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', borderRadius: '8px' }}
                    onLoad={() => console.log('Product image loaded successfully')}
                    onError={() => console.error('Failed to load product image:', product.image)}
                />


                <section>
                    <p>{product.category}</p>
                    <h1>{product.name}</h1>
                    <h2>€{product.price.toFixed(2)}</h2>

                    <label htmlFor="product-size">Select size</label>
                    <select
                        id="product-size"
                        value={selectedSize}
                        onChange={(event) => {
                            setSelectedSize(event.target.value);
                            setMessage('');
                        }}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px',
                            margin: '8px 0 20px',
                        }}
                    >
                        <option value="">Choose a size</option>
                        {product.sizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        style={{
                            width: '100%',
                            padding: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        Add to Cart
                    </button>

                    {message && <p role="status">{message}</p>}
                </section>
            </div>
        </main>
    );
}
