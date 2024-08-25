import { useCallback } from 'react';
import useValue from '~/hooks/useValue';

export interface UseOpenProps<T extends boolean>
  extends ControllableValue<'value', boolean> {
  allowNull?: T;
}

const useOpen = <T extends boolean = false>(props: UseOpenProps<T>) => {
  const [value, onChange] = useValue(props, 'value');

  const { allowNull } = props;

  const onOpen = useCallback(() => {
    onChange(true);
  }, []);

  const onClose = useCallback(() => {
    onChange(false);
  }, []);

  return {
    value: (allowNull && value === undefined ? null : value) as T extends false
      ? boolean
      : boolean | null,
    onOpen,
    onClose,
  };
};

export default useOpen;

declare namespace useOpen {
  type Props<T extends boolean = false> = Required<UseOpenProps<T>>;
}
