import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import React from 'react';

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return <Wrapper>Sidebar</Wrapper>;
};

const Wrapper = styled.aside`
grid-area: 'sidebar'
max-width: 328px;
width: 100%;
height: 100vh;
background: ${colors.primary};
`;

export default Sidebar;
