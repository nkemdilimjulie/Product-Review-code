
// mmmmmmmmmmmmmmmmmmmmmmm-------------------mmmmmmmmmmmmmmmmmmmmmmmmmmmm


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ScrollToTopButton from './ScrollToTopButton';
// import { FaArrowUp } from 'react-icons/fa';
// import { saveAs } from 'file-saver';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// import { API_DOMAIN } from '../../configdomain';

// function MarketersList() {
//   const [marketers, setMarketers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [totalPages, setTotalPages] = useState(1);
//   const [expandedCard, setExpandedCard] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();


//   const goBack = () => {
//     navigate(-1);  // Go back to last page
//   };
  
//   const goForward = () => {
//     navigate(1);   // Go forward to next page
//   };

//   const ITEMS_PER_PAGE = 7;

//   // useEffect(() => {
//   //   const query = new URLSearchParams(location.search);
//   //   const pageQuery = parseInt(query.get('page')) || 1;
//   //   setPage(pageQuery);
//   // }, [location.search]);

//   // useEffect(() => {
//   //   fetch(`${API_DOMAIN}/api/marketers/?ordering=-created_at&page=${page}`, {

//   //     method: 'GET',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
//   //     },
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log('Fetched data:', data);
//   //       if (Array.isArray(data.results)) {
//   //         const filtered = data.filter(r =>
//   //           searchTerm === '' || r.author.toLowerCase().includes(searchTerm.toLowerCase()));
//   //         setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   //         setMarketers(filtered);
//   //       } else {
//   //         console.error("Expected an array of marketers, got:", data);
//   //       }
//   //     })
//   //     .catch((err) => console.error('Error fetching marketers:', err));
//   // }, [searchTerm]);

//   const [currentUrl, setCurrentUrl] = useState(`${API_DOMAIN}/api/marketers/`);


//   useEffect(() => {
//     fetch(currentUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data.results)) {
//           setMarketers(data.results);
//           setNextPage(data.next);
//           setPrevPage(data.previous);
//         } else {
//           console.error('Expected an array of marketers, got:', data);
//         }
//       })
//       .catch((err) => console.error('Error fetching marketers:', err));
//   }, [currentUrl]);

//   const handleExport = (type) => {
//     const headers = ['Author', 'Phone', 'Company', 'Link'];
//     const rows = marketers.map(r => [
//       r.author,
//       r.phone,
//       r.company,
//       r.link
     
//     ]);
  
//     if (type === 'pdf') {
//       const doc = new jsPDF();
//       autoTable(doc, {
//         head: [headers],
//         body: rows,
//       });
//       doc.save('marketers.pdf');
//     } else {
//       const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       saveAs(blob, 'marketers.csv');
//     }
//   };
  
//   const buttonStyle = {
//     margin: '8px',
//     padding: '10px 20px',
//     borderRadius: '10px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//   };

//   const currentMarketers = marketers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);


// return (
//   <div style={{ padding: '2rem' }}>
    
//     <h2>Marketers List</h2>
//     <div className="d-flex justify-content-between align-items-center mb-4">
      
//       <div>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//     </div>
//     {currentMarketers.length === 0 ? (
//       <p>No Marketer found.</p>
//     ) : (
//       <ul className="list-group">
//         {currentMarketers.map((marketer) => (
//           <li
//             key={marketer.id}
//             className="list-group-item mb-3"
//             style={{ borderRadius: '10px', cursor: 'pointer' }}
//             onClick={() => setExpandedCard(expandedCard === marketer.id ? null : marketer.id)}
//           >
//             <p><strong>Author:</strong> {marketer.author}</p>
//             <p><strong>Phone:</strong> {marketer.phone}</p>
//             <p><strong>Link:</strong> {marketer.link}</p>
//             {expandedCard === marketer.id && (
//               <div>
//                 <p><strong>Company:</strong> {marketer.company || 'N/A'}</p>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     )}

//     <div className="d-flex justify-content-between mt-4">
//       <button
//         disabled={page === 1}
//         onClick={() => navigate(`?page=${page - 1}`)}
//         className="btn btn-outline-primary"
//       >Previous</button>

//       <span className="align-self-center">Page {page} of {totalPages}</span>

//       <button
//         disabled={page === totalPages}
//         onClick={() => navigate(`?page=${page + 1}`)}
//         className="btn btn-outline-primary"
//       >Next</button>
//     </div>

//     <div className="mt-4">
//       <button className="btn btn-danger me-2" onClick={() => handleExport('csv')}>Export to CSV</button>
//       <button onClick={() => navigate('/marketer-list-vertical')} style={buttonStyle}>Marketer List Vertical</button>
//       <button className="btn btn-danger" onClick={() => handleExport('pdf')}>Export to PDF</button>
//     </div>
//     <div>
//         <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
//         <button onClick={() => navigate('/marketers')} style={buttonStyle}>Marketers</button>
//         <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
//         <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
//       </div> 
   
