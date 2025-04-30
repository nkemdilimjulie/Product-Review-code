// import React from "react";
// import { API_DOMAIN } from '../../configdomain';

// const SwaggerDoc = () => {
//   return (
//     <div style={{ height: "100vh", width: "100%", padding: "1rem" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         API Documentation
//       </h1>
//       <iframe
//         src={`${API_DOMAIN}/swagger/`}  // Ensure this points to the correct backend Swagger URL
//         title="Swagger API Documentation"
//         style={{
//           width: "100%",
//           height: "90vh",
//           border: "none",
//           borderRadius: "8px",
//         }}
//       />
//     </div>
//   );
// };

// export default SwaggerDoc;


// import React from "react";
// import { API_DOMAIN } from '../../configdomain';

// const SwaggerDoc = () => {
//   return (
//     <div style={{ height: "100vh", width: "100%", padding: "1rem" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         API Documentation
//       </h1>
//       <p style={{ textAlign: "center" }}>
//         <a href={`${API_DOMAIN}/swagger/`} target="_blank" rel="noopener noreferrer">
//           View API Documentation
//         </a>
//       </p>
//     </div>
//   );
// };

// export default SwaggerDoc;

import React from "react";
import { API_DOMAIN } from '../../configdomain';

const SwaggerDoc = () => {
  return (
    <div style={{ height: "100vh", width: "100%", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        API Documentation
      </h1>
      <iframe
        src={`${API_DOMAIN}/swagger/`}  
        title="Swagger API Documentation"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default SwaggerDoc;
