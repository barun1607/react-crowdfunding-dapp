import React, { useEffect, useState, useContext, createContext } from 'react';
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
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
    const projectsList = getProjects();
    console.log(projectsList);
    setProjects(projectsList);
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
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container maxW={'container.lg'} height={'100vh'}>
          <Flex direction={'column'}>
            <Button onClick={onOpen} colorScheme={'blue'} mt={5} mb={10}>
              Create Project
            </Button>
            {projects.length === 0 ? (
              <Heading>Projects created...</Heading>
            ) : (
              <Heading>No. of Projects running : {projects.length}</Heading>
            )}
            <ModalForm {...{ onClose, isOpen }} />
          </Flex>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Main;
