import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProListing.css"
import { useNavigate } from "react-router-dom";


function ProductComponent({ sort, products, category, price }) {
  const navigate = useNavigate()
  let abc = false;
  // if(sort!==""){
  //   products.sort((a,b)=>{
  //     if(sort === "lth") return a.salesPrice.numeral- b.salesPrice.numeral
  //     else if(sort === 'htl') return b.salesPrice.numeral- a.salesPrice.numeral
  //   })
  // }
  // localStorage.setItem("path","/")
  return (
    <>
      {
        products.length < 1 ? <div style={{ textAlign: "center",margin:"auto",color:"red",marginBottom:"30px" }}>
          <h1>No item found</h1>
        </div> :

          <div className="container">
            {
              products.filter((elem) => {
                return elem.typeName
              })
                .map((elem) => {
                  abc = true
                  return (
                    <div key={elem._id} onClick={() => { navigate(`/products/${elem._id}`) }} className="singleContainer">
                      <div style={{ marginBottom: "35px" }}>
                        <img width="100%" src={elem.mainImageUrl} alt={elem.typeName} />
                      </div>
                      <div>
                        <h4 style={{ fontWeight: "bold" }}>{elem.name}</h4>
                        <p style={{ color: "rgb(93, 93, 93)", fontSize: "13px", height: "25px" }}>{elem.mainImageAlt}</p>
                        <p style={{ textDecoration: "line-through" }}><span style={{ fontSize: "14px" }} >Rs.</span>{Math.trunc(((elem.salesPrice.numeral) * 100 - 1) * 1.1)}</p>
                        <h4 style={{ fontWeight: "bolder", marginTop: "-10px" }}><span style={{ fontSize: "14px" }} >Rs.</span>{Math.trunc(elem.salesPrice.numeral) * 100 - 1}</h4>
                        <p style={{ bottom: "10px", fontSize: "14px", color: "rgb(93, 93, 93)" }}>Price valid Dec 15 - Jan 15</p>
                      </div>
                    </div>
                  )
                })
            }
          </div>
      }
    </>
  )

}

export default ProductComponent;

