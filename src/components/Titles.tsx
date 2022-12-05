import {
  Checkbox,
  Grid,
  GridItem,
  Image,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { ITitle } from "../typings.d";

interface ITitlesProps {
  titles: ITitle[];
  completed: string[];
  onCheckboxChange: (id: string) => void;
}

const Titles = (props: ITitlesProps) => {
  const handleCheckboxChange = (id: string) => () => {
    props.onCheckboxChange(id);
  };

  return (
    <Grid templateColumns="repeat(14, 1fr)" gap={1}>
      {props.titles.map((title) => (
        <GridItem key={title.id}>
          <Stack>
            <StackItem display="flex" justifyContent="center">
              <Image src={`logos/${title.logo}`} alt={title.title} />
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
                checked={props.completed.includes(title.id)}
              />
            </StackItem>
          </Stack>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Titles;
