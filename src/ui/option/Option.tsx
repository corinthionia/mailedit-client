import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import { LIGHT_3 } from '@/styles/typo';
import Collapse from '@/assets/svgs/home_option_collapse.svg?react';
import Expand from '@/assets/svgs/home_option_expand.svg?react';
import { BaseTemplateCategory } from '@/types/template';

interface Props {
  onClick: () => void;
  isOptionExpanded: boolean;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<BaseTemplateCategory>>;
}

const Option = (props: Props) => {
  const { isOptionExpanded, selectedCategory, setSelectedCategory, onClick } =
    props;

  const handleOptionItemClick = (category: BaseTemplateCategory) => {
    setSelectedCategory(category);
  };

  return (
    <Wrapper onClick={onClick} isOptionExpanded={isOptionExpanded}>
      <Select>
        <Typo type={LIGHT_3}>
          {selectedCategory === 'business' ? '회사' : '학교'}
        </Typo>

        {isOptionExpanded ? (
          <Collapse width="10px" height="8px" />
        ) : (
          <Expand width="10px" height="8px" />
        )}
      </Select>
      <OptionWrapper isOptionExpanded={isOptionExpanded}>
        <OptionItem onClick={() => handleOptionItemClick('business')}>
          <Typo type={LIGHT_3}>회사</Typo>
        </OptionItem>
        <OptionItem onClick={() => handleOptionItemClick('school')}>
          <Typo type={LIGHT_3}>학교</Typo>
        </OptionItem>
      </OptionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOptionExpanded: boolean }>`
  width: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${colors.white};
  border-radius: ${(props) => (props.isOptionExpanded ? '3px 3px 0 0' : '3px')};
  border: 1px solid ${colors.gray2};
  cursor: pointer;
`;

const Select = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 8px 0 12px;
`;

const OptionWrapper = styled.div<{ isOptionExpanded: boolean }>`
  display: ${(props) => (props.isOptionExpanded ? 'flex' : 'none')};
  border-top: ${(props) =>
    props.isOptionExpanded && `1px solid ${colors.gray2}`};
  width: 92px;
  height: 64px;
  padding: 4px 6px;
  border-radius: 3px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  z-index: 2;
  top: 26px;
  border-radius: 0 0 3px 3px;
  border: 1px solid ${colors.gray2};
  background: ${colors.white};
`;

const OptionItem = styled.div`
  width: 100%;
  border-radius: 2px;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  &:hover {
    background: ${colors.indigo1};
  }
`;

export default Option;
