import { badgesConfig, titlesConfig } from "../config";
import { Image, VStack, HStack, StackItem, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { difference } from "lodash";
import { IBadge } from "../typings";

interface IBadgesProps {
  completed: string[];
}

const Badges = (props: IBadgesProps) => {
  const completedTitles = useMemo(() => {
    return titlesConfig.filter((title) => props.completed.includes(title.id));
  }, [props.completed]);

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
          // TODO: unsupported
          console.warn("badge configuration unsupported: ");
          console.warn(badge);
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
  }, [props.completed, completedTitles]);

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
