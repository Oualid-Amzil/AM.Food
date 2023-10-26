import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RecipeDetails from "./screens/RecipeDetails";
import SearchScreen from "./screens/SearchScreen";
import RecipesScreen from "./screens/RecipesScreen";
import SavedScreen from "./screens/SavedScreen";
import AuthScreen from "./screens/AuthScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFound from "./screens/NotFound";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<HomeScreen />}></Route>
          {isAuthenticated && (
            <Route path="/details/:id" element={<RecipeDetails />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/search" element={<SearchScreen />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/recipes" element={<RecipesScreen />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/savedList" element={<SavedScreen />}></Route>
          )}
          <Route path="/about" element={<AboutScreen />}></Route>
          <Route path="/contact" element={<ContactScreen />}></Route>
          <Route path="/recipes" element={<SavedScreen />}></Route>
          <Route path="/signin" element={<AuthScreen />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
