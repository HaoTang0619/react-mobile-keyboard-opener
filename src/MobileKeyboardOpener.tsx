import React, { useEffect } from 'react';
import './input.css';
import useMobileKeyboardOpener from './useMobileKeyboardOpener';

type MobileKeyboardOpenerProps = {
  callback?: (...args: any[]) => any;
  enabled?: boolean;
  event?: keyof HTMLElementEventMap; // must be user interactions
  helperId: string;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
  preventScroll?: boolean;
  targetId: string;
};

export const MobileKeyboardOpener = (props: MobileKeyboardOpenerProps) => {
  const { inputProps, ...options } = props;
  const setOptions = useMobileKeyboardOpener(options);
  useEffect(
    () =>
      setOptions((opt) =>
        !!options.targetId
          ? { ...opt, ...options, focusOnInit: true }
          : { ...opt, ...options, targetId: inputProps?.id || 'hidden_input' },
      ),
    [props],
  );

  return (
    <input
      id="hidden_input"
      {...inputProps}
      className={`hidden_input ${inputProps?.className || ''}`}
    />
  );
};
