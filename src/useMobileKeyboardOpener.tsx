import { useEffect, useState } from 'react';

export interface useMobileKeyboardOpenerOptions {
  callback?: (...args: any[]) => any;
  enabled?: (e: any) => boolean;
  event?: keyof HTMLElementEventMap; // must be user interactions
  focusOnInit?: boolean;
  helperId: string;
  preventScroll?: boolean;
  targetId: string;
}

export const useMobileKeyboardOpener = (
  options: useMobileKeyboardOpenerOptions,
) => {
  const defaultOptions = {
    callback: () => null,
    enabled: () => true,
    event: 'click',
    focusOnInit: false,
    preventScroll: false,
  };
  const [opt, setOptions] = useState({ ...defaultOptions, ...options });
  useEffect(() => setOptions(opt), [options]);

  useEffect(() => {
    const { callback, enabled, event, focusOnInit, helperId, preventScroll } =
      opt;

    const inputFocus = () => {
      try {
        const target = document.getElementById(opt.targetId) as HTMLElement;
        const style = window.getComputedStyle(target);
        const visibility = style?.getPropertyValue('visibility');
        if (visibility === 'hidden') target.style.visibility = 'visible'; // unhide the input
        target.focus({ preventScroll }); // focus on it so keyboard pops
        if (visibility === 'hidden') target.style.visibility = 'hidden'; // hide it again
        callback();
      } catch (e) {}
    };
    const handler = (e: any) => {
      if (enabled(e)) inputFocus();
    };

    if (focusOnInit) inputFocus();
    if (!!helperId) {
      document.getElementById(helperId)?.addEventListener(event, handler);

      return () => {
        document.getElementById(helperId)?.removeEventListener(event, handler);
      };
    }
  }, [opt]);

  return setOptions;
};

export default useMobileKeyboardOpener;
