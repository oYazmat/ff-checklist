import { titlesConfig } from "../config";
import { TYPE } from "../typings.d";
import Titles from "./Titles";

interface ICategoriesProps {
  completed: string[];
  showMissing: boolean;
  showCompleted: boolean;
  showDLC: boolean;
  showComingSoon: boolean;
  showSpecialBadges: boolean;
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

  const xivDLCTitles = titlesConfig.filter(
    (title) => title.type === TYPE.XIV_PS5_DLC
  );

  const specialBadges = titlesConfig.filter(
    (title) => title.type === TYPE.SPECIAL_BADGE
  );

  return (
    <>
      <Titles
        header="Mainline"
        titles={mainlineTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
        showComingSoon={props.showComingSoon}
      />

      <Titles
        header="Spin-Off"
        titles={spinOffTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
        showComingSoon={props.showComingSoon}
      />

      <Titles
        header="Unofficial"
        titles={unofficialTitles}
        completed={props.completed}
        onCheckboxChange={props.onCheckboxChange}
        showMissing={props.showMissing}
        showCompleted={props.showCompleted}
        showComingSoon={props.showComingSoon}
      />

      {props.showDLC && (
        <>
          <Titles
            header="DLC"
            titles={dlcTitles}
            completed={props.completed}
            onCheckboxChange={props.onCheckboxChange}
            showMissing={props.showMissing}
            showCompleted={props.showCompleted}
            showComingSoon={props.showComingSoon}
          />

          <Titles
            header="FF XIV DLC"
            titles={xivDLCTitles}
            completed={props.completed}
            onCheckboxChange={props.onCheckboxChange}
            showMissing={props.showMissing}
            showCompleted={props.showCompleted}
            showComingSoon={props.showComingSoon}
          />
        </>
      )}

      {props.showSpecialBadges && (
        <Titles
          header="Special Badges"
          titles={specialBadges}
          completed={props.completed}
          onCheckboxChange={props.onCheckboxChange}
          showMissing={props.showMissing}
          showCompleted={props.showCompleted}
          showComingSoon={props.showComingSoon}
        />
      )}
    </>
  );
};

export default Categories;
