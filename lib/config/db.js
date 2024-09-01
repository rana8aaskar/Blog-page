const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aaskar04rana:mongo8db@cluster0.713bq.mongodb.net/blog');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); // Exit the process if connection fails
    }
}
