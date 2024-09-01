import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aaskar04rana:mongo8db@cluster0.713bq.mongodb.net/blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); // Exit the process if connection fails
    }
}

// Handle GET request
export async function GET(request) {
    return NextResponse.json({ msg: "API working" });
}

// Handle POST request
export async function POST(request) {
    await connectDB(); // Ensure DB connection before handling the request

    try {
        const formData = await request.formData();
        const timeStamp = Date.now();

        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;
        await writeFile(path, buffer);
        const imgUrl = `/${timeStamp}_${image.name}`;

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get('authorImg')}`
        };

        await BlogModel.create(blogData);
        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: "Blog added" });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ success: false, msg: "Error adding blog" });
    }
}
