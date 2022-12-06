import { Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface IShowButtonProps {
  show: boolean;
  title: string;
  onClick: () => void;
}

const ShowButton = (props: IShowButtonProps) => {
  return (
    <Button
      leftIcon={props.show ? <ViewOffIcon /> : <ViewIcon />}
      onClick={props.onClick}
    >
      {props.show ? `Hide ${props.title}` : `Show ${props.title}`}
    </Button>
  );
};

export default ShowButton;
