import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabfilter from './Tabfilter';

function Category() {
  const { name } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dribbble-server.vercel.app/api/categories`)
      .then(response => response.json())
      .then(data => {
        const foundCategory = data.categories.find(cat => cat.name === name);
        setCategory(foundCategory);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <Tabfilter />
    </div>
  );
}

export default Category;
