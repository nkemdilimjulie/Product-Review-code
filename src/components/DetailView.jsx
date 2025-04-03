// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';  // To get the `id` from the URL
// import axios from 'axios';

// const DetailView = () => {
//   const { id } = useParams();  // Get `id` from the URL parameters
//   const [review, setReview] = useState(null);

//   useEffect(() => {
//     // Fetch the details of a specific todo
//       axios.get(`http://localhost:8000/api/mobiles/${id}/`)
//       .then((response) => {
//         console.log(response.data);
//         setReview(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching todo details:', error);
//       });
//   }, [id]);

//   if (!review) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{review.ean}</h1>
//       <p>{review.model}</p>
//       <p>{review.brand}</p>
//       <p>{review.description}</p>
//     </div>
//   );
// };

// export default DetailView;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the `id` from the URL
import axios from 'axios';

const DetailView = () => {
  const { id } = useParams();  // Get `id` from the URL parameters
  const [review, setReview] = useState(null);

  useEffect(() => {
    // Fetch the details of a specific todo
      axios.get(`http://localhost:8000/api/mobiles/${id}/`)
      .then((response) => {
        console.log(response.data);
        setReview(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todo details:', error);
      });
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div>
      <h1>{review.ean}</h1>
      <p>{review.model}</p>
      <p>{review.brand}</p>
      <p>{review.description}</p>
    </div>
  );
};

export default DetailView;

