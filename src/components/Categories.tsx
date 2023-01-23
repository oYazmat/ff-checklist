import { useMemo } from "react";
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
  const mainlineTitles = useMemo(() => {
    return titlesConfig.filter((title) => title.type === TYPE.MAINLINE);
  }, []);

  const spinOffTitles = useMemo(() => {
    return titlesConfig.filter((title) => title.type === TYPE.SPIN_OFF);
  }, []);

  const unofficialTitles = useMemo(() => {
    return titlesConfig.filter((title) => title.type === TYPE.UNOFFICIAL);
  }, []);

  const dlcTitles = useMemo(() => {
    return titlesConfig.filter((title) => title.type === TYPE.DLC);
  }, []);

  return (
    <>
      <Titles
        header="Mainline"
        titles={mainlineTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
      />

      <Titles
        header="Spin-Off"
        titles={spinOffTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
      />

      <Titles
        header="Unofficial"
        titles={unofficialTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
      />

      {props.showDLC && (
        <Titles
          header="DLC"
          titles={dlcTitles}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
        />
      )}
    </>
  );
};

export default Categories;
