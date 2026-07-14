import React from 'react'
import BlogDetailsHead from '../../Component/BlogDetailsHead/BlogDetailsHead'
import PopularPost from '../../Component/PopularPost/PopularPost'
import OurBlog from '../../Component/OurBlog/OurBlog'

const BlogDetails = () => {
  return (
    <div>
       <BlogDetailsHead/> 
       <PopularPost/>
       <OurBlog/>
    </div>
  )
}

export default BlogDetails