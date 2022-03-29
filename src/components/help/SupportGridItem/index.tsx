import {
  Box,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import { BiChevronRight } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = {
  href: string;
  title: string;
  titleRight?: JSX.Element;
  description: string;
  icon: IconType;
  color: string;
  isDisabled?: boolean;
};

const SupportGridItem = ({
  isDisabled,
  href,
  title,
  titleRight,
  description,
  icon,
  color,
}: Props) => {
  const { bodyText, border } = useAppColors();
  const accentColor = useColorModeValue(`${color}.500`, `${color}.300`);
  const hoverColor = useColorModeValue(`${color}.50`, `${color}.800`);

  return (
    <Box as={isDisabled ? Box : NextLink} href={href}>
      <LinkBox>
        <HStack
          cursor="pointer"
          rounded="lg"
          color={accentColor}
          p={3}
          py={5}
          pointerEvents={isDisabled ? 'none' : 'auto'}
          border={'1px solid'}
          borderColor={border}
          transition="all 0.2s ease-in-out"
          _hover={{ bg: hoverColor }}
          spacing={5}
          justifyContent={'space-between'}
        >
          <HStack spacing={5}>
            <Icon as={icon} fontSize="4xl"></Icon>
            <Stack color={bodyText}>
              <HStack>
                <LinkOverlay href={isDisabled ? '' : href}>
                  <Text fontWeight={'semibold'}>{title}</Text>
                </LinkOverlay>
                {titleRight}
              </HStack>
              <Text fontSize={'sm'} color={bodyText}>
                {description}
              </Text>
            </Stack>
          </HStack>
          <Icon fontSize="xl" as={BiChevronRight}></Icon>
        </HStack>
      </LinkBox>
    </Box>
  );
};

export default SupportGridItem;
