import React from 'react';
import styled from '@emotion/styled';
import GoToHomeIcon from '@/assets/svgs/workspace_preview_go_to_home.svg?react';
import {
  LIGHT_1,
  LIGHT_2,
  LIGHT_3,
  REGULAR_7,
  SEMI_BOLD_3,
} from '@/styles/typo';
import Typo from '@/ui/typo/Typo';
import { colors } from '@/styles/colors';
import { breakPoint } from '@/styles/breakPoint';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes';
import { BaseTemplate } from '@/types/template';

import noTemplateImg from '@/assets/imgs/workspace_preview_no_template.png';

interface Props {
  template: BaseTemplate | null;
}

const Preview: React.FC<Props> = (props: Props) => {
  const { template } = props;

  const navigate = useNavigate();

  const handleUseTemplateButtonClick = () => {
    if (!template) return;

    // setBlocks((prev) => [...prev, ...template.contents]);
  };

  const goToHome = () => {
    navigate(routes.home);
  };

  return (
    <Wrapper>
      <GoToHomeIcon
        width="24px"
        height="24px"
        onClick={goToHome}
        cursor="pointer"
      />
      <Body>
        {template ? (
          <>
            <TemplateInfo>
              <Typo type={SEMI_BOLD_3}>{template.title}</Typo>
            </TemplateInfo>
            <ItemWrapper>
              <TemplateInfo>
                <Typo type={LIGHT_3}>{template.description}</Typo>
              </TemplateInfo>
              <UseTemplateButton onClick={handleUseTemplateButtonClick}>
                템플릿 쓰기
              </UseTemplateButton>
            </ItemWrapper>

            <Blocks>
              {template.contents.map((block) => (
                <Block key={block.id}>
                  {block.text.split('\n').map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </Block>
              ))}
            </Blocks>
          </>
        ) : (
          <NoTemplateWrapper>
            <NoTemplateImage src={noTemplateImg} />
            <Typo type={LIGHT_1}>템플릿을 조합해서 사용해 보세요!</Typo>
          </NoTemplateWrapper>
        )}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  padding: 28px 28px;
  overflow: hidden;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 4px;
  padding: 0 20px 40px 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  margin-bottom: 18px;
  padding-right: 24px;
`;

const TemplateInfo = styled.div`
  width: 300px;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
`;

const UseTemplateButton = styled.button`
  ${REGULAR_7};
  width: 72px;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background: ${colors.gray6};
  border-radius: 3px;
`;

const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
`;

const Block = styled.div`
  ${LIGHT_2};
  width: calc(100% - 20px);
  padding: 4px 12px;
  letter-spacing: -0.5%;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 150%;
  background: none;
  border-radius: 2px;
  border: 1px solid transparent;
  background: rgba(82, 116, 239, 0.15);
  border: 1px solid ${colors.primary};
  cursor: pointer;
  @media screen and (min-width: ${breakPoint.xl}) {
    ${LIGHT_1};
  }
`;

const NoTemplateWrapper = styled.div`
  width: 296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoTemplateImage = styled.img`
  width: 296px;
  height: 222px;
`;
export default Preview;
