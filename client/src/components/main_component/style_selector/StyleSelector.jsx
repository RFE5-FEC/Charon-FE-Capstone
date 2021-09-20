import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

var StyleSelector = (props) => {
  if (props.styles.product_id !== undefined) {
    return (
      <div className="styleselectormain">
        <div id="modalArrRight">
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              id="modalrightarrow"
              title="Next"
              onClick={(e) => props.rightClick(e)}
            />
          </p>
        </div>
        <ul id="styleul">
          <h4 id="currentstylename"> Style > {props.currentStyle.name} </h4>
          <h3 className="fav">
            <FontAwesomeIcon icon={faHeart} id="heart" title="Favorite" />{" "}
          </h3>
          {props.styles.results.map((style, index) => {
            return (
              <li
                id="styleli"
                key={style.style_id}
                name={style.name}
                onClick={(e) => props.styleClick(style, index, e)}
              >
                <div id="checkdiv">
                  <input
                    className="checked"
                    type="radio"
                    id={"radio" + index}
                    name="checkbox"
                  />
                  <label htmlFor={"radio" + index}></label>
                </div>
                <div id="crop">
                  <img
                    className="imglist"
                    src={style.photos[0].thumbnail_url}
                    alt="new"
                    title={style.name}
                    id={"imglist" + index}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="selectormain">
        <h4>Style Selector Placeholder</h4>
      </div>
    );
  }
};

export default StyleSelector;
