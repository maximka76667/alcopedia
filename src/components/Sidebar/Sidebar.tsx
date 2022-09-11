import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DrinksContext from '../../contexts/DrinksContext';
import { DrinkInterface } from '../../interfaces';
import Search from '../Search/Search';
import "./Sidebar.sass"

const Sidebar = () => {
  const drinks = useContext(DrinksContext);
  const [search, setSearch] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkInterface[]>([]);

  function handleSearch(search: string) {
    setSearch(search);
  }

  useEffect(() => {
    const newDrinks = drinks.filter((drink) => drink.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredDrinks(newDrinks);
  }, [search, drinks])

  return (
    <div className='sidebar-wrapper'>
      <aside className='sidebar'>
        <Search search={search} onSearch={handleSearch} />
        <ul className='sidebar__list'>
          {
            filteredDrinks.length !== 0 ? filteredDrinks.map((drink) => (
              <li key={drink._id} className='sidebar__item'>
                <NavLink className={
                  ({ isActive }) => "sidebar__link" +
                    (isActive ? " sidebar__link_active" : "")
                } to={drink._id}>
                  {drink.name}
                </NavLink>
              </li>
            )) : <p className='sidebar__not-found'>Nothing is found</p>
          }
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar