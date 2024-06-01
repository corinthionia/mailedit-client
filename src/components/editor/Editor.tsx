import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import GrabIcon from '@/assets/svgs/workspace_editor_grab.svg?react';
import { LIGHT_1, LIGHT_2, REGULAR_7 } from '@/styles/typo';
import { css } from '@emotion/react';
import { breakPoint } from '@/styles/breakPoint';

import { useEffect, useState } from 'react';

const Editor = () => {
  const [blocks, setBlocks] = useState([
    { id: Date.now().toString(), isBlock: true, content: 'supernova' },
    {
      id: Date.now().toString() + 1,
      isBlock: true,
      content: '문이열려\n서로의 존재를 느껴\n수수수퍼노바',
    },

    {
      id: Date.now().toString(),
      isBlock: false,
      content: '날 닮은 너 너 누구야',
    },

    {
      id: Date.now().toString(),
      isBlock: true,
      content: '누구도 말야 수수수수퍼노바',
    },
  ]);

  const selection = window.getSelection();

  useEffect(() => {
    console.log(selection);
    console.log(setBlocks);
  }, [selection]);

  return (
    <Wrapper>
      <CopyButton>복사하기</CopyButton>

      <Blocks>
        {blocks.map((block, blockIndex) => (
          <BlockWrapper>
            <GrabButton>
              <GrabIcon width="6px" height="12px" />
            </GrabButton>
            <Block
              spellCheck
              contentEditable
              isBlock={block.isBlock}
              data-block-index={blockIndex}
              data-is-block={block.isBlock}
              suppressContentEditableWarning
            >
              {block.content.split('\n').map((line, lineIndex) => (
                <div
                  key={`${Date.now().toString()} ${line}`}
                  data-line-index={lineIndex}
                >
                  {line}
                </div>
              ))}
            </Block>
          </BlockWrapper>
        ))}
      </Blocks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${colors.bg.light};
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

// const DroppableArea = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const CopyButton = styled.span`
  ${REGULAR_7};
  color: ${colors.gray6};
  text-decoration: underline;
  margin-left: auto;
  cursor: pointer;
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
  user-drag: none;
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

const Block = styled.div<{ isBlock: boolean }>`
  ${LIGHT_2};
  width: calc(100% - 28px);
  min-height: 30px;
  padding: 4px 12px;
  letter-spacing: -0.5%;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 170%;
  background: none;
  border-radius: 2px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }

  ${(props) =>
    props.isBlock &&
    css`
      background: rgba(82, 116, 239, 0.15);
      border: 1px solid ${colors.primary};
    `};

  div {
    min-height: 24px;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: ${breakPoint.xl}) {
    ${LIGHT_1};
    line-height: 200%;
  }
`;

export default Editor;
