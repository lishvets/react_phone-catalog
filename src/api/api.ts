import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getProductDetails = async (
  category: string,
): Promise<ProductDetails[]> => {
  const response = await fetch(`/api/${category}.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getSuggestedProducts = async (
  productId: string,
): Promise<Product[]> => {
  const products = await getProducts();

  const filtered = products.filter(product => product.itemId !== productId);
  const shuffledProducts = [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return shuffledProducts;
};
