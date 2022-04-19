import React from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  FormControl,
} from '@chakra-ui/react';

const ModalForm = ({ onClose, isOpen }) => {
  const onFormSubmit = e => {
    console.log('submitted');
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onFormSubmit}>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button type={'submit'} mr={3} bg={'green.400'} color={'white'}>
                Submit
              </Button>
              <Button onClick={onClose} bg={'red.400'} color={'white'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
