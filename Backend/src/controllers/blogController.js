const Blog = require("../models/blog");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");


// ================= CREATE BLOG =================
exports.createBlog = async (req, res) => {
    try {

        const blog = await Blog.create({
            name: req.body.name,
            designation: req.body.designation,
            title: req.body.title,
            category: req.body.category,
            date: req.body.date || Date.now(),
            description: req.body.description,
            image: req.file ? req.file.filename : "",
        });


        res.status(201).json({
            success:true,
            message:"Blog created successfully",
            data:blog
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};




// ================= GET ALL BLOGS =================
exports.getBlogs = async(req,res)=>{

    try{

        const blogs = await Blog.find()
        .sort({createdAt:-1});


        res.status(200).json({

            success:true,
            count:blogs.length,

            data:blogs.map(blog=>({

                ...blog._doc,

                imageUrl: blog.image 
                ? `${req.protocol}://${req.get("host")}/uploads/blog/${blog.image}`
                : null

            }))

        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// ================= SINGLE BLOG =================
exports.getSingleBlog = async(req,res)=>{

    try{

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Blog ID"
            });
        }


        const blog = await Blog.findById(req.params.id);


        if(!blog){

            return res.status(404).json({
                success:false,
                message:"Blog not found"
            });

        }



        res.status(200).json({

            success:true,

            data:{
                ...blog._doc,

                imageUrl:blog.image
                ? `${req.protocol}://${req.get("host")}/uploads/blog/${blog.image}`
                : null
            }

        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// ================= UPDATE BLOG =================

exports.updateBlog = async(req,res)=>{

try{


const blog = await Blog.findById(req.params.id);


if(!blog){

return res.status(404).json({
success:false,
message:"Blog not found"
});

}



let image = blog.image;



if(req.file){


if(blog.image){

const oldPath = path.join(
__dirname,
"..",
"uploads",
"blog",
blog.image
);


if(fs.existsSync(oldPath)){
fs.unlinkSync(oldPath);
}


}


image=req.file.filename;


}




const updatedBlog = await Blog.findByIdAndUpdate(

req.params.id,

{

name:req.body.name,
designation:req.body.designation,
title:req.body.title,
category:req.body.category,
date:req.body.date,
description:req.body.description,
image:image

},

{
new:true,
runValidators:true
}

);



res.status(200).json({

success:true,
message:"Blog updated successfully",
data:updatedBlog

});



}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}


};




// ================= DELETE BLOG =================

exports.deleteBlog = async(req,res)=>{


try{


const blog = await Blog.findById(req.params.id);


if(!blog){

return res.status(404).json({

success:false,
message:"Blog not found"

});

}



if(blog.image){

const imagePath = path.join(

__dirname,
"..",
"uploads",
"blog",
blog.image

);


if(fs.existsSync(imagePath)){

fs.unlinkSync(imagePath);

}

}



await Blog.findByIdAndDelete(req.params.id);



res.status(200).json({

success:true,
message:"Blog deleted successfully"

});



}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


};