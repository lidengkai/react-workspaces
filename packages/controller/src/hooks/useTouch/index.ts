import { TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface UseTouchProps {
  type: 'x' | 'y';
  min?: number;
  max?: number;
}

const useTouch = (props: UseTouchProps) => {
  const { type, min = -Infinity, max = Infinity } = props;
  const pagePositionKey = type === 'x' ? 'pageX' : 'pageY';
  const [translate, setTranslate] = useState<number>(0);
  const dataRef = useRef<{
    listen: boolean;
    min: number;
    max: number;
    translate: number;
    start: number;
    move: number;
    paths: Array<{ time: number; pagePosition: number }>;
  }>({
    listen: false,
    min,
    max,
    translate,
    start: 0,
    move: 0,
    paths: [],
  });
  const updateState = useCallback(() => {
    setTranslate(dataRef.current.translate);
  }, []);
  useEffect(() => {
    dataRef.current.min = min;
    dataRef.current.max = max;
    if (min > max) {
      dataRef.current.translate = 0;
    } else {
      const { translate } = dataRef.current;
      if (translate < min) {
        dataRef.current.translate = min;
      } else if (translate > max) {
        dataRef.current.translate = max;
      }
    }
    updateState();
  }, [min, max]);
  const onTouchStart = useCallback((e: TouchEvent) => {
    const { min, max } = dataRef.current;
    if (min < max) {
      const pagePosition = e.touches[0][pagePositionKey];
      dataRef.current.start = pagePosition;
      dataRef.current.move = dataRef.current.translate;
      dataRef.current.paths = [
        {
          time: Date.now(),
          pagePosition,
        },
      ];
      dataRef.current.listen = true;
    } else {
      dataRef.current.listen = false;
    }
  }, []);
  const onTouchMove = useCallback((e: TouchEvent) => {
    const { listen, min, max } = dataRef.current;
    if (listen) {
      const pagePosition = e.touches[0][pagePositionKey];
      const move = dataRef.current.move + pagePosition - dataRef.current.start;
      const moveResult = move < min ? min : move > max ? max : move;
      dataRef.current.start = pagePosition;
      dataRef.current.move = moveResult;
      dataRef.current.translate = moveResult;
      dataRef.current.paths.push({
        time: Date.now(),
        pagePosition,
      });
      updateState();
    }
  }, []);
  const onTouchEnd = useCallback((e: TouchEvent) => {
    const { listen, min, max } = dataRef.current;
    if (listen) {
      const pagePosition = e.changedTouches[0][pagePositionKey];
      const now = Date.now();
      const beforeTime = now - 300;
      const beforePath = dataRef.current.paths.find(
        (item) => item.time > beforeTime
      );
      if (beforePath) {
        const time = now - beforePath.time;
        if (time > 50) {
          const speed = (pagePosition - beforePath.pagePosition) / time;
          const a = speed > 0 ? -0.002 : speed < 0 ? 0.002 : 0;
          const maxTime = a ? -speed / a : 0;
          if (maxTime) {
            autoTranslate(
              now,
              maxTime,
              dataRef.current.move,
              speed,
              a,
              min,
              max
            );
          }
        }
      }
    }
  }, []);
  const autoTranslate = useCallback(
    (
      beforeTime: number,
      maxTime: number,
      start: number,
      speed: number,
      a: number,
      min: number,
      max: number
    ) => {
      requestAnimationFrame(() => {
        const now = Date.now();
        const time = now - beforeTime;
        if (time > maxTime) {
          const move = start + speed * maxTime + (a * maxTime ** 2) / 2;
          dataRef.current.translate =
            move < min ? min : move > max ? max : move;
        } else {
          const move = start + speed * time + (a * time ** 2) / 2;
          if (move < min) {
            dataRef.current.translate = min;
          } else if (move > max) {
            dataRef.current.translate = max;
          } else {
            dataRef.current.translate = move;
            autoTranslate(beforeTime, maxTime, start, speed, a, min, max);
          }
        }
        updateState();
      });
    },
    []
  );
  return {
    translate,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useTouch;

declare namespace useTouch {
  type Props = Required<UseTouchProps>;
}
