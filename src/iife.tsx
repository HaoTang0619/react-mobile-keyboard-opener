import * as React from 'react';
import { render } from 'react-dom';
import App from './index';

window.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'));
});
