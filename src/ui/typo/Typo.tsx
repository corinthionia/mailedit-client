import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { SerializedStyles, css } from '@emotion/react';

interface Props {
  type: SerializedStyles;
  color?: string;
  pointer?: boolean;
  children: ReactNode;
}

const Typo: React.FC<Props> = (props) => {
  const { type, color = colors.black, pointer, children } = props;
  return (
    <Typography type={type} color={color} pointer={pointer}>
      {children}
    </Typography>
  );
};

const Typography = styled.p<Props>`
  ${(props) => css`
    ${props.type};
    color: ${props.color};
    cursor: ${props.pointer && 'pointer'};
  `}
`;

export default Typo;
