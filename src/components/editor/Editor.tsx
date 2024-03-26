import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import GrabIcon from '@/assets/svgs/workspace_editor_grab.svg?react';
import { BaseTemplateContents } from '@/types/template';
import {
  Dispatch,
  DragEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LIGHT_1, LIGHT_2, REGULAR_7 } from '@/styles/typo';
import { css } from '@emotion/react';
import { breakPoint } from '@/styles/breakPoint';
import type { Command } from '@/types/command';
import { copyTextToClipBoard } from '@/utils/copyText';

interface Props {
  blocks: BaseTemplateContents[];
  setBlocks: Dispatch<SetStateAction<BaseTemplateContents[]>>;
}

const Editor = (props: Props) => {
  const { blocks, setBlocks } = props;

  const [command, setCommand] = useState<Command>(null);
  const [caretPosition, setCaretPosition] = useState({
    blockIndex: -1,
    lineIndex: -1,
    characterIndex: 0,
  });

  const selection = window.getSelection();
  const blocksRef = useRef<HTMLDivElement>(null);

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
    setBlocks((prev) => updateBlockContents() || prev);

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
      selection?.focusOffset === 0
    ) {
      e.preventDefault();
      deleteBlock(caretPosition.blockIndex);
      setCommand('Backspace');
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
    const { blockIndex, lineIndex } = caretPosition;

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

    if (
      command === 'Backspace' &&
      lineIndex === 0 &&
      (selection?.focusOffset ?? 0) === 0
    ) {
      setCaretPosition((prev) => ({
        blockIndex: prev.blockIndex - 1,
        lineIndex: 0, // TODO 값 구하기
        characterIndex:
          getNodeByIndex(prev.blockIndex - 1, 0)?.textContent?.length ?? 0,
      }));

      setCommand(null);
      return;
    }
  }, [blocks, caretPosition, command, selection?.focusOffset]);

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
  }, [caretPosition, selection]);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.dataTransfer.setData('position', position.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, blockIndex: number) => {
    const draggingPosition = Number(e.dataTransfer.getData('position'));
    const draggingItem = blocks[draggingPosition];

    if (blockIndex === draggingPosition) return;

    const newList = updateBlockContents() ?? [];
    newList.splice(draggingPosition, 1);
    newList.splice(blockIndex, 0, draggingItem);

    setBlocks(newList);
  };

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

  // const onDragEnd = ({ source, destination }: DropResult) => {
  //   setBlocks((prev) => updateBlockContents() || prev);

  //   if (!destination) return;

  //   const newList = updateBlockContents() ?? [];
  //   const [slice] = newList.slice(source.index, 1);
  //   newList.splice(destination.index, 0, slice);

  //   setBlocks(newList);
  // };

  return (
    <Wrapper>
      <CopyButton onClick={handleCopyButton}>복사하기</CopyButton>

      <DroppableArea>
        <Blocks ref={blocksRef}>
          {blocks.map((block, blockIndex) => (
            <BlockWrapper
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, blockIndex)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, blockIndex)}
            >
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
      </DroppableArea>
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

const DroppableArea = styled.div`
  width: 100%;
  height: 100%;
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
