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
import { SideFilter } from "../filters/SideFilters";
import SpinLoader from "../elements/loading/SpinLoader";
import EmptyPage from "../elements/emptyDataUI/EmptyPage";

const ProductPage = (props) => {
  const [page, setPage] = useState(1);
  const [tpage, setTpage] = useState(0);
  const [filters, seFilters] = useState({});
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);


  const { fetchProductDataList } = useSelector((store) => store);
  const { data } = fetchProductDataList;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("pageghh", filters, "fgh", page)
    fetchProductDataRequest({ ...filters, page: page });
  }, [page, filters])

  const fetchProductDataRequest = (params) => {
    setLoading(true);
    axios.get(`http://localhost:9000/api/product/list`, { params }).then(({ data }) => {

      dispatch(getProductDataSuccess(data.products));
      setTpage(data.totalPages);
      setResults(data.totalProducts);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    })
  };

  const handleSortChange = (sortValue) => {
    seFilters({ ...filters, sortBy: sortValue });
  };

  const handlecategoryFilter = (catValues, priceRange) => {
    const [minSetPrice, maxSetPrice] = priceRange;
    seFilters({ ...filters, category: catValues.join(','), minPrice: minSetPrice, maxPrice: maxSetPrice });
  };

  const handleAddToCart = (item) => {
    const payload = {
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating,
      productId: item._id
    }

    axios.post(`http://localhost:9000/api/cart/create`, payload).then(({ data }) => {

      alert(`Added successfully`);
    }).catch((err) => {
      console.log("err: ", err);
      alert(`${err.response.data.message}`);
    })
  }

  return (
    <Stylediv>

      <div className="productBox">
        <div className="leftsort">
          <SideFilter handlecategoryFilter={handlecategoryFilter} />
        </div>
        <div style={{ width: "77%" }}>
          <div id="topn1">
            <div id="topn12">
              <p>{(results === 0) ? "There is no data" : `Showing ${(page - 1) * 10 + 1} to ${results > page * 10 ? page * 10 : results} of ${results} results`}</p>
            </div>
            <div id="topn13">

              <ProductDropdown onSortChange={handleSortChange} />
            </div>
          </div>
          {/* Loader */}
          {(loading || data.data === undefined) ? (
            <SpinLoader />
          ) : (
            <div>
              {(data.data.length === 0 || data.data === undefined) ? (
                <EmptyPage fetchProductDataRequest={fetchProductDataRequest} />
              ) : (
                <div className="box1">
                  {/**data mapping**/}
                  {data.data.length && data?.data.map((item) => {
                    return (
                      <div key={item._id} className="card">
                        <img className="img1" srcSet={item.image} alt="" />
                        <div className="wishList">
                          <FavoriteRoundedIcon style={{ position: "relative", color: `${wishlisted ? "red" : "#557D2F"}` }} />
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
                        <button className="btn1" onClick={() => {

                          var result = window.confirm("Are you sure, want to add it to cart?");
                          if (result) {
                            handleAddToCart(item);
                          }
                        }}>Add To Cart
                          <LocalMallIcon style={{ fontSize: "15px" }} />
                        </button>
                        {/* </div> */}
                      </div>
                    )
                  })}

                </div>
              )}

            </div>
          )}

        </div>
      </div>
      <br />

      <div className="pagination">
        <div className="paginationButtonPrevious" style={{ color: (page === 1) ? '#DEE1E1' : "" }} onClick={() => {
          if (page > 1)
            setPage(page - 1);

        }}>
          <KeyboardBackspaceIcon />
        </div>
        <div className="pageNumber" style={{ color: (page === 1) ? 'white' : "", backgroundColor: (page === 1) ? '#557D2F' : "" }} onClick={() => {
          setPage(1)
        }}>1</div>
        <div className="pageNumber" style={{ color: (page === 2) ? 'white' : "", backgroundColor: (page === 2) ? '#557D2F' : "", pointerEvents: (2 > tpage) && 'none' }} onClick={() => {

          setPage(2);

        }}>2</div>
        <div className="pageNumber" style={{ color: (page === 3) ? 'white' : "", backgroundColor: (page === 3) ? '#557D2F' : "", pointerEvents: (3 > tpage) && 'none' }} onClick={() => {
          setPage(3);

        }}>3</div>
        <div className="pageNumber" style={{ color: (page === 4) ? 'white' : "", backgroundColor: (page === 4) ? '#557D2F' : "", pointerEvents: (4 > tpage) && 'none' }} onClick={() => {
          setPage(4);

        }}>4</div>
        <div className="pageNumber" style={{ color: (page === 5) ? 'white' : "", backgroundColor: (page === 5) ? '#557D2F' : "", pointerEvents: (5 > tpage) && 'none' }} onClick={() => {
          setPage(5);

        }}>5</div>
        <div className="pageNumber" style={{ color: (page === 6) ? 'white' : "", backgroundColor: (page === 6) ? '#557D2F' : "", pointerEvents: (6 > tpage) && 'none' }} onClick={() => {
          setPage(6);

        }}>6</div>
        <div className="pageNumber" style={{ color: (page === 7) ? 'white' : "", backgroundColor: (page === 7) ? '#557D2F' : "", pointerEvents: (7 > tpage) && 'none' }} onClick={() => {
          setPage(7);

        }}>7</div>
        <div className="pageNumber" style={{ color: (page === 8) ? 'white' : "", backgroundColor: (page === 8) ? '#557D2F' : "", pointerEvents: (8 > tpage) && 'none' }} onClick={() => {
          setPage(8);

        }}>8</div>

        <div className="paginationButtonNext" style={{ color: (page >= tpage) ? '#DEE1E1' : "", pointerEvents: (page >= tpage) && 'none' }} onClick={() => {

          setPage(page + 1);

        }}>
          <EastIcon />
        </div>
      </div>
      <br />
      <br />
    </Stylediv>
  )
}

export default ProductPage;

const Stylediv = styled.div`
    font-family: sans-serif;

    #topn1{
        width: 100%;
        height: 7vh;
        float: right;
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
        
      }
      #topn12{
        margin-left: 1%;
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
      }
      #topn13{
        @media (max-width:415px){
          margin-right: 0%;
          width: 35%;
        }
        height: 5vh;
        align-items: center;
      }

    .productBox {
        width:87%;
    display: flex;
    flex-direction: row;
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
    width:100%;
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
    overflow-y: scroll;
    margin: auto;
    border-bottom: .1vw solid grey;
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
}
.img1{
    width: 100%;
    height: 40vh;
    @media (max-width:415px){
        height: 80%;
    }
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
    width:23%;
    @media (max-width:415px){
        width:17%;
    }
    height:95vh;
}
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
  .cardText{
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
  .wishList{
    position: relative;
    border: 1px solid #557D2F;
     border-radius: 60%;
     bottom:38vh;
      background-color: white;
      height:3vh;
      align-items:center;
       padding:5px;
       left:220px;
       width:1.7vw;
       cursor:pointer;
  }
`;