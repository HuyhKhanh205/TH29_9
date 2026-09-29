import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getMovies } from '@/api/movies';
import MovieCard, { Movie } from '@/components/MovieCard';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Câu 5a: 
  const [isTile, setIsTile] = useState(false);
  // Câu 5b:
  const layout = isTile ? 'tile' : 'row';
  const numColumns = isTile ? 2 : 1;
  // Câu 6a: 
  const [refreshing, setRefreshing] = useState(false);

  // Câu 2:
  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((e) => setError(e instanceof Error ? e.message : 'Đã có lỗi xảy ra'))
      .finally(() => setLoading(false));
  }, []);

  // Câu 6b:
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setMovies(await getMovies());
      setError(null);
    } catch (e) {
      Alert.alert('Lỗi', e instanceof Error ? e.message : 'Không thể làm mới danh sách');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Câu 3c:
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) {
        Alert.alert('Phim đã chọn', movie.title);
      }
    },
    [movies],
  );

  return (
    // Câu 1b:
    <SafeAreaView style={styles.container}>
      {/* Câu 1c:*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie App</Text>

        {/* Câu 5a:*/}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      <View style={styles.content}>
        {loading ? (
          // Câu 2c: 
          <ActivityIndicator size="large" style={styles.loading} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          // Câu 2: 
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            key={String(numColumns)}
            numColumns={numColumns}
            columnWrapperStyle={isTile ? styles.column : undefined}
            // Câu 6a:
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) =>
              isTile ? (
                <View style={styles.tileItem}>
                  <MovieCard movie={item} layout={layout} onSelect={handleSelect} />
                </View>
              ) : (
                <MovieCard movie={item} layout={layout} onSelect={handleSelect} />
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  error: {
    padding: 16,
    color: '#d00',
    textAlign: 'center',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 15,
  },
  column: {
    justifyContent: 'space-between',
  },
  tileItem: {
    width: '48%',
  },
});
