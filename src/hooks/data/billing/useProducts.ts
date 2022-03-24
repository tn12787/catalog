import { useQuery } from 'react-query';

import { fetchProducts } from 'queries/payments';

const useProducts = () => {
  return useQuery(['products'], () => fetchProducts());
};

export default useProducts;
