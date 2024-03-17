import { Global, css } from '@emotion/react';

const reset = css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
    border: none;
  }

  input:focus,
  select:focus,
  option:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }
`;

const defaultStyle = css`
  ${reset};

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Light.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-ExtraLight.woff2') format('woff2');
  }

  * {
    font-family: 'Pretendard', Arial, Helvetica, sans-serif;
  }

  html,
  body {
    box-sizing: border-box;
  }

  a {
    outline: none;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: none;
    cursor: pointer;
    background: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
