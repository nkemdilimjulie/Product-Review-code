// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';  // For routing to DetailView

// const ListView = () => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // Fetch the list of todos from the Django API
//       axios.get('http://localhost:8000/api/mobiles/')
//       .then((response) => {
//         setReviews(response.data);
//         console.log(response.data)
//       })
//       .catch((error) => {
//         console.error('Error fetching todos:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Review List</h1>
//       <ul>
//         {reviews.map((todo, index) => (
//           <li key={todo.ean}>
//               <Link to={`/mobile/${todo.ean}`}>
//               <h3>{todo.model}</h3>
//           </Link>
//             <h3>{todo.model}</h3>
//             <p>{todo.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListView;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // For routing to DetailView

const ListView = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the list of mobiles from the Django API
      axios.get('http://localhost:8080/api/mobiles/')
      .then((response) => {
        setReviews(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching mobiles:', error);
      });
  }, []);

  return (
    <div>
      <h1>Review List</h1>
      <ul>
        {reviews.map((mobile, index) => (
          <li key={mobile.ean}>
              <Link to={`/mobile/${mobile.ean}`}>
              <h3>{mobile.model}</h3>
          </Link>
            <h3>{mobile.model}</h3>
            <p>{mobile.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;

