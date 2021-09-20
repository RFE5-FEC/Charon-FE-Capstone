import React from "react";
import ModalGallery from "./ModalGallery.jsx";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";

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
              imageAlt="Expanded View Image"
              largeImageSrc={props.currentStyle.photos[props.idxTicker].url}
              className="fullimg"
              magnifierBorderSize={1}
              magnifierSize="40%"
            />
          </div>
          <ModalGallery
            currentStyle={props.currentStyle}
            upClick={props.upClick}
            downClick={props.downClick}
            thumbnailClick={props.thumbnailClick}
            galleryClick={props.galleryClick}
          />
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
