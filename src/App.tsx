import { Box, Button, ButtonGroup, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaGoogle, FaSignOutAlt, FaCopy } from 'react-icons/fa';
import { useFirebaseService } from "./hooks/useFirebaseService";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

function App() {

  const { signInWithGoogle, getCurrentUser, logout } = useFirebaseService()
  const [user, setUser] = useState<User | null>()
  const [emailId, setEmailId] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')

  const loginWithGoogle = () => {
    signInWithGoogle().then((userCred) => {
      setUser(userCred.user)
    })
  }

  const logoutUser = () => {
    logout().then(() => {

    }).catch((err) => {
      console.log(err)
    })
  }

  const renderAuthButton = () => {
    if (emailId === "") {
      return <Button size={'sm'}><Icon as={FaGoogle} onClick={() => loginWithGoogle()} /></Button>
    }
    return (
      <ButtonGroup size={'sm'}>
        <Button><Icon as={FaCopy} onClick={() => navigator.clipboard.writeText(tokenId)} /></Button>
        <Button><Icon as={FaSignOutAlt} onClick={() => logoutUser()} /></Button>
      </ButtonGroup>
    )
  }

  const renderUserInfo = () => {
    if (emailId === '') return <></>
    return <Text fontSize={'sm'}>welcome, {emailId}</Text>
  }

  useEffect(() => {
    const unsubscribe = getCurrentUser((user) => {
      setEmailId(user?.email ?? "");
      user?.getIdToken().then(token => {
        setTokenId(token)
      }).catch(err => {
        console.log(err)
      })
    });
    return () => unsubscribe()
  }, [user, getCurrentUser])

  return (
    <Container maxW={'4xl'}>
      <Flex mt={'1rem'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                <Heading size={'lg'}>Expense Tracker</Heading>
                {renderUserInfo()}
            </Box>
            {renderAuthButton()}
        </Flex>
    </Container>
  );
}

export default App;
