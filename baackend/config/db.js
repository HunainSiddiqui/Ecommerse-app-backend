const mongoose = require("mongoose") ;
const Product = require("../models/productModel");
const connectDB = async() => {
    
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL) ;
        console.log("Connected_to_MongoDB") ;
        const newProducts = [
                {
                  name: "T-Shirt",
                  price: 20,
                  ratings: 4,
                  description: "A comfortable and stylish T-shirt for everyday wear.",
                  category: "Clothing",
                  images: [
                    {
                      public_id: "t-shirt-1",
                      url: "https://images.unsplash.com/photo-1512820639487-2c4b29b6709e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                    },
                    {
                      public_id: "t-shirt-2",
                      url: "https://images.unsplash.com/photo-1506172551334-c60886787a7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
                    }
                  ]
                },
                {
                  name: "Jeans",
                  price: 50,
                  ratings: 4.5,
                  description: "A pair of high-quality jeans that will last for years.",
                  category: "Clothing",
                  images: [
                    {
                      public_id: "jeans-1",
                      url: "https://images.unsplash.com/photo-1527782579216-f3f82705579e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    },
                    {
                      public_id: "jeans-2",
                      url: "https://images.unsplash.com/photo-1506955652538-602b47d3f8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
                    }
                  ]
                },
                {
                  name: "Hooded Sweatshirt",
                  price: 30,
                  ratings: 4.8,
                  description: "A warm and cozy hooded sweatshirt for the cold weather.",
                  category: "Clothing",
                  images: [
                    {
                      public_id: "hooded-sweatshirt-1",
                      url: "https://images.unsplash.com/photo-1528892952291-0010991330c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    },
                    {
                      public_id: "hooded-sweatshirt-2",
                      url: "https://images.unsplash.com/photo-1531526022713-fa92f473f8a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    }
                  ]
                }
              ]
              
              
              
              
              async function createProducts(newProducts) {
                try {
                  await Product.create(newProducts);
                  console.log("Products created successfully!");
                } catch (error) {
                  console.error("Error creating products:", error);
                }
              }
              createProducts(newProducts);
              
              
              
              
  
};

module.exports = connectDB ;