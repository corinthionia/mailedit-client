import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { SerializedStyles } from '@emotion/react';

interface Props {
  color?: string;
  children: ReactNode;
  type: SerializedStyles;
}

const Typo: React.FC<Props> = (props) => {
  const { type, color = colors.black, children } = props;
  return (
    <Typography type={type} color={color}>
      {children}
    </Typography>
  );
};

const Typography = styled.p<Props>`
  ${(props) => props.type};
  color: ${(props) => props.color};
`;

export default Typo;
