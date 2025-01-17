import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const MealDeliverySignupPage = React.lazy(() => import('meal-delivery-signup-page/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/meal-delivery-signup-page'>MealDeliverySignupPage</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<NxWelcome title='meal-delivery-host' />} />
        <Route path='/meal-delivery-signup-page' element={<MealDeliverySignupPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
