/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearningService, {
  getCertificates,
  getProgress,
  paginateCertificates,
  setCertif,
  getUserProgressions
} from "../../services/Learning.service";
import "./elearning.css";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgress as gp,
  updateProgress,
  setCurrentChapter,
  setCertif as sc,
  resetProgress,
} from "../../actions/Learning/Learning";

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

  const getRequestParams = (searchName, page, pageSize, categoriesFilter) => {
    let params = {};
    console.log("EL USER ID "+ currentUser.id);
    params["user"] = currentUser.id;
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
      let a = categoriesFilter;
      params["categoriesFilter"] = a.slice(0, -1);
      console.log("AFTER SLICED " + a.slice(0, -1));
    }
    return params;
  };

  const getAll = () => {
    const params = getRequestParams(
      searchName,
      page,
      pageSize,
      categoriesFilter
    );
    console.log("EL PARAMS "+JSON.stringify(params));
    getUserProgressions(params)
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
      dispatch(resetProgress());
    });
    // retrieveCertificates();
  }, [page, pageSize, categoriesFilter, searchName]);

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

  return (
    <div>
        <div className="row">
        <h3>
          <strong>My courses :</strong>
        </h3>
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
                                    src={`/profile-uploads/${certif.certificate.img.data}`}
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
                                  <a href={"/certificate/" + certif.certificate._id}>
                                    {certif.certificate.category.name}
                                  </a>
                                </span>
                                <a
                                  className="pro-title"
                                  onClick={() => goCertif(certif.certificate._id)}>
                                  <h4 className="pro-title">{certif.certificate.name} </h4>
                                </a>
                                <div className="price">
                                  <span>{certif.certificate.createdAt}</span>
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
