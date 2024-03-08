import styled from '@emotion/styled';
import React from 'react';

interface Props {
  width?: string;
  height?: string;
  direction?: 'row' | 'column';
  color: string;
}

const Border: React.FC<Props> = (props) => {
  const { width = '100%', height = '1px', direction = 'row', color } = props;

  return (
    <Wrapper
      width={width}
      height={height}
      direction={direction}
      color={color}
    />
  );
};

const Wrapper = styled.div<Props>`
  grid-area: 'border';
  display: flex;
  flex-direction: ${(props) => props.direction};
  background: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Border;
