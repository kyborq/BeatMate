import React, { useState } from 'react';
import { View, Text, Modal, Button, Animated } from 'react-native';
import { useGestures } from '../../hooks/useGestures';
import { Progress } from '../Player/Progress';

type Props = {
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const BaseModal: React.FC<Props> = ({ visible, children, onClose }) => {
  const { panResponder, offsetY } = useGestures({
    onSwipeDown: () => {
      console.log('swiped down');
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
