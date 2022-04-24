import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Progress,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { fundProject, getRefund } from '../components/helper';

const Funding = ({ contract }) => {
  const [fundInp, setFundInp] = useState(0);

  const onFormSubmit = () => {
    fundProject(contract, fundInp);
  };

  const handleAmtChange = e => {
    setFundInp(e.target.value);
  };
  return (
    <React.Fragment>
      <form onSubmit={onFormSubmit}>
        <Flex gap={3} width={'100%'}>
          <FormControl isRequired>
            <Input
              type="number"
              min={0}
              placeholder={'Enter amount'}
              _placeholder={{ color: 'gray.600' }}
              borderColor={'gray.400'}
              borderWidth={2}
              width={'100px'}
              value={fundInp}
              onChange={handleAmtChange}
            />
          </FormControl>
          <Button colorScheme={'green'} width={'100%'} type={'submit'}>
            Fund
          </Button>
        </Flex>
      </form>
    </React.Fragment>
  );
};

const Expired = ({ contract }) => {
  return (
    <React.Fragment>
      <Flex gap={3} width={'100%'}>
        <Text color={'red'} fontWeight={700} letterSpacing={1.1} fontSize={18}>
          EXPIRED
        </Text>
        <Button
          colorScheme={'green'}
          width={'100%'}
          onClick={getRefund(contract)}
        >
          Refund
        </Button>
      </Flex>
    </React.Fragment>
  );
};

const ProjectCard = ({
  projectTitle,
  projectDesc,
  currentState,
  contract,
  goalAmount,
  currentAmount,
  deadline,
}) => {
  const [contractInp, setContractInp] = useState(contract);

  const valueInp = (currentAmount / goalAmount) * 100;
  const dateInp = new Date(deadline * 1000).toString();

  return (
    <React.Fragment>
      <Box borderRadius={5} boxShadow={'0 0 10px 2px lightgray'} p={3} mt={8}>
        <Flex direction={'column'} alignItems={'flex-start'}>
          <Heading>{projectTitle}</Heading>
          <Text mt={3} color={'gray.600'}>
            {projectDesc}
          </Text>
          <Text mt={3} color={'gray.600'}>
            DEADLINE: {dateInp}
          </Text>
          <Text mt={3} color={'gray.600'}>
            GOAL: {goalAmount / 10 ** 18} ETH
          </Text>
          <Text mt={3} color={'gray.600'}>
            CURRENT: {currentAmount / 10 ** 18} ETH
          </Text>
          <Flex mt={5} width={'100%'} alignItems={'center'} gap={4}>
            <Progress value={valueInp} flexGrow={14} height={5} />
            <Box flexGrow={1}>
              {currentState === '0' ? (
                <Funding contract={contract} />
              ) : currentState === '1' ? (
                <Expired contract={contract} />
              ) : (
                <Text
                  color={'green'}
                  fontWeight={700}
                  letterSpacing={1.1}
                  fontSize={18}
                >
                  COMPLETED
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default ProjectCard;
