import { Image, Stack, StackItem, Text } from "@chakra-ui/react";

const Badges = () => {
  return (
    <Stack gap={3}>
      <StackItem>
        <Text as="i">
          Note: Badges are in Beta, they might not work as expected!
        </Text>
      </StackItem>
      <StackItem>
        <Image src="badges/nothing.png" alt="nothing" title="Nothing" />
      </StackItem>
    </Stack>
  );
};

export default Badges;
