// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import store from '../../'
// import App from './App';

// test('renders learn react link', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

