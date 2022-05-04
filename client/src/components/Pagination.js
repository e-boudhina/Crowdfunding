import React from 'react'
import {Link} from "react-router-dom";

const Pagination = ({itemsPerPage, totalItems, paginate})=>{
    const pageNumbers = [];

    for(let i= 1; i<=Math.ceil(totalItems/itemsPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <nav style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
            <ul className={"pagination"}>
                {pageNumbers.map(number => (
                    <li key={number} className={"page-item"}>
                        <Link onClick={()=> paginate(number)}  to={'?page='+number} className={"page-link"}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination
