import React from 'react';
import { ModalBody, ModalFooter, ModalHeader, Modal as RCTModal } from 'reactstrap';

const Modal = ({ children, isOpen, closeModal, footer, className, title, onOpened }) => {
  return (
    <RCTModal onOpened={onOpened} isOpen={isOpen} toggle={closeModal} className={className}>
      {title && <ModalHeader toggle={closeModal}>{title}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </RCTModal>
  );
};

export default Modal;
