import { useState, useEffect, useRef } from "react";
import {
  StackItem,
  Stack,
  useColorMode,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import Categories from "./Categories";
import { exportAsImage } from "../utils/exportAsImage";
import ActionButtons from "./ActionButtons";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Badges from "./Badges";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [showMissing, setShowMissing] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDLC, setShowDLC] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showBadges, setShowBadges] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);
  const exportRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const stored = localStorage.getItem("completed");
    if (stored !== null) {
      setCompleted(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("completed", JSON.stringify(completed));
    }
  }, [loaded, completed]);

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

  const handleCheckboxChange = (id: string) => {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((i) => i !== id));
    } else {
      setCompleted((prev) => [...prev, id]);
    }
  };

  const handleScreenshotClick = () => {
    exportAsImage(exportRef.current, "ff-checklist", colorMode);
  };

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
          onMissingDisplayClick={handleMissingDisplayClick}
          onCompletedDisplayClick={handleCompletedDisplayClick}
          onDLCDisplayClick={handleDLCDisplayClick}
          onScreenshotClick={handleScreenshotClick}
          onComingSoonDisplayClick={handleComingSoonDisplayClick}
          onBadgesDisplayClick={handleBadgesDisplayClick}
        />
      </StackItem>
      <StackItem>
        <Stack gap={3} ref={exportRef}>
          {showBadges && (
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
