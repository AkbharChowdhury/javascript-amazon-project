export async function getProducts() {
  try {
    const response = await fetch('data/products.json');
    return response.json();
  } catch (error) {
    console.error(error);
  }
}