
import { getLearningProduct } from '@/lib/learning-products';

export async function getLearningProductData(productId: string) {
    return getLearningProduct(productId);
}
