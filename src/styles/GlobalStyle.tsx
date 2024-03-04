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
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard.woff2') format('woff2');
  }

  html,
  body {
    box-sizing: border-box;
    font-family: 'Pretendard', Arial, Helvetica, sans-serif;
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
