import React from 'react';
import styled from '@emotion/styled';
import Editor from '@/components/editor/EditorSection';
import Preview from '@/components/preview/Preview';
import Sidebar from '@/components/sidebar/Sidebar';
import { breakPoint } from '@/styles/breakPoint';
import { colors } from '@/styles/colors';
import Border from '@/ui/border/Border';
import { useRecoilValue } from 'recoil';
import { SelectedTemplateAtom } from '@/recoils/selectedTemplate';

interface Props {}

const WorkSpace: React.FC<Props> = () => {
  const selectedTemplate = useRecoilValue(SelectedTemplateAtom);

  return (
    <Wrapper>
      <Sidebar />
      <Preview template={selectedTemplate} />
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
  min-width: ${breakPoint.m};
  height: 100%;
  display: grid;
  grid-template-columns: 233px 1fr 1px 1fr;
  grid-template-areas: 'sidebar preview border editor';
`;

export default WorkSpace;
