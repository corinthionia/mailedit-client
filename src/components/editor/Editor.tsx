import React, { KeyboardEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import {
  LIGHT_1,
  LIGHT_3,
  MEDIUM_0,
  REGULAR_6,
  REGULAR_7,
} from '@/styles/typo';
import GrabIcon from '@/assets/svgs/workspace_editor_grab.svg?react';
import TooltipIcon from '@/assets/svgs/workspace_editor_tooltip.svg?react';
import { breakPoint } from '@/styles/breakPoint';

interface Props {}

const Editor: React.FC<Props> = () => {
  const [blocks, setBlocks] = useState([
    {
      id: 'a',
      isBlock: true,
      content:
        'OO 프로젝트와 관련해서 OO팀이 주최하는 회의를 진행하고자 합니다.\n이번 회의일정은 다음과 같습니다.',
    },
    {
      id: 'b',
      isBlock: false,
      content:
        '1. 일시: OOOO년 OO월 OO일 오전/오후 OO시 ~ OO시\n2. 장소: (장소)\n3. 안건: (안건)\n4. 참석 대상: (참석 대상)\n5. 사전 준비사항: (사전 준비사항)\n',
    },
    {
      id: 'c',
      isBlock: true,
      content:
        'OO 프로젝트와 관련해서 OO팀이 주최하는 회의를 진행하고자 합니다.\n이번 회의일정은 다음과 같습니다.',
    },
  ]);

  const blocksRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      setBlocks((prev) => [
        ...prev,
        { id: `${Date.now()}`, content: ' ', isBlock: false },
      ]);
    }
  }

  const text = Array.from(blocksRef.current?.childNodes ?? [])
    .map((child) => child.textContent)
    .join('\n');

  const handleCopyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch {
      alert('링크 복사에 실패했습니다.\n다시 시도해 주세요.');
    }
  };

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

      <Edit>
        <CopyButton onClick={handleCopyToClipBoard}>복사하기</CopyButton>
        <Blocks ref={blocksRef}>
          {blocks.map((block) => (
            <BlockWrapper key={block.id}>
              <GrabButton>
                <GrabIcon width="6px" height="12px" />
              </GrabButton>
              <Block
                contentEditable
                spellCheck
                isBlock={block.isBlock}
                onKeyDown={handleKeyDown}
              >
                {block.content.split('\n').map((line) => (
                  <div>{line}</div>
                ))}
              </Block>
            </BlockWrapper>
          ))}

          <BlockWrapper>
            <GrabButton>
              <GrabIcon width="6px" height="12px" />
            </GrabButton>
            <Block
              contentEditable
              spellCheck
              isBlock={false}
              onKeyDown={handleKeyDown}
            ></Block>
          </BlockWrapper>
        </Blocks>
      </Edit>

      <SaveButton>템플릿 저장하기</SaveButton>
    </Wrapper>
  );
};

const Block = styled.div<{ isBlock: boolean }>`
  ${LIGHT_3};
  width: calc(100% - 28px);
  padding: 4px 12px;
  letter-spacing: -0.5%;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 150%;
  background: none;
  border-radius: 2px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isBlock &&
    css`
      background: rgba(82, 116, 239, 0.15);
      border: 1px solid ${colors.primary};
    `};

  @media screen and (min-width: ${breakPoint.l}) {
    ${LIGHT_1};
  }
`;

const Wrapper = styled.section`
  grid-area: 'editor';
  width: 100%;
  height: 100vh;
  padding: 48px 40px;
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
  margin-bottom: 16px;
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

const Edit = styled.div`
  background: ${colors.system.light};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  border-radius: 2px;
  margin-bottom: 18px;
  padding: 16px 18px;
  overflow: hidden;
`;

const CopyButton = styled.span`
  ${REGULAR_7};
  color: ${colors.gray6};
  text-decoration: underline;
  margin-left: auto;
`;

const Blocks = styled.div`
  width: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.gray3};
  padding: 18px 0;
  height: calc(100% - 32px);
  overflow: auto;
  padding-right: 10px;

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 18px;
  }
`;

const BlockWrapper = styled.div`
  width: 100%;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GrabButton = styled.div`
  width: 16px;
  height: 20px;
  border-radius: 2px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${colors.gray2};
  }
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
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

export default Editor;
