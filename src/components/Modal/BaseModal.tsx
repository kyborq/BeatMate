import React from 'react';
import { Modal, Animated } from 'react-native';
import { useGestures } from '../../hooks/useGestures';

type Props = {
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const BaseModal: React.FC<Props> = ({ visible, children, onClose }) => {
  const { panResponder } = useGestures({
    onSwipeDown: () => {
      onClose && onClose();
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </Animated.View>
    </Modal>
  );
};
