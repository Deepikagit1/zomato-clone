import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";

function Wallpaper() {
  let navigate = useNavigate();
  let locationRef = useRef();
  let [locList, setLocList] = useState([]);
  let [selectLoc, setSelectLoc] = useState(null);
  let [restaurantList, setRestaurantList] = useState([]);
  let [restDisable, setRestDisabled] = useState(true);

  let getLocationList = async (event) => {
    let city = event.target.value;
    setSelectLoc(null);
    setRestDisabled(true);
    if (city === "" || city.length < 2) {
      setLocList([]);
      return false;
    }
    let URL = "http://localhost:4000/api/get-location-by-city?city=" + city;
    try {
      let response = await axios.get(URL);
      let { location } = response.data;
      setLocList([...location]);
    } catch (error) {
      alert(error);
      console(error);
    }
  };
  let selectLocation = (location) => {
    location = JSON.parse(location);
    locationRef.current.value = `${location.name}, ${location.city}`;
    setSelectLoc({ ...location });
    setRestDisabled(false);
    setLocList([]);
  };
  let getRestaurantDetails = async (event) => {
    let restaurant = event.target.value;
    if (restaurant === "" || restaurant.length < 2) {
      setRestaurantList([]);
      return false;
    }
    let URL = `http://localhost:4000/api/get-restaurant-by-location-id?lid=${selectLoc.location_id}&rest=${restaurant}`;
    try {
      let response = await axios.get(URL);
      let { result } = response.data;
      setRestaurantList([...result]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let goToRestaurant = (id)=>{
    navigate('/restaurant/'+ id);
  }
  return (
    <>
      <section className="row p-sm-4 p-lg-0">
        <div className="col-12 bg-image">
          <Header bgColor=" "/>
          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-3 mt-sm-4">
            <p className="logo pt-lg-2 pt-sm-2 fw-bold">e!</p>
          </div>
          <p className="text-white h3 text-center my-lg-3 mx-sm-4 fw-bold">
            Find the best restaurants, cafés, and bars
          </p>
          {/* <!----*** search bars *** --> */}
          <div className="row d-flex justify-content-center text-white mt-3">
            <div className="col-12 col-lg-6 col-md-12">
              <div className="row d-flex justify-content-center">
                <div className="col-10 col-lg-5 col-md-4 search pt-sm-2 pt-md-4 position-relative mt-sm-2">
                  <input
                    type="text"
                    className="form-control py-3 py-lg-2 ps-3 py-sm-3 border"
                    placeholder="search location"
                    onChange={getLocationList}
                    ref={locationRef}
                  />
                  <ul className="list-group col-11 col-md-11 col-lg-11 position-absolute hand-pointer">
                    {locList.map((location) => {
                      return (
                        <li
                          className="list-group-item"
                          key={location._id}
                          onClick={() =>
                            selectLocation(`${JSON.stringify(location)}`)
                          }
                        >
                          {location.name},{location.city}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="col-10 col-lg-7 col-md-6 position-relative search pt-sm-4 pt-md-4 p-lg-4 mt-5 mt-sm-2">
                  <span
                    className="text-muted icon position-absolute mt-3 mt-sm-3 mt-lg-2 ms-3 ms-lg-3 ms-md-3"
                    aria-hidden="true"
                  >
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border position-relative py-3 py-sm-3 py-lg-2 px-5 px-lg-5 px-md-5"
                    placeholder="Search for restaurants"
                    onChange={getRestaurantDetails}
                    disabled={restDisable}
                  />
                  <ul className="list-group col-11 col-md-11 col-lg-10 position-absolute hand-pointer">
                    {restaurantList.map((restaurant) => {
                      return (
                        <li className="list-group-item p-0" key={restaurant._id} onClick={()=>goToRestaurant(restaurant._id)}>
                          <div className="d-flex">
                            <img
                              className="p-2 dropdownimg"
                              src={`/images/${restaurant.image}`}
                              alt="item"
                            />
                            <div className="p-2">
                              <p className="h6 blue-color fw-bold m-0">
                                {restaurant.name}
                              </p>
                              <p className="serachLocation m-0 text-muted">
                                {restaurant.locality}, {restaurant.city}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wallpaper;
