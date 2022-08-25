import React from "react";

function SearchFilter(props) {
  let { locationList, filterData } = props;
  return (
    <>
      <section className="col-12 col-lg-3 col-md-4 food-shadow me-4 p-3">
        <div className="d-flex justify-content-between">
          <p className="fw-bold m-0">Filters</p>
          <button
            className="d-lg-none d-md-none btn"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFilter"
            aria-controls="collapseFilter"
          >
            <span className="fa fa-eye"></span>
          </button>
        </div>
        <div className="collapse show" id="collapseFilter">
          <div>
            <label htmlFor="" className="form-label">
              Select Location
            </label>
            <select
              className="form-select form-control-sm"
              onChange={(event) => filterData(event, "location")}
            >
              <option value="">--select location--</option>
              {locationList.map((location, index) => {
                return (
                  <option key={index} value={location.location_id}>
                    {location.name},{location.city}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="fw-bold my-2">Cuisine</p>
          <div>
            <div>
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                North Indian
              </label>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                South Indian
              </label>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                Chinese
              </label>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                Fast Food
              </label>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1">
                Street Food
              </label>
            </div>
          </div>
          <p className="fw-bold my-2">Cost for Two</p>
          <div>
            <div>
              <input
                type="radio"
                value="0-500"
                name="cost"
                onChange={(event) => filterData(event, "cost")}
              />
              <label htmlFor=""> Less than ` 500</label>
            </div>
            <div>
              <input
                type="radio"
                value="500-1000"
                name="cost"
                onChange={(event) => filterData(event, "cost")}
              />
              <label htmlFor="">` 500 to ` 1000</label>
            </div>
            <div>
              <input
                type="radio"
                value="1000-1500"
                name="cost"
                onChange={(event) => filterData(event, "cost")}
              />
              <label htmlFor="">` 1000 to ` 1500</label>
            </div>
            <div>
              <input
                type="radio"
                value="1500-2000"
                name="cost"
                onChange={(event) => filterData(event, "cost")}
              />
              <label htmlFor="">` 1500 to ` 2000</label>
            </div>
            <div>
              <input
                type="radio"
                value="2000-200000"
                name="cost"
                onChange={(event) => filterData(event, "cost")}
              />
              <label htmlFor="">` 2000+</label>
            </div>
          </div>
          <p className="fw-bold my-2">Sort</p>
          <div>
            <div>
              <input
                type="radio"
                value="1"
                name="sortByPrice"
                onChange={(event) => filterData(event, "sort")}
              />
              <label htmlFor=""> Price low to high</label>
            </div>
            <div>
              <input
                type="radio"
                value="-1"
                name="sortByPrice"
                onChange={(event) => filterData(event, "sort")}
              />
              <label htmlFor=""> Price high to low</label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SearchFilter;
