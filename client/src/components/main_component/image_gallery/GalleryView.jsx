import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Gallery = (props) => {
  if (Object.keys(props.currentStyle).length !== 0) {
    return (
      <div className="galleryviewmain">
        <div id="arrowU">
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faArrowUp}
              id="uparrow"
              title="Previous"
              onClick={(e) => props.upClick(e)}
            />
          </p>
        </div>
        <div>
          <ul className="galthumbs">
            {props.currentStyle.photos.map((pic, index) => {
              return (
                <li key={index} className="thumbnails">
                  <div id="thumbcaro">
                    <img
                      src={pic.thumbnail_url}
                      alt="new"
                      id={"img" + index}
                      className="galleryimg"
                      title={"Style " + (index + 1)}
                      onClick={(e) => props.thumbnailClick(pic, index, e)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div id="arrowD">
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faArrowDown}
              id="downarrow"
              title="Next"
              onClick={(e) => props.downClick(e)}
            />
          </p>
        </div>
      </div>
    );
  } else {
    return <div id="galleryviewmain"></div>;
  }
};

export default Gallery;
