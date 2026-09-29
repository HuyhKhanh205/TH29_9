import type { Movie } from '@/components/MovieCard';

export const MOVIES_API_URL = 'https://69831ac29c3efeb892a46b38.mockapi.io/books';

// Câu 2:
export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(MOVIES_API_URL);
  if (!res.ok) {
    throw new Error(`Lỗi tải dữ liệu (HTTP ${res.status})`);
  }
  return res.json();
}
