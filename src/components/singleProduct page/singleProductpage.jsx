import "./singleProductpage.css"
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { BiStoreAlt } from 'react-icons/bi';
import { GrDeliver } from 'react-icons/gr';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useDispatch } from "react-redux"
import ProductAction from "./productAction";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SingleProduct() {
    const item = useSelector((data) => {
        return data.singlePR
    })
    const isauth = useSelector((data)=>{
        return data.AuthReducer.isAuth
    })
    const userData = useSelector((data)=>{
        return data.AuthReducer
    })
    console.log(isauth)
    let [avail, setAvail] = useState(false)
    let navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()
    const [obj, setObj] = useState({
        mainImageUrl: "",
        contextualImageUrl: "",
        typeName: "",
        imageAlt: "",
        name: "",
        salesPrice: "",
    })
    const [loading, setLoading] = useState(true)
    // let id = "60475019"

    useEffect(() => {
        fetch(`https://azure-rhinoceros-cap.cyclic.app/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.product);
                setLoading(false)
                setObj(data.product)
            })
    }, [])

    const [availability,setAvailbility] =useState('')

    function checkDelivery(){
        setAvailbility("Yes Delivery Available at your Location")
    }

console.log(availability);
    function addToCart() {
        let value = {
            id: obj.id,
            image: obj.mainImageUrl,
            name: obj.name,
            price: Math.trunc(obj.salesPrice.numeral) * 100 - 1,
            quantity: 1,
            measurement: obj.itemMeasureReferenceText,
            details: obj.imageAlt,
            user:
                {
                    user_id: userData.login.id,
                    user_name: userData.login.name
                },
        }

        axios.post(`https://azure-rhinoceros-cap.cyclic.app/cart`,value)
        .then((response)=>{
            if(isauth) dispatch(ProductAction(value))
        })
        .catch((error)=>{
            if(error.response.status == 403){
                setAvail(true)
            }
        })
    }
    localStorage.setItem("path",`/products/${id}`)
    return (
        <>
            {loading ? <Loading /> :
                <div className="Parent1">
                    <p style={{ color: "gray", fontSize: "14px" }}>Products {">"} Furniture {">"} {obj.typeName} {">"} {obj.imageAlt} </p>
                    <div className="Container1">
                        <div>
                            <div className="productImg1">
                                <img src={obj.mainImageUrl} alt={obj.imageAlt} />
                                <img src={obj.contextualImageUrl} alt={obj.imageAlt} />
                            </div>
                            <div className="about1">{obj.about}</div>
                        </div>

                        <div>
                            <h3 style={{ margin: "0px" }}>{obj.name}</h3>
                            <p style={{ marginTop: "5px", marginBottom: "5px" }}>{obj.typeName}</p>
                            <h3>Rs. <span style={{ fontSize: "30px", fontWeight: "bolder" }}>{Math.trunc(obj.salesPrice.numeral) * 100 - 1}</span></h3>
                            <p style={{ marginTop: "-10px", fontSize: "13px", color: "rgb(94, 94, 94)" }}>Price incl. of all taxes</p>
                            <p style={{ marginTop: "-10px", fontSize: "13px", color: "rgb(94, 94, 94)gray" }}>Price valid Dec 15 - Jan 15 or while supply lasts</p>
                            <span>
                                <div className="abc1">
                                    <p>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar /> 
                                        <FaStarHalf />
                                    </p>
                                    <p style={{ fontSize: "13px" }}>(142)</p>
                                </div>
                            </span>
                            <h4>How to get it</h4>
                            <div className="checkin1">
                                <div><p style={{ fontSize: "20px", marginLeft: "20px" }} ><BiStoreAlt /></p></div>
                                <div><p style={{ marginTop: "0px" }}>Check in-store stock</p></div>
                            </div>
                            <div className="pinCheck1">
                                <input type="text" placeholder="Enter pin code" />
                                <button onClick={checkDelivery} >Check</button>
                            </div>
                            <div className="delivey1">
                                <div><p style={{ fontSize: "25px" }} ></p></div>
                                <p></p>
                                <div><p style={{ marginTop: "10px", fontSize: "14px", color: "Green" }}>{availability}</p></div>
                            </div>
                            {/* Slidebar Using Bootstrap */}
                            <button onClick={addToCart} className="addToCart1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><HiOutlineShoppingCart /> Add to Cart</button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        

                                        <div style={{ color: "white", backgroundColor: "rgb(19, 80, 116)" }} class="modal-body">
                                            <h3 style={{}}>{isauth?(!avail ? obj.typeName + " Added to Cart" : "Item already added"):"You have to Login first"}</h3>
                                        </div>
                                        <div class="modal-footer">
                                            <button onClick={()=>{isauth ?  navigate("/cart"):navigate("/login")}} type="button" data-bs-dismiss="modal" class="btn btn-primary">{isauth?"Go to cart":"login"}</button>
                                            <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>}
        </>
    )
}

export default SingleProduct