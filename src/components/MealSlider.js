import React, { useEffect, useState, memo } from "react";
import instance from "../instance";
import Slider from "react-slick";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { FaHotjar } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import Loader from "./UI/Loader";
import "./MealSlider.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const MealSlider = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await instance.get(
          `/random?apiKey=${API_KEY}&number=10&type="main course"`
        );

        setRecipes(response.data.recipes);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };

    getRecipes();
  }, []);

  const arrowStyle = {
    color: "#30af61",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    fontSize: "80px",
    fontWeight: "100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle }}
        onClick={onClick}
      >
        <RxChevronLeft />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          ...arrowStyle,
        }}
        onClick={onClick}
      >
        <RxChevronRight />
      </div>
    );
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    customPaging: () => <div className="dot__button"></div>,
    responsive: [
      {
        breakpoint: 1345,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="mealSlider">
      {isLoading && (
        <div className="mealSlider__container">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="mealSlider__container">
          <h2 style={{ color: "red" }}>{errorMessage}</h2>
        </div>
      )}
      {!isLoading && !errorMessage && recipes.length !== 0 && (
        <Slider {...settings}>
          {recipes.map((item, idx) => (
            <div className="slide__element" key={idx}>
              <div className="left__element">
                <img src={item?.image} alt="salad bowl" />
              </div>
              <div className="right__element">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexFlow: "row wrap",
                  }}
                >
                  {item?.dishTypes?.map((item, idx) => {
                    if (idx < 4) {
                      return (
                        <span className="meal__type" key={idx}>
                          {item}
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>
                <h1 style={{ fontFamily: "PT Serif" }}>
                  {truncate(item?.title, 30)}
                </h1>
                <div className="right__sub">
                  <div className="sub__element">
                    <h3
                      style={{
                        fontFamily: "PT Serif",
                        color: "grey",
                      }}
                    >
                      Servings:
                    </h3>
                    <h4 style={{ fontFamily: "PT Serif" }}>
                      4
                      <BiDish
                        style={{
                          color: "black",
                          fontSize: "24px",
                        }}
                      />
                    </h4>
                  </div>
                  <div className="sub__element">
                    <FaHotjar style={{ color: "orange" }} />
                    <h3 style={{ fontFamily: "PT Serif", color: "grey" }}>
                      <span style={{ color: "black", fontFamily: "PT Serif" }}>
                        203.6
                      </span>{" "}
                      kacl
                    </h3>
                  </div>
                </div>
                <div className="meal__ingredients">
                  {item?.extendedIngredients?.map((item, idx) => {
                    if (idx < 6) {
                      return (
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${item?.image}`}
                          alt="recipe poster"
                          key={idx}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
                <p>{truncate(item.instructions, 200)}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(MealSlider);
