import { Grid, GridItem, Text } from "@chakra-ui/react";
import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

interface ICategoriesProps {
  completed: string[];
  showMissing: boolean;
  showCompleted: boolean;
  onCheckboxChange: (id: string) => void;
}

const Categories = (props: ICategoriesProps) => {
  const getMainlineTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.MAINLINE);
  };

  const getSpinOffTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.SPIN_OFF);
  };

  const getUnofficialTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.UNOFFICIAL);
  };

  const getDLCTitles = () => {
    return titlesConfig.filter((title) => title.type === TYPE.DLC);
  };

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={1}>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Mainline</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getMainlineTitles()}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
        />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Spin-Off</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getSpinOffTitles()}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
        />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>Unofficial</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getUnofficialTitles()}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
        />
      </GridItem>
      <GridItem colSpan={1} bg="blue.500" alignSelf="center">
        <Text>DLC</Text>
      </GridItem>
      <GridItem colSpan={9}>
        <Titles
          titles={getDLCTitles()}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
        />
      </GridItem>
    </Grid>
  );
};

export default Categories;
