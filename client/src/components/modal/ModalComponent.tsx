import { useNavigate } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface ModalComponent {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  modalBody: string;
  buttonSuccessLabel?: string;
  buttonCloseLabel?: string;
}

function ModalComponent({
  isOpen,
  onClose,
  modalTitle,
  modalBody,
  buttonSuccessLabel,
  buttonCloseLabel,
}: ModalComponent) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div>
              <ModalHeader>
                <h1>{modalTitle}</h1>
              </ModalHeader>
              <ModalBody>
                <p>{modalBody}</p>
              </ModalBody>
              <ModalFooter gap={5}>
                {buttonSuccessLabel && <Button onClick={handleLogin}>{buttonSuccessLabel}</Button>}
                <Button onClick={onClose}>{buttonCloseLabel}</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ModalComponent;
