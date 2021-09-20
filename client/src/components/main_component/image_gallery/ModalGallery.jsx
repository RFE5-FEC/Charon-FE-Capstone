import React from "react";

const ModalGallery = (props) => {
  if (Object.keys(props.currentStyle).length !== 0) {
    return (
      <div className="modalgallerymain">
        <div>
          <ul className="modalgalthumbs galthumbs">
            {props.currentStyle.photos.map((pic, index) => {
              return (
                <li key={index} className="modalthumbnails thumbnails">
                  <div id="modalthumbcaro">
                    <img
                      src={pic.thumbnail_url}
                      alt="new"
                      id={"modalimg" + index}
                      className="modalgalleryimg"
                      title={"Style " + (index + 1)}
                      onClick={(e) => props.galleryClick(index, e)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div id="modalstylenull"></div>;
  }
};

export default ModalGallery;
