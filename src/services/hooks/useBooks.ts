import { useQuery } from 'react-query';

import { api } from "../api";

type Book = {
  title: string;
  description: string;
  publishedDate: Date;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  }
}

type ResponseItem = {
  id: string;
  volumeInfo: Book;
  searchInfo: {
    textSnippet: string;
  }
}

interface GetBooksResponse {
  totalItems: number;
  books: ResponseItem[];
}

export async function getBooks(page: number, search: string): Promise<GetBooksResponse> {

  if (!search) {
    return {
      totalItems: 0,
      books: []
    };
  }

  const { data } = await api.get('books/v1/volumes', {
    params: {
      q: search,
      startIndex: page - 1
    }
  });

  const books: ResponseItem[] = data.items.map(responseItem => {
    return {
      id: responseItem.id,
      volumeInfo: {
        title: responseItem.volumeInfo?.title,
        description: responseItem.volumeInfo?.description,
        publishedDate: responseItem.volumeInfo?.publishedDate,
        imageLinks: {
          smallThumbnail: responseItem.volumeInfo?.imageLinks?.smallThumbnail,
          thumbnail: responseItem.volumeInfo?.imageLinks?.thumbnail
        }
      },
      searchInfo: {
        textSnippet: responseItem.searchInfo?.textSnippet
      }
    }
  });

  return {
    totalItems: data.totalItems,
    books
  };
}

export function useBooks(page: number, search: string) {
  return useQuery(['books', page], () => getBooks(page, search), {
    staleTime: 1000 * 60 * 10, //10 minutos
  });
}