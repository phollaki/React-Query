import React from 'react'
import { useQuery } from 'react-query'

export interface Product {
    "id": number,
    "title": string,
    "price": number,
    "description": string,
    "category": string,
    "image": string,
    "rating": {
        "rate": number,
        "count": number
    }
}

async function fetchProduct(url: string){
    if(window){
      const res = await window.fetch(url).then(response => response.json());
      return res
    }
    return null
}

function product() {

  const products = useQuery("products",()=>fetchProduct("https://fakestoreapi.com/products"),{
    staleTime: 5000,
  });

  if(products.isLoading)<p> Loading the products...</p>

  if(products.isSuccess){
    return (
      <div>
        {products.data?.map((product:Product) =>(
          <div className="flex space-x-10 p-5 border-y-2 border-gray-200">
                <img className="h-32" src={product.image}/>
                <div>
                  <h1 className="font-bold">{product.title}</h1>
                  <p className="text-gray-700 line-clamp-2">{product.description}</p>
                </div>
            </div>
        ))}
      </div>
    )
  }

  if(products.isError)<p>Something wrong happened</p>

  return <p>Hello</p>
}

export default product