export default async function addProduct(product) {
  const res = await fetch('/api/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  return res.json();
}


export const getMethod =  async() => {
  const res = await fetch('/api/product');
  return res.json();
}
