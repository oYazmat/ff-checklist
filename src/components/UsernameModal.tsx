import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { ref, update } from "firebase/database";
import { isEmpty } from "lodash";
import { useState, useContext, ChangeEvent } from "react";
import { Context } from "../Context";
import { db } from "../firebase";
import { IProfile } from "../typings";

interface IUsernameModalProps {
  isOpen: boolean;
  onProfileChange: Function;
}

const UsernameModal = (props: IUsernameModalProps) => {
  const [username, setUsername] = useState("");
  const { loggedUser } = useContext(Context);
  const dbRef = ref(db);

  const handleSave = () => {
    if (loggedUser && !isEmpty(username)) {
      const newProfile: IProfile = { username: username };

      update(dbRef, {
        [`profile/${loggedUser.uid}`]: newProfile,
      });

      props.onProfileChange(newProfile);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={handleSave}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your PSNP profile</ModalHeader>
        <ModalBody>
          <Stack gap={2}>
            <StackItem>
              <Text>
                In order to link your checklist to a PSNP profile, please
                provide your username.
              </Text>
            </StackItem>
            <StackItem>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Username" onChange={handleChange} />
              </FormControl>
            </StackItem>
            <StackItem>
              <Text as="i" fontSize="xs">
                (For the time being, the username cannot be changed once saved,
                choose carefully)
              </Text>
            </StackItem>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isDisabled={isEmpty(username)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UsernameModal;
