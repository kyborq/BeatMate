import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TabButton } from './TabButton';

type Props = {
  pages: string[];
  current: string;
  onSelect?: (value: string) => void;
};

export const TabPages: React.FC<Props> = ({ pages, current, onSelect }) => {
  return (
    <View style={styles.content}>
      <FlatList
        data={pages}
        renderItem={({ item }) => (
          <TabButton
            title={item}
            current={item === current}
            onPress={onSelect}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 12,
  },
});
