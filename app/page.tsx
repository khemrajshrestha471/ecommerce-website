"use client"; // since useState is a client side hooks and next js is a server side language, so to implement this functionality we have use "use client"

import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import "./landingstyle.css";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Define a type for the product data
export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const queryClient = new QueryClient(); // Creating new instance of Query's QueryClient for data fetching and caching

const fetchProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products"); // api endpoint for fetching the data
  return response.data as Product[];
};

function Home() {
  const { data, error, isLoading } = useQuery<Product[]>(
    "products",
    fetchProducts
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = data
    ? data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isLoading) {
    return <div className="loading-error">Loading...</div>; // handling loading effect
  }

  if (error) {
    return (
      <div className="loading-error">
        Error: An error occurred while fetching the data!
      </div>
    );
  }

  // Define an array of indices to display "New Arrival" tags
  const newArrivalIndices = [2, 8, 13, 17];

  return (
    <div className="landing_page">
      <Navbar
        showSearch={true}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <h2 className="Headline">Exclusive Sale Offer | Dashain 2080</h2>
      <div className="product-container">
        {filteredProducts.length > 0 ? ( // logic for comparing and fetching the data
          filteredProducts.map((product, index) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-title">{product.title}</h2>
              <span className="product-price">$ {product.price}</span> <br />
              <span className="product-price-final">
                $ {(product.price * 0.95).toFixed(2)}
              </span>
              <div className="buttons">
                <Link
                  to={{
                    pathname: `/products/${product.id}`,
                    state: { product }, // Pass the product data as state
                  } as any}
                  className="explore"
                >
                  <span>View Details</span>
                </Link>
              </div>
              {/* {index === 1 || index === 8 || index === 10 || index === 18 && <div className="new-arrival-tag">New Arrival</div>} */}
              {newArrivalIndices.includes(index) && (
                <div className="new-arrival-tag">New Arrival</div>
              )}
            </div>
          ))
        ) : (
          <p id="not_found">No results found...!</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;