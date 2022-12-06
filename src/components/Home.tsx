import { useState, useEffect } from "react";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import Categories from "./Categories";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [showMissing, setShowMissing] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);

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

  const handleCheckboxChange = (id: string) => {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((i) => i !== id));
    } else {
      setCompleted((prev) => [...prev, id]);
    }
  };

  return (
    <Grid gap={1}>
      <GridItem textAlign="center">
        <Button marginRight={1} onClick={handleMissingDisplayClick}>
          {showMissing ? "Hide Missing" : "Show Missing"}
        </Button>
        <Button onClick={handleCompletedDisplayClick}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
      </GridItem>
      <GridItem>
        <Categories
          completed={completed}
          onCheckboxChange={handleCheckboxChange}
          showMissing={showMissing}
          showCompleted={showCompleted}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
