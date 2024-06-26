import { useState, useEffect, useRef, useContext } from "react";
import {
  StackItem,
  Stack,
  useColorMode,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ref, child, get, update, DataSnapshot } from "firebase/database";

import Categories from "./Categories";
import { exportAsImage } from "../utils/exportAsImage";
import ActionButtons from "./ActionButtons";
import Badges from "./Badges";
import { Context } from "../Context";
import { db } from "../firebase";
import Loader from "./Loader";
import { isFeatureEnable } from "../utils/feature";

const Home = () => {
  const [saveChanges, setSaveChanges] = useState(false);
  const [showMissing, setShowMissing] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDLC, setShowDLC] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showBadges, setShowBadges] = useState(true);
  const [showSpecialBadges, setShowSpecialBadges] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const exportRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const { readOnly, profileIdToLoad, loaded, updateLoaded, loggedUser } =
    useContext(Context);
  const dbRef = ref(db);

  useEffect(() => {
    updateLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  useEffect(() => {
    if (!loaded) {
      if (readOnly) {
        get(child(dbRef, `completed/${profileIdToLoad}`)).then(
          handleDbDataLoaded
        );
      } else {
        if (loggedUser) {
          get(child(dbRef, `completed/${loggedUser.uid}`)).then(
            handleDbDataLoaded
          );
        } else {
          const localStoredData = localStorage.getItem("completed");

          if (localStoredData !== null) {
            setCompleted(JSON.parse(localStoredData));
          }

          updateLoaded(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    if (saveChanges) {
      if (loggedUser) {
        update(dbRef, {
          [`completed/${loggedUser.uid}`]: completed,
        });
      } else {
        localStorage.setItem("completed", JSON.stringify(completed));
      }

      setSaveChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveChanges]);

  const handleDbDataLoaded = (snapshot: DataSnapshot) => {
    const dbStoredData = snapshot.exists() ? snapshot.val() : [];

    setCompleted(dbStoredData);

    updateLoaded(true);
  };

  const handleCompletedDisplayClick = () => {
    setShowCompleted((prev) => !prev);
  };

  const handleMissingDisplayClick = () => {
    setShowMissing((prev) => !prev);
  };

  const handleDLCDisplayClick = () => {
    setShowDLC((prev) => !prev);
  };

  const handleComingSoonDisplayClick = () => {
    setShowComingSoon((prev) => !prev);
  };

  const handleBadgesDisplayClick = () => {
    setShowBadges((prev) => !prev);
  };

  const handleSpecialBadgesDisplayClick = () => {
    setShowSpecialBadges((prev) => !prev);
  };

  const handleCheckboxChange = (id: string) => {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((i) => i !== id));
    } else {
      setCompleted((prev) => [...prev, id]);
    }
    setSaveChanges(true);
  };

  const handleScreenshotClick = () => {
    exportAsImage(exportRef.current, "ff-checklist", colorMode);
  };

  if (!loaded) {
    return <Loader />;
  }

  return (
    <Stack gap={3}>
      <StackItem>
        <Heading>Final Fantasy Trophy Completion Checklist</Heading>
      </StackItem>
      <StackItem>
        <ActionButtons
          showMissing={showMissing}
          showCompleted={showCompleted}
          showDLC={showDLC}
          showComingSoon={showComingSoon}
          showBadges={showBadges}
          showSpecialBadges={showSpecialBadges}
          onMissingDisplayClick={handleMissingDisplayClick}
          onCompletedDisplayClick={handleCompletedDisplayClick}
          onDLCDisplayClick={handleDLCDisplayClick}
          onScreenshotClick={handleScreenshotClick}
          onComingSoonDisplayClick={handleComingSoonDisplayClick}
          onBadgesDisplayClick={handleBadgesDisplayClick}
          onSpecialBadgesDisplayClick={handleSpecialBadgesDisplayClick}
        />
      </StackItem>
      <StackItem>
        <Stack gap={3} ref={exportRef}>
          {isFeatureEnable('Badges') && showBadges && (
            <StackItem>
              <Badges completed={completed} />
            </StackItem>
          )}
          <StackItem>
            <Categories
              completed={completed}
              onCheckboxChange={handleCheckboxChange}
              showMissing={showMissing}
              showCompleted={showCompleted}
              showDLC={showDLC}
              showComingSoon={showComingSoon}
              showSpecialBadges={showSpecialBadges}
            />
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <Text>
          Made by{" "}
          <Link
            href="https://psnprofiles.com/oYazmat"
            isExternal
            color="teal.500"
          >
            Yazmat <ExternalLinkIcon mx="2px" />
          </Link>
          for the{" "}
          <Link
            href="https://forum.psnprofiles.com/topic/127226-project-platinum-final-fantasy/"
            isExternal
            color="teal.500"
          >
            Project Platinum: Final Fantasy
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </StackItem>
    </Stack>
  );
};

export default Home;
