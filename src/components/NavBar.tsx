import { IconButton, Stack, StackItem, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useContext, useMemo } from "react";
import { signOut } from "firebase/auth";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { auth, signInWithGooglePopup } from "../firebase";
import { Context } from "../Context";

const NavBar = () => {
  const { readOnly, loggedUser } = useContext(Context);
  const loggedIn = useMemo(() => !!loggedUser, [loggedUser]);

  const loginGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const logoutGoogleUser = async () => {
    await signOut(auth);
  };

  return (
    <Stack direction="row" gap={1} justifyContent="end">
      {!readOnly && (
        <StackItem>
          {loggedUser && (
            <Text as="span">{`Welcome ${loggedUser.displayName}`}</Text>
          )}
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={loggedIn ? logoutGoogleUser : loginGoogleUser}
            icon={<FaGoogle />}
            aria-label={`Sign ${loggedIn ? "Out" : "In With Google"}`}
            title={`Sign ${loggedIn ? "Out" : "In With Google"}`}
          />
        </StackItem>
      )}
      <StackItem>
        <ColorModeSwitcher />
      </StackItem>
    </Stack>
  );
};

export default NavBar;
