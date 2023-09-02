"use client";

import { useEffect, useState } from "react";
import { Product } from "../page";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [cartItems, setCartItems] = useState<Product[]>([]); // Declaring cartItems as state
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [initialTotalCost, setInitialTotalCost] = useState<number>(0);

  // Defining an array of valid voucher codes
  const voucherCodes = ["onlinestore26", "happycustomer"];

  useEffect(() => {
    if (typeof document !== 'undefined') {
    // Get the cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Update the state with the cart items
    setCartItems(storedCartItems);
  }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
    // Calculate the total cost whenever cart items change
    const calculatedTotalCost = cartItems.reduce(
      (total, item) => total + item.price * 0.95,
      0
    );
    setTotalCost(calculatedTotalCost);
    setInitialTotalCost(calculatedTotalCost); // Store the initial total cost
    }
  }, [cartItems]);

  const removeFromCart = (itemId: number) => {
    // Filter out the item with the specified ID and update the cart
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

    // Update the state and localStorage with the updated cart
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const applyDiscount = () => {
    if (voucherCodes.includes(voucherCode)) {
      // Apply a 5% discount if the voucher code is correct
      if (!discountApplied) {
        const discount = totalCost * 0.05;
        const discountedTotal = totalCost - discount;
        setTotalCost(discountedTotal);
        setDiscountApplied(true);
        setVoucherCode(""); // Reset the voucher code input
        // alert("Voucher Applied");
      } else {
        setVoucherCode("");
        toast.error("Voucher should applied only once!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // displaying duration (in milliseconds)
        });
      }
    } else {
      // Display an alert if the voucher code is incorrect
      setVoucherCode("");
      toast.error("Voucher did not match!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, 
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Trigger the submit button when Enter key is pressed
      applyDiscount();
    }
  };

  return (
    <div className="container">
      <h2>Products in the cart</h2>
      {cartItems.length > 0 ? ( // Display table if cart has items
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item: Product) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} className="product-image-cart" />
                </td>
                <td>{item.title}</td>
                <td>${(item.price * 0.95).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}></td>
              <td className="prices">Total : $ {totalCost.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          <p>No items in the cart...!</p>
          <a href="/">
            <button className="proceed-button" id="single_component">
              Back
            </button>
          </a>
        </div>
      )}
      {cartItems.length > 0 && ( 
        <div className="container_whole">
          <span className="coupon">
            <p>Apply Voucher to get additional 5% discount:</p>
            <input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              onKeyDown={handleKeyDown} // Call handleKeyDown on key press
            />
            <button onClick={applyDiscount}>Submit</button>
            <ToastContainer />
          </span>

          <div className="coupon">
            <div className="conclusion" id="conclusion_final">
              <a href="https://esewa.com.np/" target="_blank">
                <button className="proceed-button"> Payment </button>
              </a>
              <a href="/">
                <button className="proceed-button">Back</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;