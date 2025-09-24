import img1 from "./ImgData/img1.png";
import img2 from "./ImgData/img2.png";
import img3 from "./ImgData/img3.png";
import img4 from "./ImgData/img4.png";

export const categoryImage = [
  {
    title: "Electronics",
    name: "electronics", // API expects lowercase "electronics"
    imgLink: img1,
  },
  {
    title: "Discover fashion trends",
    name: "women's clothing", // must match API exactly
    imgLink: img2,
  },
  {
    title: "Men's Clothing",
    name: "men's clothing", // must match API exactly
    imgLink: img3,
  },
  {
    title: "Jewelry",
    name: "jewelery", // API spelling is "jewelery"
    imgLink: img4,
  },
];
