import React, { useState } from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsBookmark, BsList } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../app/searchItem";
import { Logout } from "../app/auth/auth-actions";
import "animate.css";

import MobileNav from "./MobileNav";

import "./Nav.css";

const Nav = () => {
  const dispatch = useDispatch();

  const firebaseError = useSelector((state) => state.ui.firebase.errorMessage);

  const savedRcps = useSelector((state) => state.saved.recipes);
  const [inputText, setInputText] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  return (
    <div className="nav">
      <MobileNav
        show={showMobileNav}
        showHandler={(value) => setShowMobileNav(value)}
      />
      {firebaseError !== "" && (
        <div className="firebase__error">
          <h3>{firebaseError}</h3>
        </div>
      )}
      {isAuthenticated && (
        <Link to="/savedList">
          <div className="toSave__icon">
            <BsBookmark style={{ fontSize: "19px", color: "#30af61" }} />
            <span className="quantity">
              {savedRcps.length < 9 ? savedRcps.length : "+9"}
            </span>
          </div>
        </Link>
      )}
      <div
        className="nav__contents"
        style={{
          justifyContent: `${
            !isAuthenticated ? "space-around" : "space-between"
          }`,
        }}
      >
        <div className="animate__animated animate__fadeInLeft nav__logo">
          <h1 style={{ fontFamily: "PT Serif" }}>
            A.M{" "}
            <span style={{ color: "#726c6c", fontFamily: "PT Serif" }}>
              Food
            </span>
          </h1>
        </div>
        <div className="nav__list">
          <ul>
            <li>
              <NavLink
                to="/home"
                style={{ fontFamily: "PT Serif" }}
                className={(navData) =>
                  navData.isActive ? "active__navlink" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                style={{ fontFamily: "PT Serif" }}
                className={(navData) =>
                  navData.isActive ? "active__navlink" : ""
                }
              >
                About
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/recipes"
                  style={{ fontFamily: "PT Serif" }}
                  className={(navData) =>
                    navData.isActive ? "active__navlink" : ""
                  }
                >
                  Recipes
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/contact"
                style={{ fontFamily: "PT Serif" }}
                className={(navData) =>
                  navData.isActive ? "active__navlink" : ""
                }
              >
                Contact
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <li>
                <NavLink
                  to="/signin"
                  style={{ fontFamily: "PT Serif" }}
                  className={(navData) =>
                    navData.isActive ? "active__navlink" : ""
                  }
                >
                  Sign In
                </NavLink>
              </li>
            ) : (
              <button
                className="logout__btn"
                onClick={() => dispatch(Logout(navigate))}
              >
                Logout
              </button>
            )}
          </ul>
        </div>

        {isAuthenticated && (
          <div className="animate__animated animate__fadeInRight search__input">
            <button
              onClick={() =>
                dispatch(
                  searchActions.addSearchElements({ searchWord: inputText })
                )
              }
            >
              <Link to="/search">
                <CiSearch style={{ fontSize: "22px" }} />
              </Link>
            </button>
            <input
              placeholder="Search for meal..."
              type="text"
              onChange={(event) => setInputText(event.target.value)}
            />
          </div>
        )}

        <button
          className="show__nav"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <BsList />
        </button>
      </div>
    </div>
  );
};

export default Nav;
