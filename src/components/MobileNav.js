import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "../app/auth/auth-actions";

import "./MobileNav.css";

const MobileNav = ({ show, showHandler }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  return (
    <div
      className="moNav__list"
      style={{
        transform: `${show ? "translateY(100%)" : "translateY(-90px)"}`,
      }}
    >
      <ul>
        <button onClick={() => showHandler(false)}>
          <NavLink
            to="/home"
            style={{ fontFamily: "PT Serif" }}
            className={(navData) =>
              navData.isActive ? "moActive__navlink" : ""
            }
          >
            Home
          </NavLink>
        </button>
        <button onClick={() => showHandler(false)}>
          <NavLink
            to="/about"
            style={{ fontFamily: "PT Serif" }}
            className={(navData) =>
              navData.isActive ? "moActive__navlink" : ""
            }
          >
            About
          </NavLink>
        </button>
        {isAuthenticated && (
          <button onClick={() => showHandler(false)}>
            <NavLink
              to="/recipes"
              style={{ fontFamily: "PT Serif" }}
              className={(navData) =>
                navData.isActive ? "moActive__navlink" : ""
              }
            >
              Recipes
            </NavLink>
          </button>
        )}
        <button onClick={() => showHandler(false)}>
          <NavLink
            to="/contact"
            style={{ fontFamily: "PT Serif" }}
            className={(navData) =>
              navData.isActive ? "moActive__navlink" : ""
            }
          >
            Contact
          </NavLink>
        </button>
        {!isAuthenticated ? (
          <button onClick={() => showHandler(false)}>
            <NavLink
              to="/signin"
              style={{ fontFamily: "PT Serif" }}
              className={(navData) =>
                navData.isActive ? "moActive__navlink" : ""
              }
            >
              Sign In
            </NavLink>
          </button>
        ) : (
          <button
            className="moLogout__btn"
            onClick={() => {
              dispatch(Logout(navigate));
              showHandler(false);
            }}
          >
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default MobileNav;
