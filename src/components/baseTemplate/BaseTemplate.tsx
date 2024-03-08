import React from 'react';
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

interface Props {
  onClick: () => void;
}

const BaseTemplate: React.FC<Props> = (props) => {
  const { onClick } = props;

  const dummy = [
    '안녕하세요, 0000년 상반기/하반기 00사에 인턴 지원을 하게 된 000입니다.',
    '저는 현재 00대학교 00학과(복전생이라면 00학과 주전공, 00학과 복수전공) 재학 중이며,\n상반기/하반기 인턴 지원을 위해 하단에 이력서 및 자기소개서를 첨부한 이메일을 보내게 되었습니다.',
  ];

  return (
    <>
      <Overlay onClick={onClick} />
      <Wrapper>
        <Preview>
          <Head>
            <Typo type={MEDIUM_2}>회의 일정 공지</Typo>
            <Typo type={REGULAR_6}>[00팀] 00/00 00프로젝트 회의 일정 공유</Typo>
          </Head>
          <Border color={colors.gray3} />
          <Body>
            {dummy.map((block) => (
              <Block>
                {block.split('\n').map((b) => (
                  <div>{b}</div>
                ))}
              </Block>
            ))}
          </Body>
          <Description>
            <Typo type={LIGHT_2} color={colors.primary}>
              회의일정은 회사 내에서 회의 내용에 대한 공지를 드릴 때에
              사용됩니다.
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
                <Typo type={EXTRA_LIGHT_2} color={colors.white}>
                  회의일정 공지
                </Typo>
                <Typo type={EXTRA_LIGHT_2} color={colors.white}>
                  회의일정 조율
                </Typo>
              </TemplateList>
            </TemplateInfo>
          </TemplateListWrapper>
          <GoToWorkspaceButton>
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

const Head = styled.head`
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
