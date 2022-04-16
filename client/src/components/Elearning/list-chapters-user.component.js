import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllChapters } from "../../services/Learning.service";
const ListChaptersUser = (props) => {

    const [chapters, setChapters] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        setChapters(props.chapters);
    }, [props.chapters]);
  return (
<div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Chapters list </h3>
              </div>
              {chapters &&
        chapters.map((chapter, index) => (
              <ul className="recent-posts">

                <li>
                  <div className="widget-posts-body">
                    <h6 className="widget-posts-title">
                      <a href="#">{chapter.name}</a>
                    </h6>
                    <div className="widget-posts-meta">October 28, 2018 </div>
                  </div>
                </li>
             
              </ul>
                           ))}
            </div>
              );
            };
            
            export default ListChaptersUser;
            