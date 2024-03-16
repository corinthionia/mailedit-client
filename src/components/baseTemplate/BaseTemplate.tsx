import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import {
  EXTRA_LIGHT_2,
  LIGHT_2,
  MEDIUM_2,
  MEDIUM_5,
  REGULAR_6,
} from '@/styles/typo';
import Border from '@/ui/border/Border';
import { BaseTemplate } from '@/types/template';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes';
import { useSetRecoilState } from 'recoil';
import { SelectedTemplateAtom } from '@/recoils/selectedTemplate';

interface Props {
  onClick: () => void;
  selectedBaseTemplate?: BaseTemplate;
  businessTemplates: BaseTemplate[];
  schoolTemplates: BaseTemplate[];
}

const BaseTemplate: React.FC<Props> = (props) => {
  const { onClick, selectedBaseTemplate, businessTemplates, schoolTemplates } =
    props;
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState<BaseTemplate>(
    selectedBaseTemplate ?? businessTemplates[0]
  );

  const setTemplateToWorkspace = useSetRecoilState(SelectedTemplateAtom);

  const handleTemplateTitleClick = (template: BaseTemplate) => {
    setSelectedTemplate(template);
  };

  const goToWorkspace = () => {
    setTemplateToWorkspace(selectedTemplate);
    navigate(routes.workspace);
  };

  return (
    <>
      <Overlay onClick={onClick} />
      <Wrapper>
        <Preview>
          <Head>
            <Typo type={MEDIUM_2}>{selectedTemplate.title}</Typo>
            <Typo type={REGULAR_6}>{selectedTemplate.description}</Typo>
          </Head>
          <Border color={colors.gray3} />
          <Body>
            {selectedTemplate.contents.map((block) => (
              <Block key={block.id}>
                {block.text.split('\n').map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </Block>
            ))}
          </Body>
          <Description>
            <Typo type={LIGHT_2} color={colors.primary}>
              {selectedTemplate.description}
            </Typo>
          </Description>
        </Preview>

        <Aside>
          <TemplateListWrapper>
            <TemplateInfo>
              <Typo type={REGULAR_6} color={colors.white}>
                회사
              </Typo>
              <Border color={colors.white} />
              <TemplateList>
                {businessTemplates.map((template) => (
                  <Typo
                    key={template.id}
                    type={EXTRA_LIGHT_2}
                    color={colors.white}
                    onClick={() => handleTemplateTitleClick(template)}
                  >
                    {template.title}
                  </Typo>
                ))}
              </TemplateList>
            </TemplateInfo>

            <TemplateInfo>
              <Typo type={REGULAR_6} color={colors.white}>
                학교
              </Typo>
              <Border color={colors.white} />
              <TemplateList>
                {schoolTemplates.map((template) => (
                  <Typo
                    key={template.id}
                    type={EXTRA_LIGHT_2}
                    color={colors.white}
                    onClick={() => handleTemplateTitleClick(template)}
                  >
                    {template.title}
                  </Typo>
                ))}
              </TemplateList>
            </TemplateInfo>
          </TemplateListWrapper>
          <GoToWorkspaceButton onClick={goToWorkspace}>
            <Typo type={MEDIUM_5} color={colors.primary}>
              템플릿 사용하기
            </Typo>
          </GoToWorkspaceButton>
        </Aside>
      </Wrapper>
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  overflow: hidden;
`;

const Wrapper = styled.main`
  width: 920px;
  height: 532px;
  border-radius: 3px;
  position: fixed;
  overflow: hidden;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 0 auto;
  display: grid;
  grid-template-columns: 1fr 232px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Preview = styled.section`
  width: 100%;
  height: 100%;
  background: ${colors.white};
  padding: 36px 44px;
`;

const Head = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

const Body = styled.div`
  height: 324px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 24px;
  overflow: auto;
  padding-right: 8px;
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
  width: 100%;
`;

const Description = styled.div`
  margin-top: 20px;
`;

const Aside = styled.aside`
  width: 100%;
  height: 100%;
  color: ${colors.white};
  background: ${colors.primary};
  padding: 44px 16px 36px 24px;
`;

const TemplateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TemplateListWrapper = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  padding-right: 8px;
  flex-direction: column;
  overflow: auto;
  gap: 28px;
  padding-right: 16px;
  p {
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.white};
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
`;

const TemplateList = styled.div`
  width: 100%;
  margin-top: 4px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GoToWorkspaceButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  border-radius: 4px;
  padding: 8px 0;
  width: 100%;
  margin-top: 12px;
`;
export default BaseTemplate;
