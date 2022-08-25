import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Header from "../Header";

function Restaurant() {
  let userNameRef = useRef();
  let emailRef = useRef();
  let addressRef = useRef();
  let params = useParams();
  let initRest = {
    aggregate_rating: 0,
    city: "",
    city_id: 0,
    contact_number: 0,
    cuisine: [],
    cuisine_id: [],
    image: "",
    locality: "",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "-1",
  };
  let [rDetails, setRDetails] = useState({ ...initRest });
  let [isContact, setIscontact] = useState(false);
  let [menuItem, setMenuItem] = useState([]);
  let [subTotal, setSubTotal] = useState(0);
  let getRestaurantDetails = async () => {
    let URL = "http://localhost:4000/api/get-restaurant-by-id/" + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        setRDetails({ ...data.result });
      } else {
        setRDetails({ ...initRest });
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  let getMenuList = async () => {
    let URL = "http://localhost:4000/api/get-menu-item?rid=" + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        setMenuItem([...data.menu_items]);
      } else {
        alert("menu items not found");
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  let incMenuItemCount = (index) => {
    let _menuItem = [...menuItem];
    _menuItem[index].qty += 1;
    setMenuItem(_menuItem);
  };
  let decMenuItemCount = (index) => {
    let _menuItem = [...menuItem];
    _menuItem[index].qty -= 1;
    setMenuItem(_menuItem);
  };
  //on mounting
  useEffect(() => {
    getRestaurantDetails();
  }, []);
  useEffect(() => {
    let subTotal = menuItem.reduce((pValue, cValue) => {
      return pValue + cValue.price * cValue.qty;
    }, 0);
    setSubTotal(subTotal);
  }, [menuItem]);
  console.log(menuItem);
  return (
    <>
      <div
        className="modal fade"
        id="slideShow"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            
            <div className="modal-body">
              <Carousel>
                {rDetails.thumb.map((value, index) => {
                  return (
                    <div key={index}>
                      <img src={"/images/" + value} alt="" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
           
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                {rDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {menuItem.map((item, index) => {
                return (
                  <div className="row p-2" key={index}>
                    <div className="col-8">
                      <p className="mb-1 h6">{item.name}</p>
                      <p className="mb-1">{item.price}</p>
                      <p className="small text-muted">{item.description}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                      <div className="menu-food-item">
                        <img src={"/images/" + item.image} alt="" />
                        {item.qty === 0 ? (
                          <button
                            className="btn btn-primary btn-sm add"
                            onClick={() => incMenuItemCount(index)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="order-item-count section ">
                            <span
                              className="hand-pointer"
                              onClick={() => decMenuItemCount(index)}
                            >
                              -
                            </span>
                            <span>{item.qty}</span>
                            <span
                              className="hand-pointer"
                              onClick={() => incMenuItemCount(index)}
                            >
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className=" p-0 my-2" />
                  </div>
                );
              })}

              {subTotal === 0 ? null : (
                <div className="d-flex justify-content-between">
                  <h3>Subtotal {subTotal}</h3>
                  <button
                    className="btn btn-danger"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                {rDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your full name"
                    value="Deepika"
                    ref={userNameRef}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter emailId"
                    ref={emailRef}
                    value="deepika@gmail.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Enter your address"
                    value="hyderabad"
                    ref={addressRef}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button
                className="btn btn-success"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
      <Header bgColor="bg-danger"/>
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="restaurant-main-image position-relative">
                <img src={"/images/" + rDetails.image} alt="" />
                <button
                  className="btn btn-outline-light position-absolute btn-gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#slideShow"
                >
                  Click To Get Image Gallery
                </button>
              </div>
            </div>
            <div className="col-12">
              <h3 className="mt-4">{rDetails.name}</h3>
              <div className="d-flex justify-content-between">
                <ul className="list-unstyled d-flex gap-3">
                  <li
                    className={
                      isContact === false
                        ? "border-bottom border-3 border-danger pointer-cursor"
                        : "hand-pointer"
                    }
                    onClick={() => setIscontact(false)}
                  >
                    Overview
                  </li>
                  <li
                    className={
                      isContact === true
                        ? "border-bottom border-3 border-danger pointer-cursor"
                        : "hand-pointer"
                    }
                    onClick={() => setIscontact(true)}
                  >
                    Contact
                  </li>
                </ul>
                <a
                  className="btn btn-danger align-self-start"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                  onClick={getMenuList}
                >
                  Place Online Order
                </a>
              </div>
              <hr className="mt-0" />
              {isContact === false ? (
                <div className="over-view">
                  <p className="h5 mb-4">About this place</p>

                  <p className="mb-0 fw-bold">Cuisine</p>
                  <p>
                    {rDetails.cuisine
                      .reduce((pV, cV) => pV + ", " + cV.name, "")
                      .substring(2)}
                  </p>

                  <p className="mb-0 fw-bold">Average Cost</p>
                  <p>₹{rDetails.min_price} for two people (approx.)</p>
                </div>
              ) : (
                <div className="over-view">
                  <p className="mb-0 fw-bold">Phone Number</p>
                  <p>+{rDetails.contact_number}</p>

                  <p className="mb-0 fw-bold">Address</p>
                  <p>
                    {rDetails.locality},{rDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurant;
