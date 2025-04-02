# To Fetch (Fixed) Data from Backend API
`Use these Statements:` 
```
VITE_API_URL="http://localhost:8000/api"
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // Output: http://localhost:8000/api
```
`this way:`

+ First, in the root of your React project (the same level as vite.config.ts or package.json), create or edit the .env file.
+ Inside .env, add the VITE_API_URL variable:
VITE_API_URL="http://localhost:8000/api"
+ Then, in any component, insert this:

```
import React, { useEffect, useState } from 'react';

const FetchBackendApiData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Accessing the environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    // Log the API URL to check if it's correctly loaded
    console.log("API URL:", apiUrl); // This will print in the browser console

    // Fetching data from the backend API
    fetch(`${apiUrl}/items/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;
```

## To Call the FetchBackendApiData Function in App.tsx (React Dashboard)

**App.tsx**

```
import FetchBackendApiData from './FetchBackendApiData';

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <FetchBackendApiData />
    </div>
  );
}

export default App;

```
## Note:
The function name `FetchBackendApiData` can be changed to `App`, if this code is stored in App.tsx. If it so happens, then, there is no need to call the function using the last function shown above in App.tsx.


## To Fetch (Dynamic) Data from Backend API
One of the changes involve, changing 

**fetch(`${apiUrl}/items/`)** to **fetch(`${apiUrl}/${endpoint}`)**, 

where {endpoint} can be defined differently as shown below:

Which Method Should You Use? 
+ 1️⃣ If the endpoint changes based on a dropdown or button click → Use state (useState)
+ 2️⃣ If the endpoint is passed as a prop to the component → Use props
+ 3️⃣ If the endpoint is based on the URL (React Router) → Use useParams


**Here are instances:**


### Fetch (Dynamic) Data from Backend API (Method 1)
1️⃣ If the endpoint changes based on a dropdown or button click → Use state (useState)
If the endpoint should change based on user input, store it in a state using a `State Variable`. This method does not need to called. You can use it as an App.tsx.

✅ Why Use a State Variable?
Dynamic Fetching: The API endpoint updates dynamically based on user actions.

Reactivity: useEffect re-runs when endpoint changes, fetching new data.

User Control: The user can switch between different API data sources (e.g., items, products).

✅ Example with a dropdown:

```

import React, { useEffect, useState } from 'react';

const FetchBackendApiData = () => {
  const [endpoint, setEndpoint] = useState('items'); // Default endpoint
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Fetching from:", `${apiUrl}/${endpoint}`);

    fetch(`${apiUrl}/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [endpoint]); // Re-run when endpoint changes

  return (
    <div>
      <h1>Data from {endpoint}</h1>
      
      <select onChange={(e) => setEndpoint(e.target.value)} value={endpoint}>
        <option value="items">Items</option>
        <option value="products">Products</option>
        <option value="users">Users</option>
      </select>

      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;
```

✅ Example with a button:

```
import React, { useEffect, useState } from 'react';

const FetchBackendApiData = () => {
  const [endpoint, setEndpoint] = useState("items"); // Default endpoint
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("Fetching from:", `${apiUrl}/${endpoint}`);

    fetch(`${apiUrl}/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [endpoint]); // Re-fetch when endpoint changes

  return (
    <div>
      <h1>Dynamic API Fetch</h1>
      
      {/* Buttons to change endpoint dynamically */}
      <button onClick={() => setEndpoint("items")}>Fetch Items</button>
      <button onClick={() => setEndpoint("products")}>Fetch Products</button>

      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;

```


### Fetch (Dynamic) Data from Backend API (Method 2)
2️⃣ If the endpoint is passed as a **prop** (Properties) to the component → Use **Props**

If you want to dynamically pass the endpoint as a prop, modify the component like this:

✅ Component that accepts an endpoint prop

```
import React, { useEffect, useState } from 'react';

interface Props {
  endpoint: string;  // Accept endpoint dynamically
}

const FetchBackendApiData: React.FC<Props> = ({ endpoint }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Fetching from:", `${apiUrl}/${endpoint}`);

    fetch(`${apiUrl}/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [endpoint]); // Re-run when endpoint changes

  return (
    <div>
      <h1>Data from {endpoint}</h1>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;

```
Call it this way in **App.tsx**

```

import FetchBackendApiData from './FetchBackendApiData';

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <FetchBackendApiData endpoint="items" />  {/* Can be changed dynamically */}
    </div>
  );
}

export default App;
```


### Fetch (Dynamic) Data from Backend API (Method 3)
3️⃣ If the endpoint is based on the URL (React Router) → Use useParams
Using URL Parameters (useParams from React Router)
If you want to fetch different data based on the URL (e.g., /items, /products):

✅ Step 1: Setup React Router
Install react-router-dom if not installed:
```
npm install react-router-dom
```
✅ Step 2: Create the Fetch Component
```
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FetchBackendApiData = () => {
  const { endpoint } = useParams();  // Get endpoint from the URL
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Fetching from:", `${apiUrl}/${endpoint}`);

    fetch(`${apiUrl}/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [endpoint]); // Re-run when URL changes

  return (
    <div>
      <h1>Data from {endpoint}</h1>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchBackendApiData;
```
✅ Step 3: Setup Routing in **App.tsx**

```
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FetchBackendApiData from './FetchBackendApiData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:endpoint" element={<FetchBackendApiData />} />
      </Routes>
    </Router>
  );
}

export default App;
```

✅ Now you can access different endpoints via URLs:

http://localhost:5173/items

http://localhost:5173/products

http://localhost:5173/users







