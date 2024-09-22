import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
const fs = require('fs');
// MongoDB connection logic
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect('mongodb+srv://aaskar04rana:mongo8db@cluster0.713bq.mongodb.net/blog', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("DB Connected");
        }
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); // Exit if connection fails
    }
};

// API Endpoint to Get All Blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");

    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog)

    }
    else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs})
    }
}


// API Endpoint for Uploading Blogs
export async function POST(request) {
    await connectDB(); // Ensure DB connection before handling the request

    try {
        const formData = await request.formData();
        const timeStamp = Date.now();

        // Handle image upload
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        // Ensure the 'public' directory exists
        const publicPath = path.resolve('./public');
        await mkdir(publicPath, { recursive: true });

        const imagePath = path.join(publicPath, `${timeStamp}_${image.name}`);
        await writeFile(imagePath, buffer);

        const imgUrl = `/${timeStamp}_${image.name}`;

        // Collecting blog data
        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: imgUrl,
            authorImg: formData.get('authorImg'),
        };

        // Save blog to DB
        await BlogModel.create(blogData);
        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: "Blog added" });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ success: false, msg: "Error adding blog" });
    }
}

// creating Api endpoint to delete blog
export async function DELETE(request){
    const id =await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"}) 
}
