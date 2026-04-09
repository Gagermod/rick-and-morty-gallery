import axios from 'axios';
import { useEffect, useState } from 'react';

export function useDynamicFilterOptions() {
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchAllOptions = async () => {
      setIsFetching(true);
      try {
        const { data } = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        const totalPages = data.info.pages;

        const pageRequests = [];
        for (let i = 1; i <= totalPages; i++) {
          pageRequests.push(
            axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)
          );
        }

        const responses = await Promise.all(pageRequests);

        const allCharacters = responses.flatMap(
          (response) => response.data.results
        );

        const uniqueStatuses = [
          ...new Set(
            allCharacters.map((character) => character.status).filter(Boolean)
          )
        ];
        const uniqueGenders = [
          ...new Set(
            allCharacters.map((character) => character.gender).filter(Boolean)
          )
        ];
        const uniqueSpecies = [
          ...new Set(
            allCharacters.map((character) => character.species).filter(Boolean)
          )
        ];

        uniqueStatuses.sort();
        uniqueGenders.sort();
        uniqueSpecies.sort();

        setStatuses(uniqueStatuses);
        setGenders(uniqueGenders);
        setSpeciesList(uniqueSpecies);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);

        setStatuses(['Alive', 'Dead', 'unknown']);
        setGenders(['Male', 'Female', 'Genderless', 'unknown']);
        setSpeciesList([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllOptions();
  }, []);

  return { statuses, genders, speciesList, isFetching };
}
