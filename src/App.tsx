import { ChakraProvider, Box, Grid, theme, GridItem } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useState } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import { Context } from "./Context";
import { auth } from "./firebase";

export const App = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const profileIdToLoad = queryParameters.get("id");
  const readOnly = !!profileIdToLoad;

  const [appReady, setAppReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  auth.authStateReady().then(() => {
    if (!appReady) setAppReady(true);
  });

  auth.onAuthStateChanged((user) => {
    if (loggedUser?.uid !== user?.uid) {
      setLoggedUser(user);
    }
  });

  const updateLoaded = (newLoadedValue: boolean) => {
    setLoaded(newLoadedValue);
  };

  const updateAuthenticating = (newAuthenticatingValue: boolean) => {
    setAuthenticating(newAuthenticatingValue);
  };

  return (
    <ChakraProvider theme={theme}>
      <Context.Provider
        value={{
          profileIdToLoad,
          readOnly,
          authenticating,
          updateAuthenticating,
          loaded,
          updateLoaded,
          loggedUser,
        }}
      >
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3} gap={12}>
            {(!appReady || authenticating) && (
              <GridItem>
                <Loader />
              </GridItem>
            )}
            {appReady && !authenticating && (
              <>
                <GridItem>
                  <NavBar />
                </GridItem>
                <GridItem>
                  <Home />
                </GridItem>
              </>
            )}
          </Grid>
        </Box>
      </Context.Provider>
    </ChakraProvider>
  );
};
