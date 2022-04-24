import React, { useEffect, useState, useContext, createContext } from 'react';
import {
  Container,
  Box,
  Flex,
  Heading,
  useDisclosure,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { getProjects } from '../components/helper';
import ModalForm from '../components/modalForm';
import ProjectCard from '../components/projectCard';

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [projects, setProjects] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    getProjects().then(projects => {
      // console.log(projects);
      setProjects({ isLoading: false, data: projects });
    });
  }, []);

  return (
    <React.Fragment>
      <Box bg={'black'} width={'100%'} height={20}>
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
      {projects.isLoading ? (
        <Container
          maxW={'container.lg'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'80vh'}
        >
          <Spinner size={'xl'} thickness={4}></Spinner>
        </Container>
      ) : (
        <Container maxW={'container.lg'} mb={'20vh'}>
          <Flex direction={'column'}>
            <Button onClick={onOpen} colorScheme={'blue'} mt={5} mb={10}>
              Create Project
            </Button>
            <Flex direction={'column-reverse'}>
              {projects.data.map((item, i) => {
                return <ProjectCard {...item} key={i} />;
              })}
            </Flex>
            <ModalForm {...{ onClose, isOpen }} />
          </Flex>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Main;
