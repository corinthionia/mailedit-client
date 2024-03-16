import React, { useState } from 'react';
import styled from '@emotion/styled';
import { routes } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import Typo from '@/ui/typo/Typo';
import { LIGHT_2, LIGHT_3, REGULAR_6, SEMI_BOLD_4 } from '@/styles/typo';
import { colors } from '@/styles/colors';
import { useQuery } from '@tanstack/react-query';

import Sidebar from '@/components/sidebar/Sidebar';
import UserTemplate from '@/components/userTemplate/UserTemplate';
import BaseTemplate from '@/components/baseTemplate/BaseTemplate';

import companyImage from '@/assets/imgs/home_base_template_company.png';
import ETC from '@/assets/svgs/home_etc.svg?react';

import { getFilteredBaseTemplatesByCategory } from '@/apis/template';
import {
  BaseTemplateCategory,
  BaseTemplate as BaseTemplateType,
} from '@/types/template';
import Option from '@/ui/option/Option';

interface Props {}

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();

  const goToWorkspace = () => {
    navigate(routes.workspace);
  };

  const [isOptionExpanded, setIsOptionExpanded] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] =
    useState<BaseTemplateCategory>('business');
  const [selectedTemplate, setSelectedTemplate] = useState<BaseTemplate>();

  const [isBaseTemplateModalOpened, setIsBaseTemplateModalOpened] =
    useState<boolean>(false);

  const handleOptionClick = () => {
    setIsOptionExpanded(!isOptionExpanded);
  };

  const handleBaseTemplateTitleClick = (template: BaseTemplateType) => {
    setSelectedTemplate(template);
    setIsBaseTemplateModalOpened(true);
  };

  const handleETCButtonClick = () => {
    setIsBaseTemplateModalOpened(!isBaseTemplateModalOpened);
  };

  if (isBaseTemplateModalOpened) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const getBusinessBaseTemplateQuery = useQuery({
    queryKey: [],
    queryFn: () => getFilteredBaseTemplatesByCategory('business'),
  });

  const getSchoolBaseTemplateQuery = useQuery({
    queryKey: ['school'],
    queryFn: () => getFilteredBaseTemplatesByCategory('school'),
  });

  return (
    <Wrapper>
      <Sidebar />
      <Main>
        <Top>
          <Typo type={LIGHT_3} color={colors.gray6} pointer>
            로그아웃
          </Typo>
          <ItemWrapper>
            <Typo type={REGULAR_6} color={colors.primary}>
              안녕하세요 주현 님, 오늘도 이메일 작성의 고수가 되어 보세요!
            </Typo>
            <GoToWorkspaceButton onClick={goToWorkspace}>
              <Typo type={REGULAR_6} color={colors.white}>
                템플릿 만들기
              </Typo>
            </GoToWorkspaceButton>
          </ItemWrapper>
        </Top>

        <UserTemplate />

        <Bottom>
          <BaseTemplateArea>
            <BaseTemplateInfo>
              <BaseTemplateText>
                <Typo type={SEMI_BOLD_4}>회사에서 일잘러가 되려면?</Typo>
                <Typo type={LIGHT_2}>
                  MailedIt에서 제공하는 기본 템플릿을 사용해 이메일 작성 효율을
                  좀 더 높여 보세요.
                </Typo>
              </BaseTemplateText>

              <Option
                onClick={handleOptionClick}
                isOptionExpanded={isOptionExpanded}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </BaseTemplateInfo>

            <BaseTemplates>
              <tbody>
                <tr>
                  {selectedCategory === 'business'
                    ? getBusinessBaseTemplateQuery.data
                        ?.slice(0, 5)
                        .map((template) => (
                          <td
                            key={template.id}
                            onClick={() =>
                              handleBaseTemplateTitleClick(template)
                            }
                          >
                            {template.title}
                          </td>
                        ))
                    : getSchoolBaseTemplateQuery.data
                        ?.slice(0, 5)
                        .map((template) => (
                          <td
                            key={template.id}
                            onClick={() =>
                              handleBaseTemplateTitleClick(template)
                            }
                          >
                            {template.title}
                          </td>
                        ))}
                  <td onClick={handleETCButtonClick}>
                    <ETC width="22px" height="4px" />
                  </td>
                </tr>
              </tbody>
            </BaseTemplates>
          </BaseTemplateArea>

          <img src={companyImage} alt="company" width="232px" height="154px" />
        </Bottom>

        {isBaseTemplateModalOpened && (
          <BaseTemplate
            onClick={handleETCButtonClick}
            selectedBaseTemplate={selectedTemplate}
            businessTemplates={
              getBusinessBaseTemplateQuery.data as BaseTemplateType[]
            }
            schoolTemplates={
              getSchoolBaseTemplateQuery.data as BaseTemplateType[]
            }
          />
        )}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 233px 1fr;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 28px 40px 24px 28px;
`;

const Top = styled.section`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const GoToWorkspaceButton = styled.button`
  width: 206px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primary};
`;

const Bottom = styled.section`
  width: 100%;
  height: 154px;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const BaseTemplateArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 28px;
`;

const BaseTemplateInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const BaseTemplateText = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const BaseTemplates = styled.table`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border-collapse: collapse;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${colors.indigo2};
  td {
    ${REGULAR_6};
    width: 16.666%;
    border: 1px solid ${colors.indigo2};
    text-align: center;
    cursor: pointer;
    padding: 0 16px;
  }
`;

export default Home;
