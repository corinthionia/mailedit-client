import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import GrabIcon from '@/assets/svgs/workspace_editor_grab.svg?react';
import { LIGHT_1, LIGHT_2, MEDIUM_5, REGULAR_7 } from '@/styles/typo';
import { css } from '@emotion/react';
import { breakPoint } from '@/styles/breakPoint';
import { useEffect, useState } from 'react';

const Editor = () => {
  const [blocks, setBlocks] = useState([
    { id: Date.now().toString(), isBlock: true, content: '테스트합니다' },
    {
      id: Date.now().toString() + 1,
      isBlock: true,
      content: '가나다라\n마바사\n아자차카',
    },

    {
      id: Date.now().toString(),
      isBlock: false,
      content: '타파하하하하하하하',
    },

    {
      id: Date.now().toString(),
      isBlock: true,
      content: 'abcdefghijklmnop',
    },
  ]);

  const selection = window.getSelection();

  const [action, setAction] = useState<null | 'add' | 'select' | 'blockize'>(
    null
  );

  const [isBlockizeButtonVisible, setIsBlockizeButtonVisible] =
    useState<boolean>(false);

  const [caret, setCaret] = useState({
    blockIndex: 0,
    startIndex: 0,
    endIndex: 0,
  });

  const [blockizeButtonPosition, setBlockizeButtonPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleSelect = (blockIndex: number) => {
    if (!selection) return;
    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    if (anchorNode === focusNode && anchorOffset === focusOffset) {
      setIsBlockizeButtonVisible(false);
      setAction(null);
      return;
    }

    const block = document.querySelectorAll('.block')[blockIndex];

    setAction('select');
    setCaret({
      blockIndex,
      startIndex: anchorOffset,
      endIndex: focusOffset,
    });

    setBlockizeButtonPosition({
      top: block.getBoundingClientRect().top,
      left: block.getBoundingClientRect().left,
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    blockIndex: number
  ) => {
    if (!selection) return;

    // 아래에 새로운 블록 추가
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      setAction('add');

      setCaret({
        blockIndex,
        startIndex: selection.anchorOffset,
        endIndex: selection.anchorOffset,
      });

      setBlocks((prev) => [
        ...prev.slice(0, blockIndex),
        {
          id: Date.now().toString(),
          isBlock: false,
          content: prev[blockIndex].content.slice(0, selection.anchorOffset),
        },
        {
          id: (Date.now() + 1).toString(),
          isBlock: false,
          content: prev[blockIndex].content
            .slice(selection.anchorOffset)
            .trim(),
        },
        ...prev.slice(blockIndex + 1),
      ]);
    }
  };

  const handleBlockizeButtonClick = () => {
    setAction('blockize');
    const { blockIndex, startIndex, endIndex } = caret;

    setBlocks((prev) => [
      ...prev.slice(0, blockIndex),
      {
        id: Date.now().toString(),
        isBlock: false,
        content: prev[blockIndex].content.slice(0, startIndex),
      },
      {
        id: (Date.now() + 1).toString(),
        isBlock: true,
        content: prev[blockIndex].content.slice(startIndex, endIndex).trim(),
      },
      {
        id: (Date.now() + 2).toString(),
        isBlock: false,
        content: prev[blockIndex].content.slice(endIndex).trim(),
      },
      ...prev.slice(blockIndex + 1),
    ]);

    setIsBlockizeButtonVisible(false);
  };

  useEffect(() => {
    if (action === 'add') {
      const blockNodes = document.querySelectorAll('.block');

      const range = document.createRange();
      range.setStart(blockNodes[caret.blockIndex + 1], 0);
      range.collapse(true);

      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    if (action === 'select' && !isBlockizeButtonVisible) {
      const range = document.createRange();

      const blockNode =
        document.querySelectorAll('.block')[caret.blockIndex].childNodes[0];

      range.setStart(blockNode, caret.startIndex);
      range.setEnd(blockNode, caret.endIndex);

      selection?.removeAllRanges();
      selection?.addRange(range);

      setIsBlockizeButtonVisible(true);
    }
  }, [caret, selection, action, isBlockizeButtonVisible]);

  return (
    <>
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
                className="block"
                onSelect={() => handleSelect(blockIndex)}
                onKeyDown={(e) => handleKeyDown(e, blockIndex)}
              >
                {block.content}
              </Block>
            </BlockWrapper>
          ))}
        </Blocks>
      </Wrapper>

      {isBlockizeButtonVisible && (
        <BlockizeButton
          top={blockizeButtonPosition.top - 24}
          left={blockizeButtonPosition.left}
          onClick={handleBlockizeButtonClick}
        >
          블록 만들기
        </BlockizeButton>
      )}
    </>
  );
};

const BlockizeButton = styled.button<{ top: number; left: number }>`
  ${MEDIUM_5};
  width: 75px;
  height: 28px;
  padding: 4px 10px;
  background: ${colors.bg.light};
  box-shadow: 0px 0px 10px 0px ${colors.bg.indigo};
  border-radius: 4px;

  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 2;
`;

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
