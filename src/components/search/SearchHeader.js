import React from "react";

function SearchHeader(){
    return(
        <>
         <section className="row d-flex justify-content-center bg-danger">
          <div className="col-10 main-header d-flex justify-content-between align-items-center py-2">
            <p className="m-0">e!</p>
            <div>
              <button className="btn text-white">Login</button>
              <button className="btn btn-outline-light">Create an Account</button>
            </div>
          </div>
        </section>
        </>
    )
}

export default SearchHeader;