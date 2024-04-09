import React from "react";
import TeamMemberRight from "../Components/TeamMemberRight";
import TeamMemberLeft from "../Components/TeamMemberLeft";
import EmbraceTrainingPhilosophy from "../Components/EmbraceTrainingPhilosophy";
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <div className="aboutusPage">
      <div className="aboutUsContainer">
        <p>About Us</p>
      </div>
      <div className="aboutTeamContainer">
        <div className="teamInfo">
          <p>
            Our Team <br /> Our dedicated team of parents are juggling parenting
            and, utilising their unique skills and passion to move the work of
            Parents for Climate Aotearoa forward. Our team is strongly values
            based and heart led. Meet some of our incredible leaders below.
          </p>
        </div>
        <div className="teamIntro">
          <TeamMemberLeft />
          <TeamMemberRight />
          <TeamMemberLeft />
          <TeamMemberRight />
          <TeamMemberLeft />
          <TeamMemberRight />
        </div>
        <EmbraceTrainingPhilosophy />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
