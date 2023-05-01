import React, { useState } from "react";
import styled from "styled-components";

import { Headline } from "./elements";
import { IconButton } from "./icon";

const ModalContainer = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;

  max-height: 100%;

  overflow-y: auto;

  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.backgroundColor};

  padding: 1rem;

  @media (max-width: 766px) {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.p`
  padding: 0;
  margin: 0;

  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.accentColor};
  padding-top: 0.75rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const TitleContainer = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export interface IModalProps {
  element: string;
  icon?: string;
  text?: string;
  condition?: boolean;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

/**
 * Renders a modal with button to hide and un-hide
 * @param {IModalProps} props needed props for the modal
 * @returns {React.ReactNode} the modal component
 */
const Modal = ({
  element,
  icon,
  text,
  condition,
  title,
  onClose,
  children,
}: IModalProps) => {
  const [modalHidden, setModalHidden] = useState<boolean>(condition ?? true);

  const closeModal = () => {
    if (onClose) onClose();
    setModalHidden(!modalHidden);
  };

  return (
    <>
      <ModalContainer hidden={modalHidden}>
        <TitleContainer>
          <Headline>{title}</Headline>
          <IconButton
            icon="close"
            testid="close-button"
            onClick={() => closeModal()}
          />
        </TitleContainer>
        {children}
      </ModalContainer>

      {element === "icon" && (
        <IconButton
          icon={icon ?? ""}
          testid="toggle-button"
          onClick={() => closeModal()}
        />
      )}

      {element === "text" && (
        <Text data-testid="toggle-button" onClick={() => closeModal()}>
          {text}
        </Text>
      )}
    </>
  );
};

export default Modal;
