import React, { useState } from 'react';
import styled from '@emotion/styled';
import Sidebar from '@/components/sidebar/Sidebar';
import Typo from '@/ui/typo/Typo';
import { LIGHT_2, LIGHT_3, REGULAR_6, SEMI_BOLD_4 } from '@/styles/typo';
import { colors } from '@/styles/colors';
import Thumbnail from '@/components/thumbnail/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes';

import companyImage from '@/assets/imgs/home_base_template_company.png';
import Collapse from '@/assets/svgs/home_option_collapse.svg?react';
import Expand from '@/assets/svgs/home_option_expand.svg?react';
import ETC from '@/assets/svgs/home_etc.svg?react';
import BaseTemplate from '@/components/baseTemplate/BaseTemplate';

interface Props {}

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();

  const goToWorkspace = () => {
    navigate(routes.workspace);
  };

  const [isOptionExpanded, setIsOptionExpanded] = useState<boolean>(false);
  const [isBaseTemplateModalOpened, setIsBaseTemplateModalOpened] =
    useState<boolean>(false);

  const handleOptionClick = () => {
    setIsOptionExpanded(!isOptionExpanded);
  };

  const handleETCButtonClick = () => {
    setIsBaseTemplateModalOpened(!isBaseTemplateModalOpened);
  };

  if (isBaseTemplateModalOpened) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

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

        <MyTemplate>
          <MyTemplateInfo>
            <Typo type={SEMI_BOLD_4} color={colors.gray7}>
              주현 님의 마이템플릿
            </Typo>
            <Typo type={LIGHT_3}>
              저장된 템플릿 <span>18개</span>
            </Typo>
          </MyTemplateInfo>

          <Templates>
            <Thumbnail
              title="안내문 등 제목이 들어가는 위치다"
              memo="메모가 일단 표시된다 그리고 만약 사용자가 안 쓴 경우 첫 줄을 자동으로넣어준다는 메모가 일단 표시된다 그리고 만약 사용자가 안 쓴 경우 첫 줄을 자동으로넣어준다는"
              updatedAt="2022-01-12 15:24"
            />
          </Templates>
        </MyTemplate>

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
              <Option onClick={handleOptionClick}>
                <Typo type={LIGHT_3}>회사</Typo>

                {isOptionExpanded ? (
                  <Collapse width="10px" height="8px" />
                ) : (
                  <Expand width="10px" height="8px" />
                )}
              </Option>
            </BaseTemplateInfo>

            <BaseTemplates>
              <tbody>
                <tr>
                  <td>회의일정 공지</td>
                  <td>회의일정 조율</td>
                  <td>추가자료 요청</td>
                  <td>요청 자료 전달</td>
                  <td>문서제출</td>
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
          <BaseTemplate onClick={handleETCButtonClick} />
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

const MyTemplate = styled.section`
  flex: 1;
  width: 100%;
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 0 48px 16px;
  background: ${colors.bg.light};
`;

const MyTemplateInfo = styled.div`
  width: calc(100% - 20px);
  padding: 24px 20px 12px 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray3};
  span {
    margin-left: 2px;
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

const Templates = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(238px, 1fr));
  row-gap: 16px;
  width: calc(100% - 16px);
  height: calc(100% - 48px);
  padding: 18px 10px 32px 10px;
  overflow-y: auto;
  overflow-x: hidden;
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
`;

const BaseTemplateText = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  width: 88px;
  height: 26px;
  border-radius: 3px;
  padding: 1px 8px 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colors.gray2};
  cursor: pointer;
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
  }
`;

export default Home;
