import { SimpleGrid, GridItem, Text } from "@chakra-ui/react";
import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

interface ICategoriesProps {
  completed: string[];
  showMissing: boolean;
  showCompleted: boolean;
  showDLC: boolean;
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
    <SimpleGrid columns={10} gap={1}>
      <GridItem colSpan={1} alignSelf="center">
        <Text fontWeight="extrabold">Mainline</Text>
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
      <GridItem colSpan={1} alignSelf="center">
        <Text fontWeight="extrabold">Spin-Off</Text>
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
      <GridItem colSpan={1} alignSelf="center">
        <Text fontWeight="extrabold">Unofficial</Text>
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
      {props.showDLC && (
        <>
          <GridItem colSpan={1} alignSelf="center">
            <Text fontWeight="extrabold">DLC</Text>
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
        </>
      )}
    </SimpleGrid>
  );
};

export default Categories;
