import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import Typo from '@/ui/typo/Typo';
import { EXTRA_LIGHT_2, MEDIUM_5, REGULAR_6, REGULAR_7 } from '@/styles/typo';
import CloseIcon from '@/assets/svgs/landing_auth_close.svg?react';
import Logo from '@/assets/svgs/landing_auth_logo_blue.svg?react';
import GoogleIcon from '@/assets/svgs/landing_auth_google.svg?react';
import Border from '@/ui/border/Border';
import { signInWithGoogle } from '@/apis/auth';

interface Props {
  setIsSignInModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthModal = (props: Props) => {
  const { setIsSignInModalOpen } = props;

  const closeModal = () => {
    setIsSignInModalOpen(false);
  };

  const handleGoogleSignInButtonClick = () => {
    signInWithGoogle();
  };

  return (
    <>
      <Overlay onClick={closeModal} />
      <Wrapper>
        <CloseIcon
          width="24px"
          height="24px"
          cursor="pointer"
          onClick={closeModal}
        />
        <Body>
          <Logo width="186px" height="40px" />
          <Typo type={REGULAR_6}>
            처음 써보는 메일, MailedIt에서 쉽게 시작해 보세요
          </Typo>

          <GoogleButton onClick={handleGoogleSignInButtonClick}>
            <GoogleIcon width="28px" height="28px" />
            <Typo type={REGULAR_6}>구글로 계속하기</Typo>
          </GoogleButton>

          <BorderWrapper>
            <Border color={colors.gray3} width="112px" />
            <Typo type={EXTRA_LIGHT_2} color={colors.gray5}>
              또는
            </Typo>
            <Border color={colors.gray3} width="112px" />
          </BorderWrapper>
          <EmailInput placeholder="이메일 주소" type="email" />

          <NextButton>계속</NextButton>

          <Typo type={REGULAR_7}>계정이 이미 있으신가요?</Typo>
          <Typo type={REGULAR_6} color={colors.primary} pointer>
            로그인 하기
          </Typo>
        </Body>
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
  width: 406px;
  height: 510px;
  border-radius: 3px;
  position: fixed;
  overflow: hidden;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 0 auto;
  display: flex;
  gap: 24px;
  align-items: flex-end;
  flex-direction: column;
  padding: 28px 28px 40px 28px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
  background: ${colors.gray1};
`;

const Body = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const GoogleButton = styled.button`
  width: 272px;
  height: 44px;
  margin-top: 56px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 78px 0 20px;
  border: 1px solid ${colors.gray3};
`;

const BorderWrapper = styled.div`
  width: 272px;
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmailInput = styled.input`
  ${REGULAR_7}
  width: 272px;
  height: 34px;
  padding: 0 12px;
  border-radius: 3px;
  border: 1px solid ${colors.gray3};
  background: none;
  ::placeholder {
    color: ${colors.gray3};
  }
`;

const NextButton = styled.button`
  ${MEDIUM_5};
  width: 272px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: ${colors.white};
  background: ${colors.gray7};
  margin-bottom: 32px;
`;

export default AuthModal;
