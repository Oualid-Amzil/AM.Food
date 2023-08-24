import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../components/Banner";
import MealSlider from "../components/MealSlider";

import SubscribeSection from "../components/SubscribeSection";

import { authActions } from "../app/auth/authSlice";
import { getSavedRecipes } from "../app/saved/saved-actions";

import "./HomeScreen.css";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSavedRecipes());
    }
  }, [dispatch, isAuthenticated]);

  const userData = localStorage.getItem("userInfo");

  if (userData) {
    const transformeData = JSON.parse(userData);

    if (
      transformeData.expirationDate <= new Date() ||
      !transformeData.token ||
      !transformeData.userId
    ) {
      return;
    }

    dispatch(
      authActions.authentication({
        token: transformeData.token,
        userId: transformeData.userId,
        expirationTime: transformeData.expirationDate,
        isAuthenticated: transformeData.isAuthenticated,
      })
    );
  }

  return (
    <div className="homeScreen">
      <Banner />
      <MealSlider />
      <SubscribeSection />
    </div>
  );
};

export default HomeScreen;
