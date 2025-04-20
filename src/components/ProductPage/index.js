import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProductDataSuccess } from "../../redux/actions/products";
import styled from "styled-components";
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import { ProductDropdown } from "../elements/dropdowns/ProductDropdown";

const Stylediv=styled.div`
    font-family: sans-serif;

    #topn1{
        width: 100%;
        height: 5vh;
        @media (max-width:415px){
          height:3vh;
          margin-top:1.5%;
          padding-bottom:2%;
          padding-top:2%;
      }
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color:rgba(249, 249, 249, 255) ;
        // background-color: grey; 
        
      }
      #topn12{
        margin-left: 7%;
        width: 36%;
        font-size: 1.2vw;
        @media (max-width:415px){
          margin-left: 4%;
          width: 48%;
          font-size: 2.5vw;
        }
        height: 5vh;
        display: flex;
        color: black;
        justify-content: space-between;
        align-items: center;
        //  border: 1px solid red; 
      }
      #topn13{
        margin-right: 5%;
        width: 16%;
        @media (max-width:415px){
          margin-right: 0%;
          width: 35%;
        }
        height: 5vh;
        // color: black;
        // display: flex;
        // justify-content: space-between;
        align-items: center;
      //  border: 1px solid red; 
      }

    .productBox {
        width:85%;
        border: 1px solid blue;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    }
    
    .nav1{
       width: 100%;
       height: 6vh;
       margin-top: 1vh;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       align-items: center;
       padding-left:8%;
 
       background-color: #ffeded;
   } 
   .filter{
      
       color: white;
       width: 17%;
       height: 3vh;
       font-size:1.2vw;
    margin-right: 18%;
    border: 2px solid teal;
    background-color: teal;
    border-radius: .3vw;
   } 
   .sort{
    width: 17%;
       height: 3vh;
       font-size:1.2vw; 
       color: white;
       border: 2px solid teal;
       background-color: teal;
       border-radius: .3vw;
   }
   .sbox{
       display: flex;
       flex-direction: row;
    width: 45%;
       height: 4.3vh; 
       /* border: 2px solid red; */
   }
   .in{
       width: 88%;
       height: 3.5vh;
       outline: none;
   }
   #btn{
       width: 10%;
       height: 4.3vh;
       color: white;
       font-size: 1vw;
       background-color: black;
       border: 2px solid black;
   }
   #btn:hover{
     background-color: white;
     color: red;
   }

.box1{
    border:1px solid red;
    width:78%;
    height:90vh;
    display: grid;
    justify-items:center;
    grid-template-columns: repeat(3, 32%);
    @media (max-width:415px){
        width:75%;
        grid-template-columns: repeat(1, 95%);
        grid-gap: 2%; 
    }
    grid-gap: 2%;
    // padding-left: 5%;
    overflow-y: scroll;
    margin: auto;
    margin-top: 3vh;
    border-bottom: .1vw solid grey;
}
a{
    text-decoration: none;
    color: grey;
}
p{
    font-size: 1vw;
    @media (max-width:415px){
     
        font-size: 2.7vw;
    }
}

.card{
    width: 95%;
    height: 60vh;
    @media (max-width:415px){
        width: 100%;
        height:30vh;
        padding-bottom: 3%;
    }
   display: flex;
   flex-direction: column;
   justify-content: space-between;
    padding-bottom: 5%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    // border: 1px solid red; 
}
.img1{
    width: 100%;
    height: 82%;
    @media (max-width:415px){
        height: 80%;
    }
}
#btndiv1{
    border: 1px solid red; 
    // width: 93%;
    // height: 7%;
    margin: auto;
    @media (max-width:415px){
        width: 100%;
        height:10%;
        margin-left:0%;
    }
    // vertical-align:bottom;
    // margin-top: 10% ;
    // display: flex;
    // margin-left:4%;
    // flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    //  border: 1px solid red; 
}
.btn1{
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    font-size: .9vw;
    font-weight:600;
    cursor: pointer;
    @media (max-width:415px){
        font-size: 2.5vw;
    }
    width: 48%;
    margin: auto;
    height: 9%;
    color: #779853;
    background-color: #C7D4B6;
    border-radius: .5vw;
    border: none;
}
// .btn1:hover{
//    background-color: white;
//    color: red;
// }

.tit{
    margin-left:4%;
    line-height:3vh;
    @media (max-width:415px){
        line-height:1.5vh;
    }
}
.pric{
    margin-left:4%;
    line-height:0vh;
}
.leftsort{
    border: 1px solid red;
    width:20%;
    @media (max-width:415px){
        width:17%;
    }
    margin-top: 3vh;
    height:90vh;
    // float:left;
    // display:flex;
    // flex-direction: column;
    // align-items: center;
    // border-right: .1vw solid grey;
    // margin: auto;
}
.sortbyprice{
    height:5%;
    cursor: pointer;
    @media (max-width:415px){
        height:3%;
        font-size: 3.6vw;
        border-radius:.5vw;
    }
    margin-top:6%;
    color:white;
    font-size: 1.2vw;
    background-color: teal;
    border-radius:.3vw;
}
// ******************//
.pagination {
    display: flex;
    width: 100%;
    margin-top: 20px;
    justify-content: center;
  }
  .paginationButtonPrevious,
  .paginationButtonNext {
    color: green;
    font-weight:bold;
    padding-left: 2%;
    padding-top: 5px;
  }
  .pageNumber {
    margin-left: 2%;
    padding: 0.5% 1%;
    border-radius: 10%;
    border: 1px solid #9FA4A4;
    background-color: white;
    /* width: 15px;
    height: 19px; */
    text-align: center;
  }
  .paginationButtonPrevious:hover,
  .paginationButtonNext:hover {
    cursor: pointer;
  }
  .pageNumber:hover {
    cursor: pointer;
    color: white;
    background-color: #557D2F;
  }
  .sbox{
    width:66%;
    height:4.5vh;
    // padding-left: 1%;
    outline: none;
    font-size: 1.2vw;
    border: .1vw solid grey;
    background-color: rgba(249, 249, 249, 255);
    @media (max-width:415px){
        width:57%;
        height:2.5vh;
        font-size: 2.2vw;
        top: -10.8vh;
    }
    position: relative;
    top: -11.7vh;

    right: -13.5%;
  }
  .sbtn1{
    width:6%;
    height:5vh;
    cursor: pointer;
    @media (max-width:415px){
        width:11.9%;
        height:3.1vh;
        right: -42%;
        top: -14vh;
        font-size: 2.5vw;
        border: .1vw solid black;
    }
    font-size: .8vw;
    position: relative;
    top: -16.7vh;
    right: -59.4%;
    color: white;
    background-color: black;
  }
//   .sbtn1:hover{
//     color:red;
//   }
  .cardText{
    // border: .1vw solid green;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 4% 0 4%;
    margin: 0 0 0 0;
  }
  .category{
    padding: 0 4% 2% 4%;
    margin: 0 0 0 0;
    // border: .1vw solid red;
    font-weight: 600;
    color: #668A43;
  }
  .usPrice{
    font-weight: 600;
    color: #668A43;
  }
  .rating{
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;

const ProductPage = (props) => {
    const [page, setPage] = useState(1);
    const [tpage, setTpage] =useState(0);
    const [filters, seFilters] = useState({});
    const[wishlisted, setWishlisted] = useState(false);
    const {fetchProductDataList} =useSelector((store)=> store);
    const {data } = fetchProductDataList;

    const dispatch = useDispatch();

useEffect(()=>{
    console.log("pageghh", filters, "fgh",page)
    fetchProductDataRequest({...filters, page: page});
}, [page])

    const fetchProductDataRequest = (params) => {
        // setTime(10)
        // dispatch(getDataLoading());
        // console.log("params", params)
        axios.get(`http://localhost:9000/api/product/list`, {params}).then(({data})=>{
              
            dispatch(getProductDataSuccess(data.products));
            setTpage(data.totalPages);
            console.log("helo",data);
            // setSdata(data.products)
        }).catch((error)=>{
            console.log(error.response)
        })
    };

    const handleSortChange = (sortValue) => {
        console.log("Selected sort:", sortValue);
        // Dispatch Redux action or update state here
      };

    console.log("pdata", fetchProductDataList);

    if (data.loading || data.data === undefined) {
        return (
            <h1 style={{ marginLeft: "35%", marginTop: "11%", fontSize: "2vw" }}>Loading...</h1>
        )
    } else {
        return (
            <Stylediv>
                
                 <div id="topn1">
          <div id="topn12">
            <p>Online Products</p>
            <p>Become a Seller</p>
          </div>
          <div id="topn13">
            
             <ProductDropdown onSortChange={handleSortChange} />
          </div>
        </div>

                <div className="productBox">
                 <div className="leftsort">
                    <div>
      <select name="" className="sortbyprice">
        <option value="">Sort by price</option>
        <option value="low">Low to high</option>
        <option value="high">High to low</option>
      </select>
      </div>
      <div>
      <select name="" className="sortbyprice">
        <option value="">Alphabetical order</option>
        <option value="ascending">A to Z</option>
        <option value="descending">Z to A</option>
      </select>
      </div>
      <div>
      <select name="" className="sortbyprice" >
        <option value="">Filter by price</option>
        <option value="0to500">0 to Rs.500</option>
        <option value="500to1000">Rs.500 to Rs.1000</option>
        <option value="1000to1500">Rs.1000 to Rs.1500</option>
        <option value="1500to2000">Rs.1500 to Rs.2000</option>
      </select>
      </div>
      </div>
        <div className="box1">
            {/**code for mapping the data to show on browser**/}
     {data.data.length&&data?.data.map((item)=>{
         return (
             <div key={item._id} className="card">
             <img className="img1" srcSet={item.image} alt="" />
             <div style={{position: "relative", border: "1px solid #557D2F", borderRadius: "60%", bottom:"38vh", backgroundColor:"white", height:"3vh", alignItems:"center", padding:"5px", left:"220px", width:"1.7vw", cursor:"pointer"}}>
             <FavoriteRoundedIcon style={{position: "relative", color:`${wishlisted? "red": "#557D2F"}`}} />
             </div>
             <div className="cardText">
             <p>{item.title}</p>
             <div className="rating">
             <StarRateIcon style={{ color: 'gold', fontSize: "18px" }} />
                <p>{item.rating}</p>
             </div>
                                
                                <p className="usPrice">{item.price} USD</p>
             </div>
                               
                                <p className="category">{item.category}</p>
            {/* <div id="btndiv1"> */}
            <button className="btn1" onClick={()=>{
                
                var result = window.confirm("Are you sure, want to add it to cart?");
                // if (result) {
                // Handleitem(item._id);
                // }
                }}>Add To Cart
                <LocalMallIcon style={{ fontSize: "15px" }} />
                </button>
            {/* </div> */}
             </div>
         )
     })}

        </div>
        </div>
        <br />

        <div className="pagination">
        <div className="paginationButtonPrevious" style={{color:(page===1)?'#DEE1E1':""}} onClick={()=>{
          if(page>1)
          setPage(page-1);
        
        }}>
            <KeyboardBackspaceIcon />
        </div>
        <div className="pageNumber" style={{color:(page===1)?'white':"",backgroundColor:(page===1)?'#557D2F':""}} onClick={()=>{
          setPage(1)
        }}>1</div>
        <div className="pageNumber" style={{color:(page===2)?'white':"",backgroundColor:(page===2)?'#557D2F':""}} onClick={()=>{
          
          setPage(2);
        
        }}>2</div>
        <div className="pageNumber" style={{color:(page===3)?'white':"",backgroundColor:(page===3)?'#557D2F':""}} onClick={()=>{
          setPage(3);
        
        }}>3</div>
        <div className="pageNumber" style={{color:(page===4)?'white':"",backgroundColor:(page===4)?'#557D2F':""}} onClick={()=>{
          setPage(4);
        
        }}>4</div>
        <div className="pageNumber" style={{color:(page===5)?'white':"",backgroundColor:(page===5)?'#557D2F':""}} onClick={()=>{
          setPage(5);
        
        }}>5</div>
        <div className="pageNumber" style={{color:(page===6)?'white':"",backgroundColor:(page===6)?'#557D2F':""}} onClick={()=>{
          setPage(6);
        
        }}>6</div>
        <div className="pageNumber" style={{color:(page===7)?'white':"",backgroundColor:(page===7)?'#557D2F':""}} onClick={()=>{
          setPage(7);
        
        }}>7</div>
        <div className="pageNumber" style={{color:(page===8)?'white':"",backgroundColor:(page===8)?'#557D2F':""}} onClick={()=>{
          setPage(8);
        
        }}>8</div>
   
        <div className="paginationButtonNext" style={{color:(page===tpage)?'#DEE1E1':""}} onClick={()=>{
          
          setPage(page+1);
        
        }}>
            <EastIcon />
        </div>
      </div>
      <br />
      <br />
            </Stylediv>
        )
    }
}

export default ProductPage;