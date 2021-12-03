// AVG. TOT. Styled Component

import styled from "styled-components";

export const AvgTotButtonBoxDiv = styled.div`
  display: flex;
  justify-content: ${({ flexStart }) => flexStart ? 'flex-start' : 'center'};
`;