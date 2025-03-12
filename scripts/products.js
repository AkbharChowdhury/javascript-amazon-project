export async function getProducts() {
  const url = 'data/products.json';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}