import { Grid, GridItem, Text } from "@chakra-ui/react";
import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

const Home = () => {
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
        <Titles titles={getMainlineTitles()} />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Spin-Off</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles titles={getSpinOffTitles()} />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Unofficial</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles titles={getUnofficialTitles()} />
      </GridItem>
    </Grid>
  );
};

export default Home;
