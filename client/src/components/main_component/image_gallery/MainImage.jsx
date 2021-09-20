import React from "react";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import ImgModal from "./ImgModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";

const MainView = (props) => {
  if (Object.keys(props.currentStyle).length !== 0) {
    if (props.zoom === false) {
      return (
        <div className="viewcontainer">
          <div id="modalArrLeft">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                id="modalleftarrow"
                title="Last"
                onClick={(e) => props.rightClick(e)}
              />
            </p>
          </div>
          <FontAwesomeIcon
            icon={faExpandArrowsAlt}
            id="expandbtn"
            title="Expanded View"
            onClick={(e) => props.toggleModal(e)}
          />
          <div className="defaultview">
            <img
              src={props.currentStyle.photos[props.idxTicker].url}
              alt="new"
              className="mainimg"
              title={props.currentStyle.name}
              onClick={(e) => props.toggleModal(e)}
            />
          </div>
          <div id="arrowR">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                id="rightarrow"
                title="Next Image"
                onClick={(e) => props.rightClick(e)}
              />
            </p>
          </div>
        </div>
      );
    } else if (props.zoom === true) {
      return (
        <div className="viewcontainer">
          <FontAwesomeIcon
            icon={faExpandArrowsAlt}
            id="expandbtn"
            onClick={(e) => props.toggleModal(e)}
          />
          <div className="defaultview" onMouseOut={props.imageMouseOut}>
            <GlassMagnifier
              imageSrc={props.currentStyle.photos[props.idxTicker].url}
              imageAlt="new"
              largeImageSrc={props.currentStyle.photos[props.idxTicker].url}
              className="mainimg"
            />
          </div>
          <div id="arrowR">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                id="rightarrow"
                onClick={(e) => props.rightClick(e)}
              />
            </p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h2>
          <br />
        </h2>
      </div>
    );
  }
};

export default MainView;
