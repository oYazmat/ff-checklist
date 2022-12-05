import { useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

const Home = () => {
  const [completed, setCompleted] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((i) => i === id));
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
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Mainline</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getMainlineTitles()}
          completed={completed}
          onCheckboxChange={handleCheckboxChange}
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
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
