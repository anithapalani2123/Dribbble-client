
import React, { useState, useEffect, useRef } from 'react';
import './Tabfilters.css';
import { Link, useParams } from 'react-router-dom';
import heart from '../assets/heart.png';
import views from '../assets/eye.png';
import { Heart, Bookmark } from 'lucide-react';
import Search from './Search';

const Tabfilter = () => {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [filterOption, setFilterOption] = useState('Following');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const NavSection2Ref = useRef(null);

  useEffect(() => {
    fetch('https://dribbble-server.vercel.app/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data.categories || []);
        if (!name || name === "Discover") {
          const allCards = data.categories.flatMap(category => category.cards);
          setFilteredCards(allCards);
        } else {
          const selectedCategory = data.categories.find(category => category.name === name);
          if (selectedCategory) {
            setFilteredCards(selectedCategory.cards);
          }
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [name]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let categoryUrl = 'https://dribbble-server.vercel.app/api/categories';
    let filterUrl;

    switch (filterOption) {
      case 'Following':
        filterUrl = 'https://dribbble-server.vercel.app/api/following';
        break;
      case 'Popular':
        filterUrl = 'https://dribbble-server.vercel.app/api/popular';
        break;
      case 'NewAndNoteworthy':
        filterUrl = 'https://dribbble-server.vercel.app/api/newAndNoteworthy';
        break;
      default:
        break;
    }

    fetch(categoryUrl)
      .then(response => response.json())
      .then(data => {
        let allCards = [];
        if (!name || name === "Discover") {
          allCards = data.categories.flatMap(category => category.cards);
        } else {
          const selectedCategory = data.categories.find(category => category.name === name);
          if (selectedCategory) {
            allCards = selectedCategory.cards;
          }
        }

        if (filterUrl) {
          fetch(filterUrl)
            .then(response => response.json())
            .then(filterData => {
              const filterKey = Object.keys(filterData)[0];
              const filteredCards = filterData[filterKey] || [];

              if (filteredCards.length > 0) {
                const cardIds = new Set(allCards.map(card => card.id));
                const uniqueFilteredCards = filteredCards.filter(card => !cardIds.has(card.id));
                setFilteredCards([...allCards, ...uniqueFilteredCards]);
              } else {
                setFilteredCards(allCards);
              }
            })
            .catch(error => console.error('Error fetching filter data:', error));
        } else {
          setFilteredCards(allCards);
        }
      })
      .catch(error => console.error('Error fetching category data:', error));
  }, [name, filterOption]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const scrollLeft = () => {
    if (NavSection2Ref.current) {
      NavSection2Ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (NavSection2Ref.current) {
      NavSection2Ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className='Tab'>
      <div className='navSection'>
        <div className='NavSection1'>
          <select name="filter" id="DropdownFilter" value={filterOption} onChange={handleFilterChange}>
            <option value="Following">Following</option>
            <option value="Popular">Popular</option>
            <option value="NewAndNoteworthy">New & Noteworthy</option>
          </select>
        </div>

        <div className='NavSection2-wrapper'>
          {isMobile && <button className='scroll-button' onClick={scrollLeft}>{'<'}</button>}
          <div className={`NavSection2 ${isMobile ? 'mobile' : ''}`} ref={NavSection2Ref}>
            {categories.map(category => (
              <h4 className='list' key={category.name}>
                <Link to={`/category/${encodeURIComponent(category.name)}`}>{category.name}</Link>
              </h4>
            ))}
          </div>
          {isMobile && <button className='scroll-button' onClick={scrollRight}>{'>'}</button>}
        </div>

        <div className='NavSection3'>
          <button id='filter' onClick={toggleFilterVisibility}>Filters</button>
        </div>
      </div>

      {isFilterVisible && <Search />}

      <div className='container'>
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <div key={card.id} className='card-container'>
              <div className='card'>
                <img src={card.image_url} alt={card.title} />
                <div className='overlay'>
                  <h3 className='overlay-title'>{card.title}</h3>
                  <div className='icons'>
                    <Bookmark style={{ width: "30px", height: "30px", borderRadius: "50%", padding: "5px" }} />
                    <Heart style={{ width: "30px", height: "30px", borderRadius: "50%", padding: "5px" }} />
                  </div>
                </div>
                <div className='details'>
                  <div style={{display:"flex"}}>
                    <img src={card.image_url} alt="icon" style={{width:"20px",height:"20px",borderRadius:"30px"}}/>
                    <h3 style={{ fontSize: '14px' }}>{card.title}</h3>

                  </div>
                  <div className='count'>
                    <div id='likes'>
                      <img src={heart} style={{ width: '15px', height: '15px' }} alt="likes icon" />
                      <h5>{card.likes}</h5>
                    </div>
                    <div id='views'>
                      <img src={views} style={{ width: '25px', height: '25px' }} alt="views icon" />
                      <h5>{card.views}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No cards available</div>
        )}
      </div>
    </div>
  );
};

export default Tabfilter;
