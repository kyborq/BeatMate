import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export const Touchable: React.FC<Props> = ({
  children,
  contentStyle,
  style,
  onPress,
}) => {
  return (
    <View style={[styles.root, style]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});
