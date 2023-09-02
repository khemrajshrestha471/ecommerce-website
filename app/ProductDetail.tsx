"use client";

import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar";
import "./detailstyle.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

// landing page pass the id as a props and catch that props from here as {id}

const fetchProductDetail = async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data as Product;
};

function ProductDetail() {
  const { id } = useParams(); // Extract the "id" parameter from the URL route for dynamic routing
  const {
    data: product,
    error,
    isLoading,
  } = useQuery<Product>(["product", id], () => fetchProductDetail(Number(id)));

  const handleAddToCart = () => {
    // Get the existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add the current product to the cart
    existingCart.push(product);

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show a toast message
    toast.success("Product added to the Cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Adjust the duration as needed (in milliseconds)
    });
  };

  if (isLoading) {
    return <div className="loading-error">Loading...</div>;
  }

  if (error) {
    return (
      <div className="loading-error">
        Error: An error occurred while fetching data!
      </div>
    );
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { title, image, description } = product;

  return (
    <div className="container_product_individual">
      <Navbar showSearch={false} />
      <h1 className="product_indi_title">{title}</h1>
      <div className="disp">
        <div className="disp1">
          <img src={image} alt={title} className="product-image_individual" />
        </div>
        <div className="disp2">
          <p className="prices_indi">
            Price: $ {(product.price * 0.95).toFixed(2)}
          </p>
          {/* rounding off the price */}
          <p>{description}</p>
          <button className="added" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;