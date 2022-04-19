import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Flex,
  Heading,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { getProjects } from '../components/helper';
import ModalForm from '../components/modalForm';

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectList = await getProjects();
      setProjects(projectList);
    };

    // loadProjects();
  }, []);

  return (
    <React.Fragment>
      <Box bg={'black'} width={'100vw'} height={20}>
        <Flex
          direction={'row'}
          height={'90%'}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Heading color={'white'}>Crowdfunding DApp</Heading>
        </Flex>
      </Box>
      <Container maxW={'container.lg'} height={'100vh'}>
        <Flex>
          <Button onClick={onOpen}>Open Modal</Button>
          <ModalForm {...{ onClose, isOpen }} />
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default Main;
