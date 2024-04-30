// BuyButton.js
// import { checkout } from './your-utils'; // Import your checkout function from the appropriate file
"use client";
const BuyButton = ({ quantity, itemPrice, itemName }) => {
    const checkout = async() => {
        fetch("http://localhost:5000/create-checkout-session", {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors",
          body: JSON.stringify({
            items: [
              {id:1, quantity: quantity, price: itemPrice, name: itemName}
            ]
          })
        })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({url})=>{
          window.location = url
        })
        .catch(e => {
          console.log(e.error)
        })
      }

  return (
    // <button onClick={checkout}>Buy</button>
    ""
  );
};

export default BuyButton;