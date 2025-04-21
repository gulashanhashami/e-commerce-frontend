import React from "react";
import styled from "styled-components";

export const Navbar = () => {

    return (
        <>
            <NavBox>
                <div className="nav">
                    <p>Home</p>
                    <p id="add">Products</p>
                </div>
            </NavBox>
        </>
    )
}

const NavBox = styled.div`
font-family:   Arial, sans-serif;
   .nav{
       width: 100%;
       height: 6vh;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       align-items: center;
         padding-left:6.6%;
       background-color: black;
       p{
        font-size: 1.2vw;
        font-weight: bold;
        color: white;
    }
   }

   #add{
    margin-right: 13%;
}
`;