// import React, { useState, useEffect } from 'react';

// function ScrollToTopButton() {
//   const [visible, setVisible] = useState(false);

//   // Show button after scrolling down
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setVisible(true);
//       } else {
//         setVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth', // for smooth scrolling
//     });
//   };

//   return (
//     visible && (
//       <button
//         onClick={scrollToTop}
//         style={{
//           position: 'fixed',
//           bottom: '2rem',
//           right: '2rem',
//           padding: '0.5rem 1rem',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '50px',
//           fontSize: '1.2rem',
//           cursor: 'pointer',
//           boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//           zIndex: 1000,
//         }}
//       >
//         ↑ Top
//       </button>
//     )
//   );
// }

// export default ScrollToTopButton;

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
    //   <button
    //     onClick={scrollToTop}
    //     style={{
    //       position: 'fixed',
    //       bottom: '2rem',
    //       right: '2rem',
    //       backgroundColor: '#007bff',
    //       color: 'white',
    //       border: 'none',
    //       borderRadius: '50%',
    //       width: '50px',
    //       height: '50px',
    //       fontSize: '20px',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       cursor: 'pointer',
    //       boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    //       zIndex: 1000,
    //       transition: 'opacity 0.3s ease-in-out',
    //     }}
    //     aria-label="Scroll to top"
    //   >
    //     <FaArrowUp />
    //   </button>

        <button
            onClick={scrollToTop}
            style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '0.75rem 1rem',
            fontSize: '16px',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
        >
        ⬆ Scroll to Top
        </button>
    )
  );
}

export default ScrollToTopButton;

