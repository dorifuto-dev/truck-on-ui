import React, { useState, useEffect } from 'react';
import './TrailIndex.scss';
import { useQuery } from '@apollo/client';
import { TRAIL_INDEX }from '../../graphql/queries'
import TrailCard from '../TrailCard/TrailCard'
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import { filterByCatagories, cleanFilters } from '../Filter/helperMethods';

const TrailIndex = () => {
  const {loading, error, data} = useQuery(TRAIL_INDEX)
  const [allTrails, setAllTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTrailFilters = (filterObj) => {
    const cleanedFilters = cleanFilters(filterObj)
    setFilteredTrails(filterByCatagories(cleanedFilters, allTrails))
  }

  useEffect(() => {
    if (data) {
      setAllTrails(data.trails)
      setFilteredTrails(data.trails)
    }
  }, [data])

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  const trailList = filteredTrails.filter(trail => {
    if (!searchQuery) {
      return trail
    } else if (trail.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return trail
    }
  }).map(trail => {
    return (
      <TrailCard key={trail.id} trail={trail}/>
    )
  })

  return (
    <>
      {!loading ?
        <section className="trail-index-container">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search Trails"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}></input>
            <Filter
              handleTrailFilters={handleTrailFilters}
              setFilteredTrails={setFilteredTrails}
              allTrails={allTrails}
            />
            <button className="reset-search" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
          <h1 className="trails-title">Colorado Offroad Trails</h1>
          <section className="trail-card-container">
            {trailList}
          </section>
        </section> :
        <Spinner />
      }
    </>
  );
}

export default TrailIndex;
