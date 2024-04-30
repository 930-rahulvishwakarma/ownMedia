"use client";
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function PostSearch() {
    const { query } = useParams();
    const [searchedPost, setSearchedPost] = useState([]);

    const getSearchedPost = async () => {
        let res = await fetch(`/api/post/search/${query}`)
        res = await res.json();
        console.log(res);
        setSearchedPost(res)
    }
    useEffect(() => {
        getSearchedPost();
    });
    return (
        <div>PostSearch</div>
    )
}

export default PostSearch