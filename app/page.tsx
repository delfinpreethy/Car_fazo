"use client";

import { Hero, SearchBar, CustomFilter, ShowMore } from '@/components';
import { fetchCars } from '@/utilis';
import { useState, useEffect } from 'react';
import { CarCard } from '@/components';
import { manufacturers, yearsOfProduction, fuels } from '@/constants';

function Home({ searchParams }) {
  const [allCars, setAllCars] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await fetchCars({
          manufacturer: searchParams.manufacturer || "",
          year: searchParams.year || 2023,
          fuel: searchParams.fuel || "",
          limit: searchParams.limit || 10,
          model: searchParams.model || "",
        });
        setAllCars(cars);
        setIsDataEmpty(!Array.isArray(cars) || cars.length < 1 || !cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setIsDataEmpty(true);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car) => (
                <CarCard  car={car} />
              ))}
            </div>
            <ShowMore
    pageNumber={(parseInt(searchParams.limit, 10) || 10) / 10}
    isNext={(parseInt(searchParams.limit, 10) || 10) > allCars.length}
/>


          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              Oops, no Results
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
