// export async function getProducts() {
//     try {
//       const response = await axios.get('products.json');
    
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }


export async function getProducts() {
  try {
    const response = await axios.get('products.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}