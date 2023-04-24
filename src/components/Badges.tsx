import { badgesConfig, titlesConfig } from "../config";
import { Image, VStack, HStack, StackItem, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { difference } from "lodash";
import { IBadge } from "../typings";

interface IBadgesProps {
  completed: string[];
}

const Badges = (props: IBadgesProps) => {
  const titles = titlesConfig.filter((title) => title.unreleased !== true);

  const completedTitles = useMemo(() => {
    return titles.filter((title) => props.completed.includes(title.id));
  }, [props.completed, titles]);

  const badgesToDisplay = useMemo(() => {
    if (props.completed.length === 0) return [];

    const eligibleBadges: IBadge[] = [];

    badgesConfig.forEach((badge) => {
      if (badge.gameIds !== undefined) {
        if (difference(badge.gameIds, props.completed).length === 0) {
          eligibleBadges.push(badge);
        }
      } else if (badge.gameTypes !== undefined) {
        if (badge.nbrRequired === undefined) {
          const filteredTitles = titles
            .filter((title) => badge.gameTypes?.includes(title.type))
            .map((title) => title.id);

          if (difference(filteredTitles, props.completed).length === 0) {
            eligibleBadges.push(badge);
          }
        }

        if (badge.nbrRequired !== undefined) {
          const filteredTitles = completedTitles.filter((title) => {
            return badge.gameTypes!.includes(title.type);
          });

          if (filteredTitles.length >= badge.nbrRequired) {
            eligibleBadges.push(badge);
          }
        }
      } else {
        // TODO: badges requiring all games
        console.warn("badge requiring all games unsupported: ");
        console.warn(badge);
      }
    });

    return eligibleBadges;
  }, [props.completed, completedTitles, titles]);

  return (
    <VStack gap={3}>
      <StackItem>
        <Text as="i">
          Note: Badges are in Beta, they might not work as expected!
        </Text>
      </StackItem>
      <StackItem>
        {badgesToDisplay?.length === 0 && (
          <Image src="badges/nothing.png" alt="nothing" title="Nothing" />
        )}
        <HStack>
          {badgesToDisplay.map((badge) => (
            <StackItem key={badge.id}>
              <Image
                src={`badges/${badge.logo}`}
                alt={badge.title}
                title={badge.title}
              />
            </StackItem>
          ))}
        </HStack>
      </StackItem>
    </VStack>
  );
};

export default Badges;
