import Editor from '@/components/editor/Editor';
import Preview from '@/components/preview/Preview';
import Sidebar from '@/components/sidebar/Sidebar';
import { colors } from '@/styles/colors';
import Border from '@/ui/border/Border';
import styled from '@emotion/styled';
import React from 'react';

interface Props {}

const WorkSpace: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Preview />
      <Border
        width="1px"
        height="100vh"
        direction="column"
        color={colors.gray4}
      />
      <Editor />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 233px 1fr 1px 1fr;
  grid-template-areas: 'sidebar preview border editor';
`;

export default WorkSpace;
