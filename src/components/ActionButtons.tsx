import { Button, StackItem, Stack } from "@chakra-ui/react";
import { DownloadIcon, CopyIcon } from "@chakra-ui/icons";
import ShowButton from "./ShowButton";
import { useContext } from "react";
import { Context } from "../Context";

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
  const { loggedUser } = useContext(Context);

  const handleCopyToClipboard = () => {
    if (loggedUser) {
      const link = `${process.env.REACT_APP_BASE_LINK}?id=${loggedUser.uid}`;

      navigator.clipboard.writeText(link);

      alert(
        `Link automatically copied to your clipboard:\n\n${link}\n\nDon't forget to post it in the PSNP forum thread!`
      );
    }
  };

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
      {loggedUser && (
        <StackItem>
          <Button leftIcon={<CopyIcon />} onClick={handleCopyToClipboard}>
            Copy link to clipboard
          </Button>
        </StackItem>
      )}
    </Stack>
  );
};

export default ActionButtons;
