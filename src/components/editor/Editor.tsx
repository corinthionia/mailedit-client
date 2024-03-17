import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import {
  LIGHT_1,
  LIGHT_2,
  MEDIUM_0,
  REGULAR_6,
  REGULAR_7,
} from '@/styles/typo';
import GrabIcon from '@/assets/svgs/workspace_editor_grab.svg?react';
import TooltipIcon from '@/assets/svgs/workspace_editor_tooltip.svg?react';
import { breakPoint } from '@/styles/breakPoint';
import { copyTextToClipBoard } from '@/utils/copyText';
import type { Command } from '@/types/command';
import { BaseTemplateContents } from '@/types/template';

interface Props {
  blocks: BaseTemplateContents[];
  setBlocks: Dispatch<SetStateAction<BaseTemplateContents[]>>;
}

const Editor = (props: Props) => {
  const { blocks, setBlocks } = props;

  const selection = window.getSelection();
  const blocksRef = useRef<HTMLDivElement>(null);

  const [command, setCommand] = useState<Command>(null);
  const [caretPosition, setCaretPosition] = useState({
    blockIndex: -1,
    lineIndex: -1,
    characterIndex: 0,
  });

  const getNodeByIndex = (blockIndex: number, lineIndex: number) => {
    if (!blocksRef.current) return;

    return blocksRef.current.children[blockIndex].children[1].childNodes[
      lineIndex
    ];
  };

  const updateBlockContents = () => {
    if (!blocksRef.current) return;

    const updatedBlocks = Array.from(blocksRef.current.childNodes).map(
      (block, index) => {
        const lines = Array.from(block.childNodes[1].childNodes);
        const isBlock =
          blocksRef.current?.children[index].children[1].getAttribute(
            'data-is-block'
          );

        return {
          id: `${Date.now().toString()} ${index}`,
          isBlock: isBlock === 'true',
          text: lines.map((line) => line.textContent).join('\n'),
        };
      }
    );

    return updatedBlocks;
  };

  // Move caret to clicked position
  const handleClick = (blockIndex: number, lineIndex: number) => {
    setBlocks(updateBlockContents() ?? []);

    setCaretPosition({
      blockIndex,
      lineIndex,
      characterIndex: selection?.focusOffset ?? 0,
    });
  };

  // Delete a Block with a backspace key
  const deleteBlock = (blockIndex: number) => {
    if (!blocksRef.current) return;

    const updatedBlocks = updateBlockContents();
    if (!updatedBlocks) return;

    setBlocks([
      ...updatedBlocks.slice(0, blockIndex - 1),
      {
        ...updatedBlocks[blockIndex - 1],
        text:
          updatedBlocks[blockIndex - 1].text + updatedBlocks[blockIndex].text,
      },
      ...updatedBlocks.slice(blockIndex + 1),
    ]);
  };

  // Add a new line in the same block
  const addNewLine = (blockIndex: number, lineIndex: number) => {
    if (!blocksRef.current) return;

    const updatedBlocks = updateBlockContents();
    if (!updatedBlocks) return;

    const lines = updatedBlocks[blockIndex].text.split('\n');

    setBlocks([
      ...updatedBlocks.slice(0, blockIndex === 0 ? 0 : blockIndex),
      {
        id: `${Date.now()}`,
        isBlock: updatedBlocks[blockIndex].isBlock,
        text: [
          ...lines.slice(0, lineIndex),
          lines[lineIndex].slice(0, selection?.focusOffset),
          lines[lineIndex].slice(selection?.focusOffset),
          ...lines.slice(lineIndex + 1),
        ].join('\n'),
      },
      ...updatedBlocks.slice(blockIndex + 1),
    ]);
  };

  // Add a new block
  const addNewBlock = (blockIndex: number, lineIndex: number) => {
    if (lineIndex === -1) {
      return;
    }

    if (!blocksRef.current) return;

    const updatedBlocks = updateBlockContents();
    if (!updatedBlocks) return;

    const lines = updatedBlocks[blockIndex].text.split('\n');

    setBlocks([
      ...updatedBlocks.slice(0, blockIndex ? blockIndex : 0),
      {
        id: `${Date.now()}`,
        isBlock: false,
        text:
          [
            ...lines.slice(0, lineIndex),
            lines[lineIndex].slice(0, selection?.getRangeAt(0).endOffset ?? 0),
          ]
            .join('\n')
            .trim() ?? '',
      },
      {
        id: `${Number(Date.now()) + 1}`,
        isBlock: false,
        text:
          [
            updatedBlocks[blockIndex].text
              .split('\n')
              // eslint-disable-next-line no-unexpected-multiline
              [lineIndex].slice(selection?.getRangeAt(0).endOffset ?? 0 + 1),
            ...updatedBlocks[blockIndex].text.split('\n').slice(lineIndex + 1),
          ]
            .join('\n')
            .trim() ?? '',
      },
      ...updatedBlocks.slice(blockIndex + 1),
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // 현재 블록 삭제
    if (
      e.key === 'Backspace' &&
      caretPosition.blockIndex !== 0 &&
      caretPosition.lineIndex === 0 &&
      caretPosition.characterIndex === 0 &&
      selection?.focusOffset === 0
    ) {
      e.preventDefault();
      deleteBlock(caretPosition.blockIndex);
      setCommand(e.key);
    }

    // 현재 블록 내에서 줄 바꿈
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      addNewLine(caretPosition.blockIndex, caretPosition.lineIndex);
      setCommand('ShiftEnter');
    }

    // 새로운 블록 추가
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNewBlock(caretPosition.blockIndex, caretPosition.lineIndex);
      setCommand('Enter');
    }
  };

  useEffect(() => {
    const { blockIndex, lineIndex, characterIndex } = caretPosition;

    if (blockIndex === -1 || lineIndex === -1) {
      return;
    }

    if (command === 'Enter') {
      setCaretPosition((prev) => ({
        blockIndex: prev.blockIndex + 1,
        lineIndex: 0,
        characterIndex: 0,
      }));

      setCommand(null);
      return;
    }

    if (command === 'ShiftEnter') {
      setCaretPosition((prev) => ({
        ...prev,
        lineIndex: prev.lineIndex + 1,
        characterIndex: 0,
      }));

      setCommand(null);
      return;
    }

    if (command === 'Backspace' && lineIndex === 0 && characterIndex === 0) {
      setCaretPosition((prev) => ({
        blockIndex: prev.blockIndex - 1,
        lineIndex: 0, // TODO 값 구하기
        characterIndex:
          getNodeByIndex(prev.blockIndex - 1, 0)?.textContent?.length ?? 0,
      }));

      setCommand(null);
      return;
    }
  }, [blocks, caretPosition, command]);

  useEffect(() => {
    if (
      selection &&
      blocksRef.current &&
      caretPosition.blockIndex !== -1 &&
      caretPosition.lineIndex !== -1
    ) {
      updateBlockContents();

      const range = document.createRange();

      const currentNode =
        blocksRef.current.children[caretPosition.blockIndex].children[1]
          .childNodes[caretPosition.lineIndex];

      if (currentNode.childNodes.length) {
        range.setStart(currentNode.childNodes[0], caretPosition.characterIndex);
      } else {
        range.setStart(currentNode, 0);
      }

      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [caretPosition]);

  const handleCopyButton = async () => {
    if (blocksRef.current) {
      const text = Array.from(blocksRef.current.childNodes)
        .map((block) =>
          Array.from(block.childNodes[1].childNodes)
            .map((line) => line.textContent)
            .join('\n')
        )
        .join('\n\n');

      await copyTextToClipBoard(text);
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
        <CopyButton onClick={handleCopyButton}>복사하기</CopyButton>
        <Blocks ref={blocksRef}>
          {blocks.map((block, blockIndex) => (
            <BlockWrapper key={block.id}>
              <GrabButton>
                <GrabIcon width="6px" height="12px" />
              </GrabButton>
              <Block
                spellCheck
                contentEditable
                onKeyDown={handleKeyDown}
                isBlock={block.isBlock}
                data-block-index={blockIndex}
                data-is-block={block.isBlock}
                suppressContentEditableWarning
              >
                {block.text.split('\n').map((line, lineIndex) => (
                  <div
                    key={`${Date.now().toString()} ${line}`}
                    data-line-index={lineIndex}
                    onClick={() => handleClick(blockIndex, lineIndex)}
                  >
                    {line}
                  </div>
                ))}
              </Block>
            </BlockWrapper>
          ))}
        </Blocks>
      </Edit>

      <SaveButton>템플릿 저장하기</SaveButton>
    </Wrapper>
  );
};

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

const Edit = styled.div`
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
