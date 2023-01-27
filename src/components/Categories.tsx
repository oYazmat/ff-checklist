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
  const mainlineTitles = titlesConfig.filter(
    (title) => title.type === TYPE.MAINLINE
  );

  const spinOffTitles = titlesConfig.filter(
    (title) => title.type === TYPE.SPIN_OFF
  );

  const unofficialTitles = titlesConfig.filter(
    (title) => title.type === TYPE.UNOFFICIAL
  );

  const dlcTitles = titlesConfig.filter((title) => title.type === TYPE.DLC);

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
