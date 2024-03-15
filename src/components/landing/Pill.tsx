import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  isLeftSelected: boolean;
  isRightSelected: boolean;
}

const Pill = (props: Props) => {
  const { isLeftSelected, isRightSelected } = props;

  return (
    <Wrapper>
      <Left isLeftSelected={isLeftSelected}>기본템플릿</Left>
      <Right isRightSelected={isRightSelected}>마이템플릿</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 234px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div<{ isLeftSelected: boolean }>`
  width: 114px;
  height: 31px;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  border: 2px solid ${colors.indigo5};
  border-right: 1px solid ${colors.indigo5};
  border-radius: 16px 0px 0px 16px;

  ${({ isLeftSelected }) =>
    isLeftSelected
      ? css`
          color: ${colors.white};
          background: ${colors.indigo5};
        `
      : css`
          color: ${colors.indigo5};
          background: none;
        `}
`;

const Right = styled.div<{ isRightSelected: boolean }>`
  width: 114px;
  height: 31px;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.indigo5};
  border: 2px solid ${colors.indigo5};
  border-left: 1px solid ${colors.indigo5};
  border-radius: 0px 16px 16px 0px;

  ${({ isRightSelected }) =>
    isRightSelected
      ? css`
          color: ${colors.white};
          background: ${colors.indigo5};
        `
      : css`
          color: ${colors.indigo5};
          background: none;
        `}
`;

export default Pill;
