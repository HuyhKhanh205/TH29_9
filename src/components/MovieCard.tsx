
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
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f2f2f7',
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardTile: {
    flex: 1,
  },
  // Câu 4a:
  posterRow: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#d1d1d6',
  },
  posterTitle: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: '#d1d1d6',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
  },
  meta: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e0a800',
  },
  // Câu 4b:
  posterWrap: {
    width: '100%',
  },
  // Câu 4b:
  ratingBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: "gray"
  },
});
