import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const MealDeliverySignupPage = React.lazy(() => import('@tiagojacinto/meal-delivery-signup-page'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>MealDeliverySignupPage</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/signup' element={<MealDeliverySignupPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
