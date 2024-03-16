import { ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Typo from '../typo/Typo';
import { colors } from '@/styles/colors';
import { EXTRA_LIGHT_1, LIGHT_2 } from '@/styles/typo';

import ExpandIcon from '@/assets/svgs/workspace_sidebar_expand.svg?react';
import CollapseIcon from '@/assets/svgs/workspace_sidebar_collapse.svg?react';

interface Props {
  tag?: ReactNode;
  title: string;
  list: {
    id: string;
    title: string;
  }[];
}

const Accordion: React.FC<Props> = (props) => {
  const { tag, title, list } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClickAccordion = () => {
    if (parentRef.current === null || childRef.current === null) {
      return;
    }

    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = '0px';
    } else if (parentRef.current.clientHeight === 0) {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
    }

    setIsCollapsed(!isCollapsed);
  };

  return (
    <Wrapper>
      <Group onClick={handleClickAccordion}>
        <GroupInfo>
          {tag && <IconWrapper>{tag}</IconWrapper>}
          <Typo type={LIGHT_2} color={colors.white}>
            {title}
          </Typo>
        </GroupInfo>
        {list.length &&
          (isCollapsed ? (
            <CollapseIcon width="14px" height="10px" />
          ) : (
            <ExpandIcon width="14px" height="10px" />
          ))}
      </Group>

      <ListWrapper ref={parentRef}>
        <ListItem ref={childRef}>
          {list.map(({ id, title }) => (
            <Typo key={id} type={EXTRA_LIGHT_1} color={colors.white}>
              {title}
            </Typo>
          ))}
        </ListItem>
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Group = styled.section`
  width: 100%;
  padding: 6px 4px 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const GroupInfo = styled.div`
  width: 142px;
  display: flex;
  gap: 6px;
  p {
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 0px;
  overflow: hidden;
  padding: 0 24px;
  transition:
    height 0.35s ease,
    background 0.35s ease;
`;

const ListItem = styled.div`
  padding: 8px 0;
  p {
    max-width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  p + p {
    margin-top: 10px;
  }
`;

export default Accordion;
