import { useInfiniteQuery, useQuery } from 'react-query'
import React, { useEffect } from 'react'

// const fetchRepositories = async ({ pageParam = 0 }) => {
//   console.log(pageParam)
//   const res = await fetch(`https://api.github.com/search/repositories?q=topic:reactjs&per_page=30=page=${pageParam}`)
//   return res.json()
// }
const fetchRepositories = async (page = 1) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${page}`
  );
  return response.json();
};

export default function InifiniteQueries() {
  const { data, hasNextPage, fetchNextPage, isLoading, isError, error } = useInfiniteQuery(
    "repositories",
    ({ pageParam = 1 }) => fetchRepositories(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );




  useEffect(()=>{
    let fetching = false;

    const onScroll = async (event:any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement
      if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.5){
        fetching = true;
        if(hasNextPage) await fetchNextPage()
        fetching = false;
      }
    }

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  },[])

  if(isLoading){
    return <p>Loading...</p>
  }

  if(isError){
    return <p>Error: {(error as any)?.message}</p>
  }

  console.log(data)
  return (
    <>
      <div className="flex justify-center flex-col  p-10">
        {data?.pages.map((group:any, i: number) => (
          <ul key={i} className='space-y-10'>
            {group?.items?.map((repo:any)=>(
              <li key={repo.id} className='border-2 p-5'>
                <b>{repo.name}</b>
                <p>{repo.description}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  )
}