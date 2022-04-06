import React from 'react'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DUMMY_USERS:string[] = ["Tom", "Bob", "Larrey", "Marilyn","Gustav","Tordell","Lincoln","Tim","Carrow","Moor"]

interface Post {
    userId:number,
    id:number,
    title:string,
    body:string,
}

async function fetchPosts(){
    const res = await window.fetch("https://jsonplaceholder.typicode.com/posts")
    return res.json();
}

function posts() {
    const {data,isFetching} = useQuery("posts",fetchPosts,{
        staleTime: 10000,
    })
    const array = Array(20).fill(1)

    if(isFetching){
        return (
            <div className="max-w-screen-2xl mx-auto">
                <Skeleton containerClassName="avatar-skeleton" className="h-10 mt-6"/>
                {array.map((_,i:number)=>(
                    <div key={i} className="py-6 border-b-2">
                        <Skeleton containerClassName="avatar-skeleton"/>
                        <Skeleton containerClassName="avatar-skeleton"/>
                    </div>
                ))}
            </div>
        )
    }


    return (
    <div className="max-w-screen-2xl mx-auto">
        <h1 className="py-6 text-4xl font-bold text-gray-800">Posts from random people🧍🏽</h1>
        {data?.map((post:Post)=>(
            <div key={post.id} className="py-6 text-gray-700 border-b-2">
                <h1 className="font-bold">{post.title.charAt(0).toUpperCase()+post.title.slice(1)}</h1>
                <span>{post.body}&nbsp;</span>
                <span className="text-blue-700"><i>{`/ ${DUMMY_USERS[post.userId]}`}</i></span>
            </div>
        ))}
    </div>
  )
}

export default posts