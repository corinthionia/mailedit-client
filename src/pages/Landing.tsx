import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from '@/components/landing/Header';
import Landing1 from '@/components/landing/Landing1';
import Landing2 from '@/components/landing/Landing2';
import Landing3 from '@/components/landing/Landing3';
import Landing4 from '@/components/landing/Landing4';
import Landing5 from '@/components/landing/Landing5';
import Landing6 from '@/components/landing/Landing6';
import Footer from '@/components/landing/Footer';
import MobileModal from '@/components/landing/MobileModal';

interface Props {}

const Landing: React.FC<Props> = () => {
  const [isMobileModalOpened, setIsMobileModalOpened] = useState<boolean>(
    window.innerWidth < 768
  );

  if (isMobileModalOpened) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <MobileModal
        isMobileModalOpened={isMobileModalOpened}
        setIsMobileModalOpened={setIsMobileModalOpened}
      />
      <Wrapper>
        <Header />
        <Landing1 />
        <Landing2 />
        <Landing3 />
        <Landing4 />
        <Landing5 />
        <Landing6 />
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Landing;
