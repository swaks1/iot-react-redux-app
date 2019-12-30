import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalWrapper = props => {
  const {
    isOpen,
    modalTitle,
    modalBody,
    confirmText,
    confirmAction,
    denyText,
    denyAction,
    toggle
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={confirmAction}>
            {confirmText}
          </Button>{" "}
          <Button color="warning" onClick={denyAction}>
            {denyText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
