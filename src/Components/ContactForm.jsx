import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  // to store form data
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    // to prevent default behaviour
    e.preventDefault();

    const { name, email, subject, message } = data;

    const res = await fetch("/api/postcontactdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    });

    if (res.status === 201) {
      toast.success("Your message has been submitted");
      setData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="contactUsForm">
      <ToastContainer />
      <div className="contactUsFormIntro">
        <p className="contactUsFormTitle">
          CONTACT PARENTS FOR <br /> CLIMATE AOTEAROA
        </p>
        <p>hello@parentsforclimatenz.org</p>
      </div>
      <div className="contactUsFormInputs">
        <form onSubmit={postData}>
          <div>
            <label htmlFor="name">NAME*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
              required
              onChange={handleInputs}
              value={data.name}
            />
          </div>
          <div>
            <label htmlFor="email">EMAIL*</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email..."
              required
              onChange={handleInputs}
              value={data.email}
            />
          </div>
          <div>
            <label htmlFor="subject">SUBJECT</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter your subject..."
              required
              onChange={handleInputs}
              value={data.subject}
            />
          </div>
          <div>
            <label htmlFor="message">MESSAGE</label>
            <textarea
              type="text"
              id="message"
              name="message"
              rows={5}
              placeholder="Enter your message..."
              required
              onChange={handleInputs}
              value={data.message}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
