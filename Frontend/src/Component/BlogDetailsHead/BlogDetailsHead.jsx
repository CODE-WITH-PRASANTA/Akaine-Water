import React, { useEffect, useState } from "react";
import "./BlogDetailsHead.css";

import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaRegComment,
  FaArrowRight,
  FaFolderOpen
} from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";

import API, { IMG_URL } from "../../api/axios";



const BlogDetailsHead = () => {


const {id}=useParams();

const navigate=useNavigate();


const [blog,setBlog]=useState(null);

const [allBlogs,setAllBlogs]=useState([]);

const [loading,setLoading]=useState(true);





// ================= FETCH SINGLE BLOG =================

const fetchBlog=async()=>{

try{

const res=await API.get(`/blog/${id}`);


if(res.data.success){

setBlog(res.data.blog);

}


}

catch(error){

console.log(
"Single Blog Error",
error
);

}

};




// ================= FETCH ALL BLOGS =================


const fetchAllBlogs=async()=>{

try{

const res=await API.get("/blog/all");


if(res.data.success){

setAllBlogs(res.data.blogs);

}


}

catch(error){

console.log(
"All Blog Error",
error
);

}

finally{

setLoading(false);

}

};






useEffect(()=>{

if(id){

fetchBlog();

}

fetchAllBlogs();


},[id]);






const formatDate=(date)=>{


if(!date)
return "Recent";


return new Date(date)
.toLocaleDateString(
"en-US",
{
day:"numeric",
month:"long",
year:"numeric"
}
);


};






if(loading){


return(

<div className="BlogDetailsHead-loader">

<div className="BlogDetailsHead-loader-spinner"></div>

<p>
Loading Blog...
</p>


</div>

)

}






if(!blog){


return(

<div className="BlogDetailsHead-error">

<h2>
Blog Not Found
</h2>

<button
onClick={()=>navigate("/blog")}
className="BlogDetailsHead-error-btn"
>

Back To Blog

</button>


</div>

)

}






// Dynamic categories

const categories=[
...new Set(
allBlogs
.map(item=>item.category)
.filter(Boolean)
)
];



// Popular blogs

const popularPosts=
allBlogs
.filter(item=>item._id!==id)
.slice(0,3);







return(

<div className="BlogDetailsHead-container">





<div className="BlogDetailsHead-layout-wrapper">


<div className="BlogDetailsHead-grid">





{/* ================= SIDEBAR ================= */}



<aside className="BlogDetailsHead-sidebar">


<div className="BlogDetailsHead-sidebar-inner">






{/* SEARCH */}


<div className="BlogDetailsHead-widget">


<h3 className="BlogDetailsHead-widget-title">

Search

</h3>


<div className="BlogDetailsHead-wave-divider"></div>



<div className="BlogDetailsHead-search-box">


<input
type="text"
placeholder="Search"
/>


<button className="BlogDetailsHead-search-btn">

<FaSearch/>

</button>


</div>


</div>









{/* CATEGORY */}



<div className="BlogDetailsHead-widget">


<h3 className="BlogDetailsHead-widget-title">

Category

</h3>


<div className="BlogDetailsHead-wave-divider"></div>



<ul className="BlogDetailsHead-category-list">


{

categories.map((cat)=>(


<li key={cat}>


<a

className={
blog.category===cat
?"active"
:""
}

>


{cat}


</a>


</li>


))


}



</ul>


</div>










{/* POPULAR POSTS */}



<div className="BlogDetailsHead-widget">


<h3 className="BlogDetailsHead-widget-title">

Popular Posts

</h3>


<div className="BlogDetailsHead-wave-divider"></div>




<div className="BlogDetailsHead-popular-posts">


{

popularPosts.map(post=>(


<div

key={post._id}

className="BlogDetailsHead-popular-item"

onClick={()=>navigate(`/blogdetails/${post._id}`)}

>


<img

src={`${IMG_URL}${post.image}`}

alt={post.title}

/>



<div>

<h5>

{post.title}

</h5>


<span>

{formatDate(post.date)}

</span>


</div>


</div>



))


}



</div>


</div>





</div>


</aside>









{/* ================= BLOG CONTENT ================= */}



<main className="BlogDetailsHead-main-content">


<article className="BlogDetailsHead-card">



<div className="BlogDetailsHead-card-image-wrapper">



<img

src={`${IMG_URL}${blog.image}`}

alt={blog.title}

className="BlogDetailsHead-card-img"

/>





<div className="BlogDetailsHead-post-badge">

<FaFolderOpen/>

{blog.category || "BLOG"}

</div>



</div>









<div className="BlogDetailsHead-card-body">



<h2 className="BlogDetailsHead-card-title">

{blog.title}

</h2>





<div className="BlogDetailsHead-card-meta">


<span>

<FaCalendarAlt/>

{formatDate(blog.date)}

</span>



<span>

<FaUser/>

By {blog.name || "Admin"}

</span>



<span>

<FaRegComment/>

0 Comments

</span>


</div>






<div

className="BlogDetailsHead-card-excerpt"

dangerouslySetInnerHTML={{
__html:blog.description
}}


/>







<button

className="BlogDetailsHead-readmore-link"

onClick={()=>window.scrollTo({
top:0,
behavior:"smooth"
})}

>

<FaArrowRight/>

BACK TO TOP

</button>



</div>


</article>


</main>






</div>


</div>



</div>


)


}



export default BlogDetailsHead;