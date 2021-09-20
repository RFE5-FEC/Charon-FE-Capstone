import React from "react";
import CursorZoom from "react-cursor-zoom";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ImgModal = (props) => {
  if (Object.keys(props.currentStyle).length !== 0) {
    if (props.modalState === true) {
      return (
        <div className="mainimgmodal">
          {" "}
          <div className="modalview">
            <GlassMagnifier
              imageSrc={
                props.currentStyle.photos[props.idxTicker].thumbnail_url
              }
              imageAlt="new"
              largeImageSrc={props.currentStyle.photos[props.idxTicker].url}
              className="mainimg"
              magnifierBorderSize={1}
              magnifierSize="40%"
            />
          </div>
          {/* <div id="modalArrRight">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                id="rightarrow"
                onClick={(e) => props.rightClick(e)}
              />
            </p>
          </div> */}
        </div>
      );
    } else if (props.modalState === false) {
      var style = {
        display: "none",
      };
      return <div style={style}></div>;
    }
  } else {
    return <div id="stylenull"></div>;
  }
};

export default ImgModal;
