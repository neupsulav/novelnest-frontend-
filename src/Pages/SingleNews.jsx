/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import EmbraceTrainingPhilosophy from "./../Components/EmbraceTrainingPhilosophy";
import Footer from "../Components/Footer";
// import { useNavigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Cookies from "universal-cookie";

const SingleCampaign = () => {
  const [newsData, setnewsData] = useState();
  const { id } = useParams();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // const navigate = useNavigate();

  // const cookies = new Cookies();
  // const cookie = cookies.get("jwttoken");

  // const protectPath = () => {
  //   if (!cookie) {
  //     navigate("/login");
  //   }
  // };

  const fetchBlog = async () => {
    const res = await fetch(`/api/getsinglenews/${id}`, {
      method: "GET",
    });

    const response = await res.json();
    setnewsData(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    // protectPath();
    fetchBlog();
  }, [id]);

  if (isDataFetched) {
    return (
      <div className="singleCampaignPage">
        <p className="singleCampaignTitle">{newsData.title}</p>
        <p>{newsData.date.substring(0, 10)}</p>
        <div className="campaignImagesSlider" id="campaignImagesSlider">
          <img
            src={newsData.image}
            alt="News"
            className="campaignImagesSliderImg"
          />
        </div>

        <div className="campaignDetails">
          <p
            dangerouslySetInnerHTML={{
              __html: newsData.content,
            }}
          ></p>
        </div>
        <EmbraceTrainingPhilosophy />
        <Footer />
      </div>
    );
  }
};

export default SingleCampaign;
