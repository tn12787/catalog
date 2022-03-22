import React from 'react';

import ProductSection from '../ProductSection';

import { PricingTableSection } from 'types/marketing/pricing';

type Props = { data: PricingTableSection[] };

const PricingGrid = ({ data }: Props) => {
  return (
    <>
      {data.map((section) => (
        <ProductSection section={section} key={section.title}></ProductSection>
      ))}
    </>
  );
};

export default PricingGrid;
