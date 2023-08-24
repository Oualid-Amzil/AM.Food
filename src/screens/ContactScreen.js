import React, { useReducer, useRef, useState, useEffect } from "react";
import { isEmpty, isEmail } from "validator";
import emailjs from "@emailjs/browser";
import Loader from "../components/UI/Loader";
import "animate.css";

import Wrapper from "../components/Wrapper";

import "./ContactScreen.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: action.value,
        valid: action.valid,
      };

    case "INPUT_BLUR":
      return {
        ...state,
        touched: action.value,
      };

    default:
      return state;
  }
};

const ContactScreen = () => {
  const form = useRef();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [emailState, emailDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [nameState, nameDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [messageState, messageDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });

  const emailChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || !isEmail(text)) {
      isValid = false;
    }
    emailDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const nameChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 3) {
      isValid = false;
    }
    nameDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const messageChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 4) {
      isValid = false;
    }

    messageDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const clearOutInputs = () => {
    emailDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
    emailDispatch({ type: "INPUT_BLUR", touched: false });
    nameDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
    nameDispatch({ type: "INPUT_BLUR", touched: false });

    messageDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
    messageDispatch({ type: "INPUT_BLUR", touched: false });
  };

  const sendEmailHandler = async (e) => {
    e.preventDefault();

    if (emailState.valid && nameState.valid && messageState.valid) {
      setIsLoading(true);
      try {
        await emailjs.sendForm(
          "service_x2bz4ye",
          "template_y4k0jbv",
          form.current,
          "2MNHokRXo81Unx8wG"
        );

        setIsLoading(false);
        setSuccess(true);
        clearOutInputs();
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong, Try again...");
        clearOutInputs();
      }
    } else {
      alert("An Error Occurred! Please check your inputs.");
    }
  };

  const emailError = !emailState.valid && emailState.touched;
  const nameError = !nameState.valid && nameState.touched;
  const messageError = !messageState.valid && messageState.touched;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 15000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Wrapper>
      <form
        ref={form}
        onSubmit={sendEmailHandler}
        className="animate__animated animate__zoomIn contact__form"
      >
        {success && (
          <span className="animate__animated animate__zoomIn success">
            Thank you for contacting us! We will be in touch with you shortly.
          </span>
        )}

        <h1>Contact Me</h1>
        <div className="contact__input">
          <h2>Name</h2>
          <input
            name="user_name"
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => nameChangeHandler(e.target.value)}
            onBlur={() => nameDispatch({ type: "INPUT_BLUR", value: true })}
          />
          {nameError && (
            <span>Please provide a name with more than 3 letters.</span>
          )}
        </div>
        <div className="contact__input">
          <h2>Email</h2>
          <input
            name="user_email"
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => emailChangeHandler(e.target.value)}
            onBlur={() => emailDispatch({ type: "INPUT_BLUR", value: true })}
          />
          {emailError && <span>Please provide a valid email.</span>}
        </div>
        <div className="contact__input">
          <h2>Message</h2>
          <textarea
            name="message"
            rows="4"
            cols="50"
            placeholder="Enter Your Message"
            onChange={(e) => messageChangeHandler(e.target.value)}
            onBlur={() => messageDispatch({ type: "INPUT_BLUR", value: true })}
          />
          {messageError && (
            <span>Please provide a message with more than 4 letters.</span>
          )}
        </div>
        <button type="submit">{isLoading ? <Loader /> : "SUBMIT"}</button>
        {error && (
          <span className="animate__animated animate__zoomIn error">
            {error}
          </span>
        )}
      </form>
    </Wrapper>
  );
};

export default ContactScreen;
