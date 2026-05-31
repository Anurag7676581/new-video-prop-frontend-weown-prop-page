import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Propertycard } from "../../components/propertyCard/Propertycard";
import stardesign2 from "./stardesign2.svg";
import IntroContainer from "../../Atoms/introContainer/IntroContainer";
import PropertyCardSlider from "../../components/propertyCardSlider";
import api from "../../service/apiGateway";
import useGetProjectsByBuilderId from "../../hooks/useGetProjectsByBuilderId";

const Section8 = ({ builder }) => {
  const {loading,fetched,error,data}=useGetProjectsByBuilderId(builder);


 



  return (
    <div>
      <IntroContainer
        stardesign={stardesign2}
        heading={`Projects By ${data?.name || "Builder"}`}
        desc={`Find answers to common questions about Estateins's services, property
          listing, and the real estate process. We're here to provide clarity
          and assist you every tep of the way `}
        btntext="View All Projects"
        path={`/builder/${builder}`}
      />
      <PropertyCardSlider projects={data} fetched={fetched} loading={loading} error={error} />
    </div>
  );
};

export default Section8;