//     <ScrollToTopButton />
//     <ToastContainer />
//     <FaArrowUp />
//   </div>
// );
// }
// export default MarketersList;


// mmmm --------mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './ScrollToTopButton';
import { FaArrowUp } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "jspdf-autotable";

import { API_DOMAIN } from '../../configdomain';

function MarketersList() {
  const [marketers, setMarketers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const goBack = () => {
    navigate(-1);  // Go back to last page
  };
  
  const goForward = () => {
    navigate(1);   // Go forward to next page
  };

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageQuery = parseInt(query.get('page')) || 1;
    setPage(pageQuery);
  }, [location.search]);

  useEffect(() => {
    fetch(`${API_DOMAIN}/api/marketers/?ordering=-created_at&page=${page}`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('jwt_token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data.results)) {
          const filtered = data.results.filter(r =>
            searchTerm === '' || r.author.toLowerCase().includes(searchTerm.toLowerCase()));
          setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
          setMarketers(filtered);
        } else {
          console.error("Expected an array of marketers, got:", data);
        }
      })
      .catch((err) => console.error('Error fetching marketers:', err));
  }, [searchTerm]);
  
  // const handleExport = (type) => {
  //   const headers = ['Author', 'Phone', 'Company', 'Link'];
  //   const rows = marketers.map(r => [
  //     r.author,
  //     r.phone,
  //     r.company,
  //     r.link
  //   ]);
  
  //   if (type === 'pdf') {
  //     const doc = new jsPDF();
  //     autoTable(doc, {
  //       head: [headers],
  //       body: rows,
  //     });
  //     doc.save('marketers.pdf');
  //   } else {
  //     const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //     saveAs(blob, 'marketers.csv');
  //   }
  // };
  
 
  const handleExport = () => {
    const doc = new jsPDF();

    // Optional: Add a title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Marketers List", 14, 22);

    // Define columns and rows
    const columns = [
      { header: "Author", dataKey: "author" },
      { header: "Phone", dataKey: "phone" },
      { header: "Company", dataKey: "company" },
      { header: "Link", dataKey: "link" },
    ];

    const rows = marketers.map((marketer) => ({
      author: marketer.author,
      phone: marketer.phone,
      company: marketer.company,
      link: marketer.link,
  }));

  // AutoTable
  autoTable(doc, {
    columns,
    body: rows,
    startY: 30,
    theme: "striped", // 'grid', 'plain', 'striped'
    styles: {
      fontSize: 10,
      textColor: 20,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [255, 102, 178], // pinkish
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 30 },
  });

  // Optional: Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 180, 290, { align: 'right' });
  }

  // Save the PDF
  doc.save("marketers_list.pdf");
};


  
  const buttonStyle = {
    margin: '8px',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const currentMarketers = marketers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{ padding: '2rem' }}>
      
      <h2>Marketers List</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {currentMarketers.length === 0 ? (
        <p>No marketers found.</p>
      ) : (
        <ul className="list-group">
          {currentMarketers.map((marketer) => (
            <li
              key={marketer.id}
              className="list-group-item mb-3"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setExpandedCard(expandedCard === marketer.id ? null : marketer.id)}
            >
              <p><strong>Author:</strong> {marketer.author}</p>
              <p><strong>Phone:</strong> {marketer.phone}</p>
              {expandedCard === marketer.id && (
                <div>
                  <p><strong>Company:</strong> {marketer.company}</p>
                  <p><strong>Link:</strong> {marketer.link}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => navigate(`?page=${page - 1}`)}
          className="btn btn-outline-primary"
        >Previous</button>

        <span className="align-self-center">Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => navigate(`?page=${page + 1}`)}
          className="btn btn-outline-primary"
        >Next</button>
      </div>

      <div className="mt-4">
        <button className="btn btn-danger me-2" onClick={() => handleExport('csv')}>Export to CSV</button>
        <button onClick={() => navigate('/review-mobiles')} style={buttonStyle}>Review Mobiles</button>
        <button className="btn btn-danger" onClick={() => handleExport('pdf')}>Export to PDF</button>
      </div>
      <div>
          <button className="btn btn-secondary me-2" onClick={goBack}>⬅️ Back</button>
         
          <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>Logout</button>
          <button className="btn btn-secondary" onClick={goForward}>➡️ Forward</button>
        </div> 
     
      <ScrollToTopButton />
      <ToastContainer />
      <FaArrowUp />
    </div>
  );
}

export default MarketersList;
