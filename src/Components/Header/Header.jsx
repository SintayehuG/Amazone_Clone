
import React, { useContext } from "react";
import classes from "./Header.module.css";
import { CiLocationOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/*  home page  link*/}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Deliver to Sintayehu</p>
                <span>Us</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <IoSearch size={38} />
          </div>

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>

            {/*  / Logout */}
            {user ? (
              <div onClick={() => auth.signOut()} style={{ cursor: "pointer" }}>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/auth">
                <div>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
            )}

            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
