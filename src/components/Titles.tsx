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
}

const Titles = (props: ITitlesProps) => {
  return (
    <Grid templateColumns="repeat(14, 1fr)" gap={1}>
      {props.titles.map((title) => (
        <GridItem>
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
              <Checkbox />
            </StackItem>
          </Stack>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Titles;
