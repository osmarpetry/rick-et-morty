import CharacterList from '@/components/CharacterList';

export default function Home() {
  return (
    <div className='py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Rick and Morty Characters
      </h1>
      <CharacterList />
    </div>
  );
}
