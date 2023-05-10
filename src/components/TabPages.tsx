import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  pages: string[];
  current: string;
};

export const TabPages: React.FC<Props> = ({ pages, current }) => {
  return (
    <View style={styles.content}>
      {pages.map(page => {
        return (
          <TouchableOpacity key={uuidv4()} onPress={() => {}}>
            <Text
              style={[styles.title, current === page && { color: '#000000' }]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  title: {
    color: '#c7c7c7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
