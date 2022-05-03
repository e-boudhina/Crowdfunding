/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearningService, {
  getCertificates,
  getProgress,
  paginateCertificates,
  setCertif
} from "../../services/Learning.service";
import "./elearning.css";
import Pagination  from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgress as gp,
  updateProgress,
  setCurrentChapter , setCertif as sc,resetProgress
} from "../../actions/Learning/Learning";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


function ListCertificatesUser(props) {
  const [certifs, setCertifs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState("");
  //let categoriesFilter ="";
  const [certif, setCertif] = useState({});
  
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize,categoriesFilter) => {
    let params = {};
    if (searchName) {
      params["name"] = searchName;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (categoriesFilter) {
      let a = categoriesFilter 
      params["categoriesFilter"] = a.slice(0, -1);
      console.log("AFTER SLICED "+a.slice(0,-1));
    }
    return params;
  }; 

   const getAll =  () => {
    const params =  getRequestParams(searchName, page, pageSize , categoriesFilter);
    paginateCertificates(params)
      .then((response) => {
        const { certificates, totalPages } = response;
        setCertifs(certificates);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });

  };

  useEffect(() => {
    getAll();
    LearningService.getCategories().then((response) => {
      setCategories(response.data);
      dispatch(resetProgress())
    });
    // retrieveCertificates();
  }, [page, pageSize,categoriesFilter ,searchName]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  async function fetchMyAPI(id) {
    let response = await LearningService.getCertificate(id);
    dispatch(sc(response.data));
    dispatch(setCurrentChapter(response.data.chapters[0]));
  }
  const goCertif = async (id) => {
    fetchMyAPI(id);
    if (currentUser) { 
    dispatch(gp(currentUser.id, id)); 
    }
    navigate(`/certificate/${id}`);
  };

  const onSelectCategory = (e) => {
    let param = e+"," ;
    console.log("param entered = "+ e);
    if (!categoriesFilter.includes(param)) {
      setCategoriesFilter(categoriesFilter.concat(param));
     // categoriesFilter = categoriesFilter.concat(param)
      getAll()
    } else  {
     setCategoriesFilter(categoriesFilter.replace(param, ""));
     // categoriesFilter = categoriesFilter.replace(param, "")
      getAll()
    }


  };

  return (
    <div>
      {/* preloader */}
      <div id="preloader" style={{ display: "none" }}>
        <div className="preloader">
          <span />
          <span />
        </div>
      </div>
      {/* preloader end  */}
      {/* header start */}

      {/* header end */}
      <main>
        {/* page-title-area start */}

        {/* page-title-area end */}
        {/* shop-banner-area start */}
        <section className="shop-cat-area pt-120 pb-120">
          <div className="container">
          <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title"> Categories</h3>
        </div>
        <div className="tag">
        <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
        {categories &&
                  categories.map((cat, index) => (
                    <>
        
          <FormControlLabel
          value="top"
          control={<Switch color="primary" onChange={()=>onSelectCategory(cat._id)}/>}
          label={cat.name}
          labelPlacement="top"
        />
        </>
          ))}
          </FormGroup>
         </FormControl>
        </div>
      </div>

            <div className="row mt-20">
              <div className="col-xl-4 col-lg-5 col-md-6">
                <div className="product-showing mb-40">
                  <form className="search-form">
                    <input
                      type="text"
                      className="search-form"
                      placeholder="Search by title"
                      value={searchName}
                      onChange={onChangeSearchName}
                    />
                    <button
                      className="btn-border"
                      type="button"
                      onClick={getAll}>
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-6">
                <div className="mt-3 ">
                  <div className="mt-3 ">
                    {"Items per Page: "}
                    <select
                      className="tag "
                      onChange={handlePageSizeChange}
                      value={pageSize}>
                      {pageSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab">
                    <div className="row">
                      {certifs &&
                        certifs.map((certif, index) => (
                          <div className="col-lg-4 col-md-6  text-center">
                            <div className="product mb-40 ">
                              <div className="product__img box">
                                <a href="porduct-details.html">
                                  {" "}
                                  <img
                                    src={`/profile-uploads/${certif.img.data}`}
                                    alt=""
                                  />
                                </a>
                                <div className="product-action text-center">
                                  <a href="#">
                                    <i className="fas fa-shopping-cart" />
                                  </a>
                                  <a href="#">
                                    <i className="fas fa-heart" />
                                  </a>
                                  <a href="porduct-details.html">
                                    <i className="fas fa-expand" />
                                  </a>
                                </div>
                              </div>
                              <div className="product__content text-center pt-35">
                                <span className="pro-cat">
                                  <a href={"/certificate/" + certif._id}>
                                    {certif.category.name}
                                  </a>
                                </span>
                                <a
                                  className="pro-title"
                                  onClick={() => goCertif(certif._id)}>
                                  <h4 className="pro-title">{certif.name} </h4>
                                </a>
                                <div className="price">
                                  <span>{certif.createdAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="basic-pagination basic-pagination-2 text-center mt-20">
                  <Pagination
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass=""
                    linkClassFirst="basic-pagination"
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <a
        id="scrollUp"
        href="#top"
        style={{ position: "fixed", zIndex: 2147483647 }}>
        <i className="flaticon-up-arrow" />
      </a>
    </div>
  );
}

export default ListCertificatesUser;
