import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";

const StyledSpinner = styled.img`
  width: 50px;
  margin: auto;
  padding: 50px 0 100px;
  display: block;
`;
const Spinner = () => {
  return <StyledSpinner src={spinner} alt="Loading..." />;
};

export default Spinner;
