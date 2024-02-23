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
import { useContext, useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { auth, db, signInWithGooglePopup } from "../firebase";
import { Context } from "../Context";
import { CopyIcon } from "@chakra-ui/icons";
import { child, get, ref } from "firebase/database";
import { IProfile } from "../typings";
import UsernameModal from "./UsernameModal";

const NavBar = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const { readOnly, loggedUser, updateAuthenticating } = useContext(Context);
  const loggedIn = useMemo(() => !!loggedUser, [loggedUser]);
  const dbRef = ref(db);

  useEffect(() => {
    setProfile(null);
    setProfileLoaded(false);
  }, [loggedUser]);

  useEffect(() => {
    if (!readOnly && !profileLoaded && loggedUser) {
      get(child(dbRef, `profile/${loggedUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val() as IProfile);
        }
        setProfileLoaded(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const loginGoogleUser = async () => {
    updateAuthenticating(true);

    await signInWithGooglePopup();

    updateAuthenticating(false);
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

  const handleProfileChange = (newProfile: IProfile) => {
    setProfile(newProfile);
  };

  return (
    <Flex minWidth="max-content" alignItems="center" gap={2}>
      {!readOnly && loggedUser && (
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
      {profile && <Text as="span">{`Welcome ${profile.username}`}</Text>}
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
      <UsernameModal
        isOpen={!readOnly && profileLoaded && !profile}
        onProfileChange={handleProfileChange}
      />
    </Flex>
  );
};

export default NavBar;
