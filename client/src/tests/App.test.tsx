import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../pages/App/App';
import { Provider } from 'react-redux';
import { store } from '@redux/stores/rootStore';

describe('App', () => {
  it('loader', () => {
    render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
    expect(screen.getByRole('progressbar'));
  });
});
