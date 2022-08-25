import React from "react";
import SearchResultItem from "./SearchResultItem";

function SearchResult(props) {
  let { searchList, filterData } = props;
  //console.log("searchlist",searchList);
  return (
    <>
      <section className="col-12 col-lg-8 col-md-7">
        {searchList.map((item, index) => {
          return <SearchResultItem key={index} item={item} />;
        })}

        <div className="col-12 pagination d-flex justify-content-center">
          <ul className="pages">
            <li
              value="lt"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              &lt;
            </li>
            <li
              value="0"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              1
            </li>
            <li
              value="1"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              2
            </li>
            <li
              value="2"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              3
            </li>
            <li
              value="3"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              4
            </li>
            <li
              value="gt"
              name="page"
              onClick={(event) => filterData(event, "page")}
            >
              &gt;
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchResult;
