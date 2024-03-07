import React from 'react';
import styled from '@emotion/styled';
import GoToHomeIcon from '@/assets/svgs/workspace_preview_go_to_home.svg?react';
import { LIGHT_1, LIGHT_3, REGULAR_7, SEMI_BOLD_3 } from '@/styles/typo';
import Typo from '@/ui/typo/Typo';
import { colors } from '@/styles/colors';
import { breakPoint } from '@/styles/breakPoint';

interface Props {}

const Preview: React.FC<Props> = () => {
  return (
    <Wrapper>
      <GoToHomeIcon width="24px" height="24px" />
      <Body>
        <TemplateInfo>
          <Typo type={SEMI_BOLD_3}>일정 공유</Typo>
        </TemplateInfo>
        <ItemWrapper>
          <TemplateInfo>
            <Typo type={LIGHT_3}>
              제목: [OO팀] OO/OO 프로젝트 회의 일정 공유
            </Typo>
          </TemplateInfo>
          <UseTemplateButton>템플릿 쓰기</UseTemplateButton>
        </ItemWrapper>

        <Blocks>
          <Block>OOO님 안녕하세요, 저는 OO팀 OOO입니다.</Block>
          <Block>
            OO 프로젝트와 관련해서 OO팀이 주최하는 회의를 진행하고자 합니다.
            <br />
            이번 회의일정은 다음과 같습니다.
          </Block>
          <Block>
            {`1. 일시: OOOO년 OO월 OO일 오전/오후 OO시 ~ OO시
2. 장소: (장소) 
3. 안건: (안건) 
4. 참석 대상: (참석 대상) 
5. 사전 준비사항: (사전 준비사항)`}
          </Block>
          <Block>
            부득이하게 본 회의에 참석이 어려우신 경우, 원활한 회의 진행을 위해
            OO월 OO일 오전/오후 OO시까지 회신 부탁드립니다.
          </Block>
          <Block>감사합니다. OOO 드림.</Block>
        </Blocks>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  padding: 24px 28px;
  overflow: hidden;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
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
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

const UseTemplateButton = styled.button`
  ${REGULAR_7};
  width: 72px;
  padding: 6px 0;
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
  ${LIGHT_3};
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
  @media screen and (min-width: ${breakPoint.l}) {
    ${LIGHT_1};
  }
`;

export default Preview;
