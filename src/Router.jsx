
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Auth from  "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment"; 
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute";

const stripePromise = loadStripe(
  'pk_test_51SC4D5Fx3LYJPBYmacmCWeIWCJyuvkSDIeCaUZQ2Um0toBg69roSN4o5TWv9UTiZ83ZHn2tCA8pFihik19FOW1jc00gBhsVZOH')

function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
         />
         <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must login to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}


export default Routering;





// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./Pages/Landing/Landing";
// // import Auth from "./Pages/Auth/auth";
// import Auth from "./Pages/Auth/Auth"
// import Payment from "./pages/Payment/Payment";
// import Orders from "./pages/Orders/Orders";
// import Cart from "./Pages/Cart/Cart";
// import Results from "./Pages/Results/Results";
// import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute"
// const stripePromise = loadStripe(
// 'pk_test_51SC4D5Fx3LYJPBYmacmCWeIWCJyuvkSDIeCaUZQ2Um0toBg69roSN4o5TWv9UTiZ83ZHn2tCA8pFihik19FOW1jc00gBhsVZOH');

// function Routering() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute
//               msg={"you must log in to pay"}
//               redirect={"/payments"}
//             >
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           }
//          />
//          <Route
//           path="/orders"
//           element={
//             <ProtectedRoute
//               msg={"you must login to access your orders"}
//               redirect={"/orders"}
//             >
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/category/:categoryName" element={<Results />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//       </Routes>
//     </Router>
//   );
// }
// export default Routering;



