import React from 'react';
import styled from '@emotion/styled';

interface Props {}

const Preview: React.FC<Props> = () => {
  return <Wrapper>Preview</Wrapper>;
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
`;

export default Preview;
