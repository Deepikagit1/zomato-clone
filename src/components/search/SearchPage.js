import React, { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from "../Header";

function SearchPage() {
  let [searchParams] = useSearchParams();
  let [filter, setFilter] = useState({});
  let [searchList, setSearchList] = useState([]);
  let [locationList, setLocationList] = useState([]);

  let getFilterDetails = async (_filter) => {
    _filter = { ..._filter };
    let URL = "http://localhost:4000/api/filter";

    //filter
    if (searchParams.get("meal_type"))
      _filter["mealtype"] = searchParams.get("meal_type");
    // console.log(filter);
    try {
      let response = await axios.post(URL, _filter);
      let data = response.data;
      setSearchList([...data.result]);
      console.log("data", data);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  let getLocationList = async () => {
    let URL = "http://localhost:4000/api/get-location";
    try {
      let response = await axios.get(URL);
      let data = response.data;
      setLocationList([...data.location]);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  let filterData = (event, option) => {
    let { value } = event.target;
    let _filter = {};
    switch (option) {
      case "location":
        _filter["location"] = value;
        break;
      case "sort":
        _filter["sort"] = value;
        break;
      case "cost":
        let cost = value.split("-");
        _filter["lcost"] = cost[0];
        _filter["hcost"] = cost[1];
        break;
      case "page":
        _filter["page"] = value;
        break;
    }
    setFilter({ ...filter, ..._filter });
    //console.log(filter);
  };

  console.log("locList", locationList);

  // mounting
  useEffect(() => {
    getLocationList();
  }, []);

  // mounting & update of filter
  useEffect(() => {
    getFilterDetails(filter);
  }, [filter]);

  return (
    <>
      {/* <main className="container-fluid"> */}
      <Header bgColor="bg-danger"/>
      <section className="row">
        <div className="col-12 mb-3">
          <p className="h3 ms-5 mt-4">Breakfast places in Mumbai</p>
        </div>
        <section className="col-12 col-lg-12 col-md-6 d-flex flex-wrap px-lg-5 px-md-5 mt-3">
          <SearchFilter locationList={locationList} filterData={filterData} />
          <SearchResult searchList={searchList} filterData={filterData} />
        </section>
      </section>
      {/* </main> */}
    </>
  );
}

export default SearchPage;

/* mealtype,
location,
cuisine,
lcost,
hcost,
page,
sort,
itemsPerPage, */
