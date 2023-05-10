import { useRef, useState } from 'react';
import { PanResponder } from 'react-native';

type Props = {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};

export const useGestures = ({ onSwipeDown, onSwipeUp }: Props) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleSwipeUp = () => {
    onSwipeUp && onSwipeUp();
  };

  const handleSwipeDown = () => {
    onSwipeDown && onSwipeDown();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onMoveShouldSetPanResponder: () => {
        return false;
      },
      onPanResponderMove: (_, gestureState) => {
        setOffsetY(gestureState.vy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          handleSwipeUp();
        } else {
          handleSwipeDown();
        }
      },
    }),
  ).current;

  return { panResponder, offsetY };
};
