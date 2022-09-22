import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../pages/App/App';
import { Provider } from 'react-redux';
import { store } from '../redux/stores/rootStore';

describe('App', () => {
  it('default timer is 5', () => {
    render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
    expect(screen.getByDisplayValue('5'));
    expect(screen.getByRole('spinbutton')).toBeRequired();
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });
  it('default ignore list is empty', () => {
    render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
    expect(screen.getByText(/Ignore List/i));
    expect(screen.getByText(/No Item/i));
  });
});
