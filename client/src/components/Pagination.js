import React from 'react'

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
                        <a onClick={()=> paginate(number)}  className={"page-link"}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination
