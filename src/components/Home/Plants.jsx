import Card from './Card'
import Container from '../Shared/Container'
import EmptyState from '../Shared/EmptyState'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Plants = () => {
  const {
    data: plants = [],
    isLoading,
  } = useQuery({
    queryKey: ["plants"],   // better name
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/plant`);
      if (!res.ok) {
        throw new Error("Failed to fetch plants");
      }
      return res.json();
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <Container>
      {plants.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {plants.map(plant => (
            <Card key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <EmptyState message='No plant data available right now!' />
      )}
    </Container>
  )
}

export default Plants