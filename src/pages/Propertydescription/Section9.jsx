import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Propertycard } from "../../components/propertyCard/Propertycard";
import stardesign2 from "./stardesign2.svg";
import Button from "../../Atoms/Button";
import IntroContainer from "../../Atoms/introContainer/IntroContainer";
import PropertyCardSlider from "../../components/propertyCardSlider";
import api from "../../service/apiGateway";
import useGetSimilarProperties from "../../hooks/useGetSimilarProperties";

const Section9 = ({ id }) => {


  const { fetched, loading, error, data } = useGetSimilarProperties(id);


  return (
    <div>
      <IntroContainer
        stardesign={stardesign2}
        heading="Similar Properties"
        desc={`Find answers to common questions about Estateins's services, property
          listing, and the real estate process. We're here to provide clarity
          and assist you every tep of the way `}
        btntext="View All Similar Projects"
      />

    <PropertyCardSlider projects={data} fetched={fetched} loading={loading} error={error} />
      
    </div>
  );
};

export default Section9;
