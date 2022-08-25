import React from "react";
import { useNavigate } from "react-router-dom";

function QuickSearchItem(props) {
  let { meal } = props;
  let navigate = useNavigate();
  let goToQuickSearch = (id) => {
    navigate("/quick-search?meal_type=" + id);
  };
  return (
    <>
      <div
        className="col-10 col-lg-3 col-md-5 d-flex shadow item hand-pointer p-2 me-4 mt-4"
        onClick={() => goToQuickSearch(meal.meal_type)}
      >
        <div>
          <img
            className="food-item-img mt-1"
            src={`/images/${meal.image}`}
            alt={meal.name}
          />
        </div>
        <div className="p-2 blue-color">
          <p className="fw-bold h5">{meal.name}</p>
          <p className="text-muted m-0 food-item-desc">{meal.content}</p>
        </div>
      </div>
    </>
  );
}

export default QuickSearchItem;
