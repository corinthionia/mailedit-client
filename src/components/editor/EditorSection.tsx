import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import { MEDIUM_0, REGULAR_6, REGULAR_7 } from '@/styles/typo';
import TooltipIcon from '@/assets/svgs/workspace_editor_tooltip.svg?react';
import { BaseTemplateContents } from '@/types/template';
import Editor from '@/components/editor/Editor';

const EditorSection = () => {
  const [blocks, setBlocks] = useState<BaseTemplateContents[]>([
    { id: Date.now().toString(), isBlock: true, text: '' },
  ]);

  return (
    <Wrapper>
      <TemplateInfoWrapper>
        <InfoWrapper>
          <TitleInput
            placeholder="템플릿의 제목을 입력하세요"
            spellCheck={false}
            autoFocus
          />
          <InfoItemWrapper>
            <Typo type={REGULAR_7}>메모</Typo>
            <MemoInput
              placeholder="상황, 받는 사람, 목적 등을 입력하세요"
              spellCheck={false}
            />
          </InfoItemWrapper>
          <InfoItemWrapper>
            <Typo type={REGULAR_7}>그룹</Typo>
            <GroupButton>그룹 지정하기</GroupButton>
          </InfoItemWrapper>
        </InfoWrapper>
        <TooltipButton />
      </TemplateInfoWrapper>

      <Editor blocks={blocks} setBlocks={setBlocks} />

      <SaveButton>템플릿 저장하기</SaveButton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  grid-area: 'editor';
  width: 100%;
  height: 100vh;
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TemplateInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
  padding-right: 4px;
`;

const TitleInput = styled.input`
  ${MEDIUM_0};
  width: 454px;
  height: 29px;
  margin-bottom: 14px;
  color: ${colors.black};
  ::placeholder {
    color: ${colors.gray5};
  }
`;

const InfoWrapper = styled.div`
  max-width: 360px;
`;

const InfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  & + & {
    margin-top: 6px;
  }
`;

const MemoInput = styled.input`
  ${REGULAR_7};
  width: 304px;
  padding: 4px 8px;
  border-radius: 2px;
  background: ${colors.gray1};
  color: ${colors.gray6};
  ::placeholder {
    color: ${colors.gray4};
  }
`;

const GroupButton = styled.button`
  ${REGULAR_7};
  background: ${colors.indigo4};
  padding: 3px 8px;
  border-radius: 4px;
  color: ${colors.white};
`;

const TooltipButton = styled(TooltipIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  ${REGULAR_6};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 28px;
  margin-left: auto;
  color: ${colors.white};
  background: ${colors.primary};
  border-radius: 4px;
`;

export default EditorSection;
