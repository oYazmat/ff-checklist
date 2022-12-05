import { useState, useEffect } from "react";
import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

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

  const getMainlineTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.MAINLINE);
  };

  const getSpinOffTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.SPIN_OFF);
  };

  const getUnofficialTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.UNOFFICIAL);
  };

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={1}>
      <GridItem colSpan={10} textAlign="center">
        <Button marginRight={1} onClick={handleMissingDisplayClick}>
          {showMissing ? "Hide Missing" : "Show Missing"}
        </Button>
        <Button onClick={handleCompletedDisplayClick}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Mainline</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getMainlineTitles()}
          completed={completed}
          onCheckboxChange={handleCheckboxChange}
          showMissing={showMissing}
          showCompleted={showCompleted}
        />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Spin-Off</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getSpinOffTitles()}
          completed={completed}
          onCheckboxChange={handleCheckboxChange}
          showMissing={showMissing}
          showCompleted={showCompleted}
        />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Unofficial</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getUnofficialTitles()}
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
