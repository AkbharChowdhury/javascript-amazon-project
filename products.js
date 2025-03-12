export async function getProducts(){
    axios.get('scripts/products.json').then((response) =>{
        const data = response.data;
        console.log(data)
        return data
      }).catch((error) =>  console.error(error))

}
export function show(){
    console.log('hs')
    // axios.get('products.json').then((response) =>{
    //     const data = response.data;
    //     console.log(data)
    
    //   }).catch((error) =>  console.error(error))

}
