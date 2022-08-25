import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResultItem(props) {
  let { item } = props;
  let navigate = useNavigate();
  let goToRestaurant = (id) => {
    navigate("/restaurant/" + id);
  };
  
  return (
    <>
      <div
        className="col-12 food-shadow p-4 hand-pointer mb-4"
        onClick={() => goToRestaurant(item._id)}
      >
        <div className="d-flex align-items-center">
          <img
            src={"/images/" + item.image}
            alt="fooditem"
            className="item-img"
          />
          <div className="ms-4">
            <p className="h4 fw-bold">{item.name}</p>
            <span className="fw-bold text-muted">{item.locality},</span>
            <p className="text-muted">{item.city}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex text-muted">
          <div>
            <p className="m-0">CUISINES:</p>
            <p className="m-0">COST FOR TWO:</p>
          </div>
          <div className="ms-5 fw-bold">
            <p className="m-0">
              {item.cuisine
                .reduce((pV, cV) => pV + ", " + cV.name, "")
                .substring(2)}
            </p>
            <p className="m-0">
              <i className="fa fa-inr" aria-hidden="true"></i>
              {item.min_price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResultItem;
