import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import React, { useRef } from 'react';

import Logo from '@/assets/svgs/home_sidebar_logo.svg?react';
import SearchIcon from '@/assets/svgs/home_sidebar_search.svg?react';
import { MEDIUM_5, REGULAR_4 } from '@/styles/typo';
import Typo from '@/ui/typo/Typo';
import Accordion from '@/ui/accordion/Accordion';
import StarIcon from '@/assets/svgs/home_sidebar_star.svg?react';
import Border from '@/ui/border/Border';

interface Props {}

const Sidebar: React.FC<Props> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  console.log(scrollRef.current);

  return (
    <Wrapper>
      <Logo width="156px" height="32px" />
      <Search>
        <SearchIcon width="16px" height="16px" />
        <SearchInput placeholder="템플릿을 검색하세요" spellCheck={false} />
      </Search>

      <TemplateArea ref={scrollRef}>
        <TemplateGroup>
          <GroupTitle>
            <Typo type={REGULAR_4} color={colors.white}>
              마이템플릿
            </Typo>
          </GroupTitle>
          <Accordion
            tag={<StarIcon width="16px" height="16px" />}
            title="즐겨찾기"
            list={[{ title: '결제요청', id: '1' }]}
          />
          <Border color={colors.indigo4} margin="4px 0" />
          <Accordion
            tag={<Tag color={colors.tag.red} />}
            title="그룹1"
            list={[
              { title: '결제요청', id: '1' },
              { title: '결제요청', id: '2' },
              { title: '결제요청', id: '3' },
            ]}
          />
        </TemplateGroup>

        <TemplateGroup>
          <GroupTitle>
            <Typo type={REGULAR_4} color={colors.white}>
              기본템플릿
            </Typo>
          </GroupTitle>
          <Accordion
            tag={<Tag color={colors.indigo2} />}
            title="회사"
            list={[{ title: '결제요청', id: '0' }]}
          />
          <Accordion
            tag={<Tag color={colors.indigo2} />}
            title="학교"
            list={[{ title: '결제요청', id: '0' }]}
          />
        </TemplateGroup>
      </TemplateArea>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  grid-area: 'sidebar';
  width: 100%;
  height: 100vh;
  max-width: 328px;
  padding: 24px 12px 32px 24px;
  overflow: hidden;
  background: ${colors.primary};
  display: flex;
  flex-direction: column;
`;

const Search = styled.div`
  width: calc(100% - 12px);
  height: 28px;
  background: ${colors.indigo4};
  display: flex;
  align-items: center;
  margin: 36px 0 32px 0;
  padding: 0 8px;
  gap: 6px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  ${MEDIUM_5};
  width: 100%;
  background: none;
  color: ${colors.white};
  ::placeholder {
    color: ${colors.indigo1};
  }
`;

const TemplateArea = styled.div`
  flex: 1;
  width: 100%;
  gap: 32px;
  display: flex;
  flex-direction: column;
  padding-right: 12px;
  overflow: auto;

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.indigo0};
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
`;

const TemplateGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Tag = styled.div<{ color: string }>`
  width: 4px;
  height: 16px;
  border-radius: 1px;
  background: ${(props) => props.color};
`;

const GroupTitle = styled.div`
  margin-bottom: 12px;
`;

export default Sidebar;
