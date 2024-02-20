import { useContext, useMemo } from "react";
import {
  Checkbox,
  SimpleGrid,
  GridItem,
  Image,
  Stack,
  StackItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ITitle } from "../typings.d";
import { Context } from "../Context";

interface ITitlesProps {
  header: string;
  titles: ITitle[];
  completed: string[];
  showMissing: boolean;
  showCompleted: boolean;
  showComingSoon: boolean;
  onCheckboxChange: (id: string) => void;
}

const Titles = (props: ITitlesProps) => {
  const { readOnly } = useContext(Context);

  const handleCheckboxChange = (id: string) => () => {
    props.onCheckboxChange(id);
  };

  const titlesToDisplay = useMemo(() => {
    return props.titles.filter((title) => {
      if (
        props.showMissing &&
        !props.completed.includes(title.id) &&
        !title.unreleased
      )
        return true;

      if (props.showCompleted && props.completed.includes(title.id))
        return true;

      if (props.showComingSoon && title.unreleased) return true;

      return false;
    });
  }, [
    props.titles,
    props.showCompleted,
    props.showMissing,
    props.showComingSoon,
    props.completed,
  ]);

  const getColor = (titleId: string) => {
    return props.completed.includes(titleId) ? "green" : "red";
  };

  const bgAlpha = useColorModeValue("100", "900");

  if (titlesToDisplay.length === 0) return <></>;

  return (
    <SimpleGrid gap={1}>
      <GridItem alignSelf="center" paddingY={2}>
        <Text fontWeight="extrabold">{props.header}</Text>
      </GridItem>
      <GridItem>
        <SimpleGrid columns={14} gap={1}>
          {titlesToDisplay.map((title) => (
            <GridItem
              key={title.id}
              backgroundColor={
                title.unreleased
                  ? undefined
                  : `${getColor(title.id)}.${bgAlpha}`
              }
              borderColor={
                title.unreleased ? undefined : `${getColor(title.id)}.500`
              }
              borderStyle="solid"
              borderWidth={1}
              p={1}
            >
              <Stack>
                <StackItem display="flex" justifyContent="center">
                  <Image
                    src={`logos/${title.logo}`}
                    alt={title.title}
                    title={title.title}
                  />
                </StackItem>
                <StackItem>
                  <Text fontSize="xs" fontWeight="bold">
                    {title.plate_forms.join(" - ")}
                  </Text>
                </StackItem>
                <StackItem>
                  <Text fontSize="xs" fontWeight="bold">
                    {title.title}
                  </Text>
                </StackItem>
                <StackItem>
                  <Checkbox
                    onChange={handleCheckboxChange(title.id)}
                    isChecked={props.completed.includes(title.id)}
                    disabled={readOnly || title.unreleased}
                  />
                </StackItem>
              </Stack>
            </GridItem>
          ))}
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  );
};

export default Titles;
