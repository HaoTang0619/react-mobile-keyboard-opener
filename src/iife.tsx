import * as React from 'react';
import { render } from 'react-dom';
import useMobileKeyboardOpener, { MobileKeyboardOpener } from './index';

const App = () => {
  const setOptions = useMobileKeyboardOpener({
    callback: () => console.log('callback (target)'),
    helperId: 'helper',
    targetId: 'target',
  });
  const [targetId, setTargetId] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setOptions((opt) => ({
        ...opt,
        callback: () => console.log('callback (new_target)'),
        helperId: 'new_helper',
        targetId: 'new_target',
      }));

      setTargetId('target');
    }, 5000);
  }, []);

  return (
    <>
      <button id="helper">Helper</button>
      <input id="target" placeholder="target" />
      <br />
      <button id="new_helper">New Helper</button>
      <input id="new_target" placeholder="new target" />
      <br />
      <button id="hidden_helper">Hidden Helper</button>
      <MobileKeyboardOpener
        helperId="hidden_helper"
        targetId={targetId}
        inputProps={{ id: 'hid' }}
      />
    </>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'));
});
