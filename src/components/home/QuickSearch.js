import React, { useEffect, useState } from "react";
import axios from "axios";
import QuickSearchItem from "./QuickSearchItem";

function QuickSearch(){
    let [mealType, setMealType] = useState([]);
    const getQuickSearchData = async ()=>{
        const URL = "http://localhost:4000/api/get-meal-type";
        try {
            let response =await axios.get(URL);
            let { status, meal_type } = response.data;  
            if(status){
                setMealType([...meal_type]);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
      
    }
    useEffect(()=>{
        getQuickSearchData();
    },[]);
    return (
        <>
        <section className="row d-flex justify-content-center mt-3">
        <div className="col-11 col-lg-10 col-md-11">
          <p className="h4 fw-bold blue-color">Quick Searches</p>
          <p className="text-muted">Discover restaurants by type of meal</p>
        </div>
    </section>  
            {/* <!--********  food items  ********* --> */}
     <section className="row d-lg-flex justify-content-center flex-wrap mb-5">
        {mealType.map((meal)=>{
            return <QuickSearchItem meal={meal} key={meal._id} />;
        }) 
        }   
     </section>
        </>
    )
}

export default QuickSearch;