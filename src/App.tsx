import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Context } from "./Context";
import { auth } from "./firebase";

export const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  auth.onAuthStateChanged((user) => {
    if (loggedUser?.uid !== user?.uid) {
      setLoggedUser(user);
    }
    setAuthenticating(false);
  });

  const updateLoaded = (newLoadedValue: boolean) => {
    setLoaded(newLoadedValue);
  };

  return (
    <ChakraProvider theme={theme}>
      <Context.Provider
        value={{ authenticating, loaded, updateLoaded, loggedUser }}
      >
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <NavBar />
            <Home />
          </Grid>
        </Box>
      </Context.Provider>
    </ChakraProvider>
  );
};
