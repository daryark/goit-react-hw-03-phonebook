import styled from 'styled-components';

export const ContactInfo = styled.span`
  font-size: ${span => span.theme.fontSizes.s}px;
  margin-right: ${span => span.theme.spaces[3]}px;
`;

export const ContactItem = styled.li`
  border-bottom: 1px solid ${li => li.theme.colors.secondary};
  padding: 0 ${li => li.theme.spaces[5]}px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteBtn = styled.button`
  padding: ${button => button.theme.spaces[3]}px;
  color: ${button => button.theme.colors.secondary};
  border: none;
  background-color: transparent;

  svg {
    transition: color 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover svg {
    color: ${button => button.theme.colors.delete};
  }
`;
