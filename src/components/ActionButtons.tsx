import { Button, StackItem, Stack } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import ShowButton from "./ShowButton";

interface IActionButtonsProps {
  showMissing: boolean;
  showCompleted: boolean;
  showDLC: boolean;
  showComingSoon: boolean;
  showBadges: boolean;
  onMissingDisplayClick: () => void;
  onCompletedDisplayClick: () => void;
  onDLCDisplayClick: () => void;
  onScreenshotClick: () => void;
  onComingSoonDisplayClick: () => void;
  onBadgesDisplayClick: () => void;
}

const ActionButtons = (props: IActionButtonsProps) => {
  return (
    <Stack direction="row" gap={1} justifyContent="center">
      <StackItem>
        <ShowButton
          show={props.showMissing}
          title="Missing"
          onClick={props.onMissingDisplayClick}
        />
      </StackItem>
      <StackItem>
        <ShowButton
          show={props.showCompleted}
          title="Completed"
          onClick={props.onCompletedDisplayClick}
        />
      </StackItem>
      <StackItem>
        <ShowButton
          show={props.showDLC}
          title="DLC"
          onClick={props.onDLCDisplayClick}
        />
      </StackItem>
      <StackItem>
        <ShowButton
          show={props.showComingSoon}
          title="Coming Soon"
          onClick={props.onComingSoonDisplayClick}
        />
      </StackItem>
      <StackItem>
        <ShowButton
          show={props.showBadges}
          title="Badges"
          onClick={props.onBadgesDisplayClick}
        />
      </StackItem>
      <StackItem>
        <Button leftIcon={<DownloadIcon />} onClick={props.onScreenshotClick}>
          Take a Screenshot
        </Button>
      </StackItem>
    </Stack>
  );
};

export default ActionButtons;
