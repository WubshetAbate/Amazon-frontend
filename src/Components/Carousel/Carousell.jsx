import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import { img } from "./data";
import styles from "./Carousel.module.css"; // <-- import as module

function Carousell() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        {img.map((imageItemLink) => (
          <div key={imageItemLink} className={styles.hero__img}>
            <img src={imageItemLink} alt="carousel image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousell;
