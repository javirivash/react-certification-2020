import React, { useContext } from "react";
import AppContext from "../../context/appContext";
import spinner from "./spinner.gif";
import styled from "styled-components";

const StyledSpinner = styled.img`
  width: 50px;
  margin: auto;
  padding-top: 200px;
  display: block;
`;
const Spinner = () => {
  const appContext = useContext(AppContext);
  const { loading } = appContext;

  return loading && <StyledSpinner src={spinner} alt="Loading..." />;
};

export default Spinner;
