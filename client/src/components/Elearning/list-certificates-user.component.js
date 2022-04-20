/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { getCertificates,getProgress,paginateCertificates } from "../../services/Learning.service";
import "./elearning.css";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProgress as gp , updateProgress } from "../../actions/Learning/Learning";


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
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize) => {
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
    return params;
  };

  const getAll = () => {
    const params = getRequestParams(searchName, page, pageSize);
    paginateCertificates(params)
      .then((response) => {
        console.log("AAAAAAAAAA");
        console.log(response.certificates);
        const { certificates, totalPages } = response;
        setCertifs(certificates);
        setCount(totalPages);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAll()
   // retrieveCertificates();
  }, [page, pageSize]);

  const refreshList = () => {
    getAll();
    console.log(certifs);
  //  setCurre(null);
    setCurrentIndex(-1);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const retrieveCertificates = () => {
    getCertificates()
      .then((response) => {
        setCertifs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
const goCertif =(id)=> {
 dispatch(gp(currentUser.id,id))
navigate(`/certificate/${id}`);
}
  return (
   
    <div>
    {/* preloader */}
    <div id="preloader" style={{display: 'none'}}>
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
          <div className="row mb-50">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-puzzle" />
                  <h4>Gift &amp; Toys</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-laptop" />
                  <h4>electronics</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-shop" />
                  <h4>bag &amp; leathers</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-high-heels" />
                  <h4>leather shoes</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-bathtub" />
                  <h4>bathrooms</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-fruit" />
                  <h4>beauty</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-first-aid-kit" />
                  <h4>medicine</h4>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="shop-cat text-center mb-30">
                <a href="#">
                  <i className="flaticon-salad" />
                  <h4>organic</h4>
                </a>
              </div>
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
              onClick={getAll}
            >
              Search
            </button>
            </form>
              </div>
            
            </div>
            <div className="col-xl-8 col-lg-7 col-md-6">
              <div className="shop-tab f-right">
              <div className="mt-3">
          {"Items per Page: "}
          <select className="country-select" onChange={handlePageSizeChange} value={pageSize}>
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
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                  {certifs &&
            certifs.map((certif, index) => (
                    <div className="col-lg-4 col-md-6  text-center">
                      <div className="product mb-40 ">
                        <div className="product__img box">
                          <a href="porduct-details.html">   <img src={`/profile-uploads/${certif.img.data}`} alt="" /></a>
                          <div className="product-action text-center">
                            <a href="#"><i className="fas fa-shopping-cart" /></a>
                            <a href="#"><i className="fas fa-heart" /></a>
                            <a href="porduct-details.html"><i className="fas fa-expand" /></a>
                          </div>
                        </div>
                        <div className="product__content text-center pt-35">
  
                          <span className="pro-cat"><a href={"/certificate/"+certif._id}>{certif.category.name}</a></span>
                          <a className="pro-title"    onClick={()=>goCertif(certif._id)}  >
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
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row mb-30">
                    <div className="col-lg-4 col-md-6">
                      <div className="product mb-20">
                        <div className="product__img">
                          <a href="porduct-details.html"><img src="assets/img/shop/img2.jpg" alt="" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product-list-content pt-10">
                        <div className="product__content mb-20">
                          <span className="pro-cat"><a href="#">Cloths</a></span>
                          <h4 className="pro-title"><a href="porduct-details.html">Bakix Furniture</a></h4>
                          <div className="price">
                            <span>$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate.</p>
                        <div className="product-action-list">
                          <a className="btn btn-theme" href="#">add to cart</a>
                          <a className="action-btn" href="#"><i className="fas fa-heart" /></a>
                          <a className="action-btn" href="porduct-details.html"><i className="fas fa-expand" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-30">
                    <div className="col-lg-4 col-md-6">
                      <div className="product mb-20">
                        <div className="product__img">
                          <a href="porduct-details.html"><img src="assets/img/shop/img3.jpg" alt="" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product-list-content pt-10">
                        <div className="product__content mb-20">
                          <span className="pro-cat"><a href="#">Cloths</a></span>
                          <h4 className="pro-title"><a href="porduct-details.html">Bakix Furniture</a></h4>
                          <div className="price">
                            <span>$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate.</p>
                        <div className="product-action-list">
                          <a className="btn btn-theme" href="#">add to cart</a>
                          <a className="action-btn" href="#"><i className="fas fa-heart" /></a>
                          <a className="action-btn" href="porduct-details.html"><i className="fas fa-expand" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-30">
                    <div className="col-lg-4 col-md-6">
                      <div className="product mb-20">
                        <div className="product__img">
                          <a href="porduct-details.html"><img src="assets/img/shop/img4.jpg" alt="" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product-list-content pt-10">
                        <div className="product__content mb-20">
                          <span className="pro-cat"><a href="#">Cloths</a></span>
                          <h4 className="pro-title"><a href="porduct-details.html">Bakix Furniture</a></h4>
                          <div className="price">
                            <span>$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate.</p>
                        <div className="product-action-list">
                          <a className="btn btn-theme" href="#">add to cart</a>
                          <a className="action-btn" href="#"><i className="fas fa-heart" /></a>
                          <a className="action-btn" href="porduct-details.html"><i className="fas fa-expand" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-30">
                    <div className="col-lg-4 col-md-6">
                      <div className="product mb-20">
                        <div className="product__img">
                          <a href="porduct-details.html"><img src="assets/img/shop/img5.jpg" alt="" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product-list-content pt-10">
                        <div className="product__content mb-20">
                          <span className="pro-cat"><a href="#">Cloths</a></span>
                          <h4 className="pro-title"><a href="porduct-details.html">Bakix Furniture</a></h4>
                          <div className="price">
                            <span>$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate.</p>
                        <div className="product-action-list">
                          <a className="btn btn-theme" href="#">add to cart</a>
                          <a className="action-btn" href="#"><i className="fas fa-heart" /></a>
                          <a className="action-btn" href="porduct-details.html"><i className="fas fa-expand" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-30">
                    <div className="col-lg-4 col-md-6">
                      <div className="product mb-20">
                        <div className="product__img">
                          <a href="porduct-details.html"><img src="assets/img/shop/img6.jpg" alt="" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product-list-content pt-10">
                        <div className="product__content mb-20">
                          <span className="pro-cat"><a href="#">Cloths</a></span>
                          <h4 className="pro-title"><a href="porduct-details.html">Bakix Furniture</a></h4>
                          <div className="price">
                            <span>$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate.</p>
                        <div className="product-action-list">
                          <a className="btn btn-theme" href="#">add to cart</a>
                          <a className="action-btn" href="#"><i className="fas fa-heart" /></a>
                          <a className="action-btn" href="porduct-details.html"><i className="fas fa-expand" /></a>
                        </div>
                      </div>
                    </div>
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
      {/* shop-banner-area end */}
      {/* brand-area start */}
      <section className="brand-area pt-110 pb-120" data-background="assets/img/bg/footer.jpg" style={{backgroundImage: 'url("assets/img/bg/footer.jpg")'}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="brand-heading text-center mb-80">
                <h3>What Client Working With BAKIX And They Are Happy</h3>
              </div>
              <div className="brand-active owl-carousel owl-loaded owl-drag">
                <div className="owl-stage-outer"><div className="owl-stage" style={{transform: 'translate3d(-960px, 0px, 0px)', transition: 'all 0s ease 0s', width: '3040px'}}><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand2.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand3.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand4.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand5.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand6.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand2.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand1.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand2.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand3.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand4.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand5.png" alt="" />
                      </div></div><div className="owl-item active" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand6.png" alt="" />
                      </div></div><div className="owl-item" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand2.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand1.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand2.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand3.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand4.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand5.png" alt="" />
                      </div></div><div className="owl-item cloned" style={{width: '130px', marginRight: '30px'}}><div className="single-brand">
                        <img src="assets/img/brand/brand6.png" alt="" />
                      </div></div></div></div><div className="owl-nav disabled"><div className="owl-prev"><i className="fa fa-angle-left" /></div><div className="owl-next"><i className="fa fa-angle-right" /></div></div><div className="owl-dots disabled" /></div>
            </div>
          </div>
        </div>
      </section>
      {/* brand-area end */}
    </main>
    {/* footer start */}
    <footer data-background="assets/img/bg/footer-bg-3.jpg" style={{backgroundImage: 'url("assets/img/bg/footer-bg-3.jpg")'}}>
      <div className="footer-area footer-3 pb-60 pt-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget mb-40">
                <div className="footer-logo mb-25">
                  <img src="assets/img/logo/footer-logo.png" alt="" />
                </div>
                <div className="social-icon mb-20">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-behance" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                  <a href="#"><i className="fab fa-youtube" /></a>
                </div>
                <address className="address-point">
                  <span>London, UK</span>
                  <p>13/A, Polar Garden City,
                    London, UK</p>
                  <a href="#">Find Us On Map</a>
                </address>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget mb-40">
                <h4 className="footer-title">Campaign</h4>
                <ul className="footer-link">
                  <li><a href="#">Start Your Campaign</a></li>
                  <li><a href="#">Pricing Campaign</a></li>
                  <li><a href="#">Campaign Support</a></li>
                  <li><a href="#">Trust &amp; Safety</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="footer-widget mb-40">
                <h4 className="footer-title">Explore</h4>
                <ul className="footer-link">
                  <li><a href="#">Design &amp; Art</a></li>
                  <li><a href="#">Crafts</a></li>
                  <li><a href="#">Film &amp; Video</a></li>
                  <li><a href="#">Food</a></li>
                  <li><a href="#">Book</a></li>
                  <li><a href="#">Games</a></li>
                  <li><a href="#">Technology</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="footer-widget mb-40">
                <h4 className="footer-title">News Feeds</h4>
                <ul className="widget-latest-post">
                  <li>
                    <div className="widget-thumb">
                      <a href="#"><img src="assets/img/blog/latest/post1.jpg" alt="" /></a>
                    </div>
                    <div className="widget-content">
                      <h4><a href="#">Dolor sit amet, consectet is was
                          adipisicing.</a></h4>
                      <span>12 June 2018</span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-thumb">
                      <a href="#"><img src="assets/img/blog/latest/post2.jpg" alt="" /></a>
                    </div>
                    <div className="widget-content">
                      <h4><a href="#">Dolor sit amet, consectet is was
                          adipisicing.</a></h4>
                      <span>12 June 2018</span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-thumb">
                      <a href="#"><img src="assets/img/blog/latest/post3.jpg" alt="" /></a>
                    </div>
                    <div className="widget-content">
                      <h4><a href="#">Dolor sit amet, consectet is was
                          adipisicing.</a></h4>
                      <span>12 June 2018</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-border pt-30 pb-30">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="right-text text-center text-lg-left">
                  <p>Copyright All Right Reserved By BasicTheme - 2019</p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 ">
                <div className="social-icon-link text-center text-lg-right">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-behance" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                  <a href="#"><i className="fab fa-youtube" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* footer end */}
    {/* JS here */}
    <a id="scrollUp" href="#top" style={{position: 'fixed', zIndex: 2147483647}}><i className="flaticon-up-arrow" /></a>
  </div>
  );
}

export default ListCertificatesUser;
