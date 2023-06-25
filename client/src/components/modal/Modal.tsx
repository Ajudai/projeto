import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import styles from './modal.module.scss';

function Toast() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Ok!');
    setIsOpen(false);
  };

  const handleLogin = () => {
    console.log('Logado!');
  };

  return (
    <>
      <Button className={styles.modalButton} onClick={handleOpen}>
        Abrir Modal
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay className={styles.modalOverlay} />
        <ModalContent className={styles.modalContent}>
          <div className={styles.modalContainer}>
            <ModalHeader>
              <h1 className={styles.modalHeaderH1}>Usuário cadastrado com sucesso</h1>
            </ModalHeader>
            <ModalBody className={styles.modalBody}>
              <p>Deseja fazer login agora?</p>
            </ModalBody>
            <ModalFooter className={styles.modalFooter}>
              <Button className={styles.modalButtonClick} onClick={handleLogin}>
                Logar
              </Button>
              <Button className={styles.modalButtonClick} onClick={handleClose}>
                Mais tarde
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Toast;
