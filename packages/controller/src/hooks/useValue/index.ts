import { useMemo } from 'react';
import { useControllableValue } from 'ahooks';

const useValue = <
  T,
  K extends keyof T & string,
  D extends T[K] | undefined = undefined
>(
  props: T,
  key: K,
  defaultValue?: D
) => {
  const options = useMemo(() => {
    const capitalizeKey = key.slice(0, 1).toLocaleUpperCase() + key.slice(1);
    const trigger = key === 'value' ? 'onChange' : 'onChange' + capitalizeKey;
    const defaultValuePropName = 'default' + capitalizeKey;
    return {
      defaultValue,
      defaultValuePropName,
      valuePropName: key,
      trigger,
    };
  }, [key, defaultValue]);

  return useControllableValue<
    D extends undefined ? T[K] | undefined : Required<T>[K]
  >(props as any, options as any);
};

export default useValue;

declare namespace useValue {
  type ControllableValue<T extends string, V> = {
    [x in T]?: V;
  } & {
    [x in `default${Capitalize<T>}`]?: V;
  } & {
    [x in T extends 'value' ? 'onChange' : `onChange${Capitalize<T>}`]?: (
      value: V
    ) => void;
  };
}
