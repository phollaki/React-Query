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

async function fetchProduct(){
    const res = await window.fetch("https://fakestoreapi.com/products");
    return res.json();
}

function product() {

  const products = useQuery("products",fetchProduct,{
    staleTime: 5000,
  });

  if(products.isLoading)<p> Loading the products...</p>


  if(products.isFetching)<p> Fetching the products...</p>

  if(products.isSuccess){
    return (
      <div>
        {products.data?.map((data:Product) =>(
          <div className="flex space-x-10 p-5 border-y-2 border-gray-200">
                <img className="h-32" src={data.image}/>
                <div>
                  <h1 className="font-bold">{data.title}</h1>
                  <p className="text-gray-700 line-clamp-2">{data.description}</p>
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