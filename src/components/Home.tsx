import { useState, useEffect, useRef } from "react";
import { Button, StackItem, Stack, useColorMode } from "@chakra-ui/react";
import Categories from "./Categories";
import { exportAsImage } from "../utils/exportAsImage";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [showMissing, setShowMissing] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDLC, setShowDLC] = useState(true);
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
    <Stack gap={1}>
      <StackItem>
        <Stack direction="row" gap={1} justifyContent="center">
          <StackItem>
            <Button onClick={handleMissingDisplayClick}>
              {showMissing ? "Hide Missing" : "Show Missing"}
            </Button>
          </StackItem>
          <StackItem>
            <Button onClick={handleCompletedDisplayClick}>
              {showCompleted ? "Hide Completed" : "Show Completed"}
            </Button>
          </StackItem>
          <StackItem>
            <Button onClick={handleDLCDisplayClick}>
              {showDLC ? "Hide DLC" : "Show DLC"}
            </Button>
          </StackItem>
          <StackItem>
            <Button onClick={handleScreenshotClick}>Take a Screenshot</Button>
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <div ref={exportRef}>
          <Categories
            completed={completed}
            onCheckboxChange={handleCheckboxChange}
            showMissing={showMissing}
            showCompleted={showCompleted}
            showDLC={showDLC}
          />
        </div>
      </StackItem>
    </Stack>
  );
};

export default Home;
