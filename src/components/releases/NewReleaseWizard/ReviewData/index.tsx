import { Heading, Text, HStack, Stack, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { FiArrowRight, FiSave } from 'react-icons/fi';

import { ReleaseWizardComponentProps } from '../types';

import { basicInfoDataConfig, renderReviewData } from './data';
import BasicInfoReview from './BasicInfoReview';
import ArtworkReview from './ArtworkReview';
import DistributionReview from './DistributionReview';

import { BasicInfoFormData } from 'components/releases/forms/NewReleaseForm/types';
import { EditArtworkFormData } from 'components/releases/specific/Artwork/types';
import { EditDistributionFormData } from 'components/releases/specific/Distribution/types';

const ReviewData = ({
  completeState,
  canGoBack,
  onBack,
  onSubmit,
  loading,
}: ReleaseWizardComponentProps<any>) => {
  return (
    <Stack w="100%">
      <Stack maxW="600px" w="100%" spacing="50px" margin="0 auto">
        <BasicInfoReview data={completeState?.basics as BasicInfoFormData} />
        <ArtworkReview data={completeState?.artwork as EditArtworkFormData} />
        <DistributionReview data={completeState?.distribution as EditDistributionFormData} />
        <HStack justify="space-between">
          <Flex>
            {canGoBack && (
              <Button variant="link" onClick={onBack} leftIcon={<BiArrowBack />}>
                Back
              </Button>
            )}
          </Flex>
          <ButtonGroup>
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              onClick={onSubmit}
            >
              Save
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default ReviewData;
