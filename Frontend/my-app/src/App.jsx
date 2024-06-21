import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Center,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast
} from '@chakra-ui/react';

function App() {
  const [playerName, setPlayerName] = useState('User');
  const [userScores, setUserScores] = useState(0);
  const [compScores, setCompScores] = useState(0);
  const [userChoice, setUserChoice] = useState('');
  const [randomChoice, setRandomChoice] = useState('');
  const [message, setMessage] = useState("Let's play!");
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchTopPlayers();
  }, []);

  const fetchTopPlayers = async () => {
    try {
      const response = await axios.get('https://multiplayer-o875.onrender.com/players');
      setTopPlayers(response.data);
    } catch (error) {
      console.error('Error fetching top players:', error);
    }
  };

  const saveName = () => {
    const name = prompt('Enter your name:');
    if (name) {
      setPlayerName(name);
    }
  };

  const setUserChoiceHandler = (choice) => {
    setUserChoice(choice);
    setCompChoice(choice);
  };

  const setCompChoice = (uChoice) => {
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];
    const randomIndex = Math.floor(Math.random() * 3);
    const compChoice = choices[randomIndex];
    setRandomChoice(compChoice);
    compareResults(compChoice, uChoice);
  };

  const compareResults = (compChoice, userChoice) => {
    if (compChoice === userChoice) {
      setMessage("It's a tie!");
    } else if (
      (compChoice === 'ROCK' && userChoice === 'SCISSORS') ||
      (compChoice === 'PAPER' && userChoice === 'ROCK') ||
      (compChoice === 'SCISSORS' && userChoice === 'PAPER')
    ) {
      setMessage(`${playerName} wins!`);
      setUserScores(prevScores => prevScores + 1);
    } else {
      setMessage('Computer wins! Game over!');
      setCompScores(prevScores => prevScores + 1);
      gameOver();
    }
  };

  const gameOver = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://multiplayer-o875.onrender.com/players', {
        name: playerName,
        scores: userScores
      });
      console.log('Player added:', response.data);
      fetchTopPlayers();
      setIsLoading(false);
      toast({
        title: 'Game Over',
        description: 'Scores updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding player:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to update scores.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="#FFC0CB" minHeight="100vh" p={4}>
      <Center>
        <Box maxW="xl" p={8} borderRadius="xl" boxShadow="lg">
          <VStack spacing={4} align="center">
            <Heading size="xl">Rock Paper Scissors Game</Heading>
            <Text>Welcome, {playerName}!</Text>
            <Text>{message}</Text>
            <HStack spacing={4} mb={4}>
              <Button size="lg" colorScheme="blue" onClick={() => setUserChoiceHandler('ROCK')}>Rock</Button>
              <Button size="lg" colorScheme="green" onClick={() => setUserChoiceHandler('PAPER')}>Paper</Button>
              <Button size="lg" colorScheme="red" onClick={() => setUserChoiceHandler('SCISSORS')}>Scissors</Button>
            </HStack>
            <VStack spacing={4} align="center" mb={4}>
              <Text fontSize="lg">Your choice: {userChoice}</Text>
              <Text fontSize="lg">Computer's choice: {randomChoice}</Text>
            </VStack>
            <HStack spacing={8} mb={4}>
              <VStack>
                <Text fontSize="lg">Your scores:</Text>
                <Text fontSize="2xl">{userScores}</Text>
              </VStack>
              <VStack>
                <Text fontSize="lg">Computer's scores:</Text>
                <Text fontSize="2xl">{compScores}</Text>
              </VStack>
            </HStack>
            <Button size="md" onClick={saveName}>Change Name</Button>
          </VStack>
          <Divider my={8} />
          <VStack align="start" w="100%">
            <Heading size="lg">Top Players</Heading>
            <Table variant="striped" colorScheme="pink" size="md" borderWidth="1px" borderRadius="md">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Scores</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topPlayers.map((player, index) => (
                  <Tr key={index}>
                    <Td>{player.name}</Td>
                    <Td isNumeric>{player.scores}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Your Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <FormHelperText>Enter your name to start the game.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={saveName}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
