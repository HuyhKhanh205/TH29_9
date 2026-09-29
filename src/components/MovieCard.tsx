
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Câu 3a:
export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTitle = layout === 'tile';

  return (
    // Câu 3c:
    // Câu 4c:
    <TouchableOpacity
      style={[styles.card, isTitle ? styles.cardTile : styles.cardRow]}
      activeOpacity={0.7}
      onPress={() => onSelect(movie.id)}>
      {/* Câu 4b:*/}
      <View style={[isTitle && styles.posterWrap]}>
        {/* Câu 3b:*/}
        <Image
          source={{ uri: movie.poster }}
          style={isTitle ? styles.posterTitle : styles.posterRow}
          contentFit="cover"
        />
        {/* Câu 4b:*/}
        {isTitle && <Text style={styles.ratingBadge}>⭐ {movie.rating.toFixed(1)}</Text>}
      </View>

      <View style={styles.info}>
        {/* Câu 3b:*/}
        {/* Câu 4b:*/}
        <Text style={styles.title} numberOfLines={isTitle ? 1 : 2}>
          {movie.title}
        </Text>
        {/* Câu 4a:*/}
        {!isTitle && (
          <>
            <Text style={styles.meta}>Thể loại: {movie.genre}</Text>
            <Text style={styles.meta}>Năm: {movie.year}</Text>
            <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}
        <Text style={styles.meta}>{movie.isShowing ? ' Đang chiếu' : ' Ngừng chiếu'}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Câu 3d
export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: { padding: 10,
     backgroundColor: '#eee',
      gap: 10 },
  cardRow: { flexDirection: 'row' },
  cardTile: { flex: 1 },
  // Câu 4a:
  posterRow: { width: 70,
     height: 100 },
  // Câu 4b:
  posterTitle: { width: '100%',
   aspectRatio: 2 / 3 },
  posterWrap: { width: '100%' },
  ratingBadge: { position: 'absolute',
  top: 5,
  left: 5,
  padding: 3,
  color: 'white',
  backgroundColor: 'gray' },
  info: { flex: 1 },
  title: { fontSize: 16,
  fontWeight: 'bold' },
  meta: { color: 'gray' },
  rating: { color: 'orange' },
});
