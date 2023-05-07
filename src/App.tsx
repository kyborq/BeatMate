import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IconButton} from './components/IconButton';
import {TextField} from './components/Form/TextField';
import {Chip} from './components/Chip';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Soundeer</Text>
        <IconButton
          icon="user"
          foregroundColor="#000000"
          backgroundColor="#e2e2e2"
        />
      </View>
      <View style={styles.search}>
        <TextField
          icon="search"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>Музыкотека</Text>
      </View>

      <View style={styles.filtersBase}>
        <ScrollView
          contentContainerStyle={styles.filtersContainer}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <View style={styles.filters}>
            {!!searchQuery && (
              <Chip label={`Поиск: ${searchQuery}`} icon="close" />
            )}
            <Chip label="Сортировка: По дате" icon="dropDown" />
            <Chip label="Фильтры: Нет" icon="dropDown" />
            <Chip label="Папки: Все" icon="dropDown" />
          </View>
        </ScrollView>
      </View>

      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              gap: 64,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://media.tenor.com/J3mNIbj6A4wAAAAd/empty-shelves-john-travolta.gif',
              }}
              style={{
                width: 256,
                height: 256,
              }}
            />
            <Text style={{fontSize: 16, color: '#c7c7c7'}}>Пустовато...</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  search: {
    paddingHorizontal: 32,
  },
  filtersContainer: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filtersBase: {},
});

export default App;
