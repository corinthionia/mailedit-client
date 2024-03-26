import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

import Logo from '@/assets/svgs/landing_header_logo.svg?react';
import landingHeader from '@/assets/videos/landing_header.mp4';
import AuthModal from '@/components/auth/AuthModal';
import { useQuery } from '@tanstack/react-query';
import { getSession, logout } from '@/apis/auth';

const Header = () => {
  const navigate = useNavigate();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const getSessionQuery = useQuery({
    queryKey: [],
    queryFn: getSession,
  });

  const handleSignInBtnClick = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  const handleSignUpBtnClick = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const handleSignOutBtnClick = () => {
    logout();
    getSessionQuery.refetch();
  };

  const goToHome = () => {
    navigate('/home');
  };

  if (isSignInModalOpen || isSignUpModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <Top>
        <Logo width="163px" height="32px" />
        {getSessionQuery.data ? (
          <Option isLogin={Boolean(getSessionQuery.data)}>
            <Text onClick={handleSignOutBtnClick}>로그아웃</Text>
          </Option>
        ) : (
          <Option isLogin={Boolean(getSessionQuery.data)}>
            <Text onClick={goToHome}>둘러보기</Text>
            <Border />
            <Text onClick={handleSignInBtnClick}>로그인</Text>
            <Button onClick={handleSignUpBtnClick}>지금 시작하기</Button>
          </Option>
        )}
      </Top>

      <Video autoPlay loop muted playsInline>
        <source src={landingHeader} type="video/mp4" />
      </Video>

      {isSignInModalOpen && (
        <AuthModal setIsSignInModalOpen={setIsSignInModalOpen} />
      )}
    </>
  );
};

const Video = styled.video`
  width: 100%;
  display: block;
`;

const Top = styled.header`
  width: 100%;
  min-width: 1024px;
  height: 88px;
  padding: 0 40px;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Option = styled.div<{ isLogin: boolean }>`
  width: 236px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: ${(isLogin) => (isLogin ? 'flex-end' : 'space-between')};
  font-size: 12px;
`;

const Text = styled.span`
  height: 14px;
  margin-right: 23px;
  cursor: pointer;
  color: ${colors.white};
  @media screen and (max-width: 768px) {
    margin-right: 4px;
  }
`;

const Border = styled.div`
  width: 1px;
  height: 13px;
  margin-right: 23px;
  background: ${colors.white};
  @media screen and (max-width: 768px) {
    margin-right: 4px;
  }
`;

const Button = styled.div`
  width: 90px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  font-size: 12px;
  background: ${colors.white};
  cursor: pointer;
`;

export default Header;
