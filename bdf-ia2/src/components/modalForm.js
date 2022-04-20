import React, { useState } from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { createProject } from './helper';

const ModalForm = ({ onClose, isOpen }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState('');
  const [days, setDays] = useState(1);

  const createProjectUtil = () => {
    let res;
    createProject(name, desc, days, amount).then(response => {
      res = response;
    });
    return res;
  };

  const onFormSubmit = e => {
    createProjectUtil();
    onClose();
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
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="project-name">Project Name</FormLabel>
                <Input
                  id="project-name"
                  name="project-name"
                  placeholder="Project name"
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="project-desc">
                  Project Description
                </FormLabel>
                <Input
                  id="project-desc"
                  name="project-desc"
                  placeholder="Project description"
                  onChange={e => {
                    setDesc(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    id="amount"
                    name="amount"
                    onChange={e => {
                      setAmount(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="days">Time</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField
                    id="days"
                    name="days"
                    placeholder="Time (in days)"
                    onChange={e => {
                      setDays(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} mr={3} colorScheme={'green'}>
                Submit
              </Button>
              <Button onClick={onClose} colorScheme={'red'}>
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
