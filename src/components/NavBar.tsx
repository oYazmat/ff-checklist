import { Button, Stack, StackItem, Text } from "@chakra-ui/react";
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
          <Button
            leftIcon={<FaGoogle />}
            variant="ghost"
            marginLeft="2"
            onClick={loggedIn ? logoutGoogleUser : loginGoogleUser}
          >
            {`Sign ${loggedIn ? "Out" : "In With GMail"}`}
          </Button>
        </StackItem>
      )}
      <StackItem>
        <ColorModeSwitcher />
      </StackItem>
    </Stack>
  );
};

export default NavBar;
