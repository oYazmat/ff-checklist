import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useContext, useMemo } from "react";
import { signOut } from "firebase/auth";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { auth, signInWithGooglePopup } from "../firebase";
import { Context } from "../Context";
import { CopyIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { readOnly, loggedUser } = useContext(Context);
  const loggedIn = useMemo(() => !!loggedUser, [loggedUser]);

  const loginGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const logoutGoogleUser = async () => {
    await signOut(auth);
  };

  const handleCopyToClipboard = () => {
    if (loggedUser) {
      const personalLink = `${process.env.REACT_APP_BASE_LINK}?id=${loggedUser.uid}`;

      navigator.clipboard.writeText(personalLink);

      alert(
        `Link automatically copied to your clipboard:\n\n${personalLink}\n\nDon't forget to notify about your updates in the PSNP forum thread!`
      );
    }
  };

  return (
    <Flex minWidth="max-content" alignItems="center" gap={2}>
      {loggedUser && (
        <Stack gap={2} direction="row">
          <StackItem>
            <Text as="span" fontWeight="bold">
              Your personal ID:
            </Text>
          </StackItem>
          <StackItem>
            <Text as="span">{loggedUser.uid}</Text>
          </StackItem>
          <StackItem>
            <Button leftIcon={<CopyIcon />} onClick={handleCopyToClipboard}>
              Copy link to clipboard
            </Button>
          </StackItem>
        </Stack>
      )}
      <Spacer />
      {loggedUser && (
        <Text as="span">{`Welcome ${loggedUser.displayName}`}</Text>
      )}
      <ButtonGroup gap={2}>
        {!readOnly && (
          <Button
            leftIcon={<FaGoogle />}
            variant="ghost"
            marginLeft={2}
            onClick={loggedIn ? logoutGoogleUser : loginGoogleUser}
          >
            {`Sign ${loggedIn ? "Out" : "In With Google"}`}
          </Button>
        )}
        <ColorModeSwitcher />
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
