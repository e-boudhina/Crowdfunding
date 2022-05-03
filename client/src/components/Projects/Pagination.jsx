import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (


      
           
    <div class="basic-pagination basic-pagination-2 text-center mb-40">
    <ul>
      {/* {currentPage > 1 && ( */}
        <li>
          <a onClick={() => paginate(currentPage - 1)}>
            <i class="fas fa-angle-double-left"></i>
          </a>
        </li>
      {/* )} */}

  
    {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
   
        <>
          <li>
            <a href="#">
              <i class="fas fa-ellipsis-h"></i>
            </a>
          </li>
          <li>
            <a onClick={() => paginate(currentPage+1)} >
              <i class="fas fa-angle-double-right"></i>
            </a>
          </li>
        </>
    
    </ul>
  </div>



      
    // <nav>
    //   <ul className='pagination'>
    //     {pageNumbers.map(number => (
    //       <li key={number} className='page-item'>
    //         <a onClick={() => paginate(number)} href='#' className='page-link'>
    //           {number}
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Pagination;