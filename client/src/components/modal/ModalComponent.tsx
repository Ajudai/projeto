import { useNavigate } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface ModalComponent {
  isOpen: boolean;
  onClose: () => void;
}

function ModalComponent({ isOpen, onClose }: ModalComponent) {
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
                <h1>Cadastro realizado!</h1>
              </ModalHeader>
              <ModalBody>
                <p>Deseja fazer login agora?</p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleLogin}>Logar</Button>
                <Button onClick={onClose}>Mais tarde</Button>
              </ModalFooter>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ModalComponent;
