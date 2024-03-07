import React, { useState } from 'react';
import styled from '@emotion/styled';
import Typo from '@/ui/typo/Typo';
import { LIGHT_4, MEDIUM_3, REGULAR_8 } from '@/styles/typo';
import { colors } from '@/styles/colors';
import BinIcon from '@/assets/svgs/home_bin.svg?react';
import StarEmptyIcon from '@/assets/svgs/home_star_empty.svg?react';
import StarFilledIcon from '@/assets/svgs/home_star_filled.svg?react';

interface Props {
  title: string;
  memo: string;
  updatedAt: string;
}

const Thumbnail: React.FC<Props> = (props) => {
  const { title, memo, updatedAt } = props;
  const [isStared, setIsStared] = useState<boolean>(false);

  const handleClickStar = () => {
    setIsStared(!isStared);
  };

  return (
    <Wrapper>
      <IndexWrapper>
        <Index />
      </IndexWrapper>

      <Main>
        <Title>
          <Typo type={MEDIUM_3} color={colors.gray7}>
            {title}
          </Typo>
        </Title>
        <ItemWrapper>
          <Memo>
            <Typo type={LIGHT_4} color={colors.gray7}>
              {memo}
            </Typo>
          </Memo>

          {isStared ? (
            <StarFilledIcon
              width="18px"
              height="18px"
              cursor="pointer"
              onClick={handleClickStar}
            />
          ) : (
            <StarEmptyIcon
              width="18px"
              height="18px"
              cursor="pointer"
              onClick={handleClickStar}
            />
          )}
        </ItemWrapper>
      </Main>

      <Bottom>
        <Typo type={REGULAR_8} color={colors.gray5}>
          {updatedAt}에 수정됨
        </Typo>
        <DeleteIconWrapper>
          <BinIcon width="14px" height="14px" />
        </DeleteIconWrapper>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 232px;
  height: 132px;
  border-radius: 6px;
  box-shadow: 0px 3.752px 7.504px 0px rgba(0, 0, 0, 0.15);
  background: ${colors.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const IndexWrapper = styled.div`
  width: 100%;
  height: 4px;
  display: flex;
  justify-content: flex-end;
`;

const Index = styled.div`
  width: 112px;
  border-top: 7px solid ${colors.tag.green};
  border-left: 12px solid transparent;
`;

const Title = styled.div`
  width: 208px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Memo = styled.div`
  width: 172px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: table;
  vertical-align: bottom;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Main = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 8px 8px 4px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Bottom = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 14px;
  background: ${colors.bg.gray};
`;

const DeleteIconWrapper = styled.div`
  width: 32px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${colors.gray3};
  cursor: pointer;
`;
export default Thumbnail;
