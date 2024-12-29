import { useLocation } from 'react-router-dom';
import { SearchResultsGrid } from '../components/nav/Nav';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const products = location.state?.products || [];

  return (
    <div>
      <h1>Resultados da Busca</h1>
      <SearchResultsGrid products={products} />
    </div>
  );
};