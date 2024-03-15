import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Background from '@/assets/imgs/landing_6_bg.png';
import Logo from '@/assets/svgs/landing_header_logo.svg?react';

const Landing6 = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <Wrapper>
      <Content>
        <TitleWrapper>
          <Title>메일 작성이 어려울 때는?</Title>
          <Logo width="240px" height="64px" />
        </TitleWrapper>
        <Subtitle1>실무 이메일 작성이 나에게 매번 어려웠다면?</Subtitle1>
        <Subtitle2Wrapper>
          <Subtitle2>지금 바로</Subtitle2>
          <Logo
            width="130px"
            height="30px"
            style={{ margin: '0 2px 0 12px' }}
          />
          <Subtitle2>을 이용해 보세요</Subtitle2>
        </Subtitle2Wrapper>
        <Button onClick={goToHome}>둘러보기</Button>
      </Content>
      <BackgroundImg src={Background} alt="landing sixth background image" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 656px;
  height: 271px;
  margin-top: 100px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 656px;
  height: 64px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  grid-area: title;
  width: 400px;
  height: 64px;
  font-weight: 700;
  font-size: 40px;
  line-height: 160%;
  color: ${colors.white};
`;

const Subtitle1 = styled.div`
  width: 313px;
  height: 29px;
  margin-top: 28px;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  color: ${colors.white};
`;

const Subtitle2Wrapper = styled.div`
  width: 332px;
  height: 36px;
  margin-top: 2px;
  display: flex;
  align-items: center;
`;

const Subtitle2 = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 160%;
  margin-top: 4px;
  color: ${colors.white};
`;

const BackgroundImg = styled.img`
  width: 100%;
`;

const Button = styled.button`
  width: 271px;
  height: 56px;
  margin-top: 56px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: ${colors.primary};
  background: ${colors.white};
  border-radius: 4px;
`;

export default Landing6;
