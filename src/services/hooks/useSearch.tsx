import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { api } from '../api';

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
  };
  favorite: boolean;
}

interface SearchProviderProps {
  children: ReactNode
}

interface SearchContextData {
  items: ResponseItem[];
  totalItems: number;
  textSearch: string;
  searchBooks: (page: number, string: string) => void;
  changePage: (page: number) => void;
  setFavorite: (item: ResponseItem) => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({children}: SearchProviderProps) {
  const [items, setItems] = useState<ResponseItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [textSearch, setTextSearch] = useState('');
  const [favorites, setFavorites] = useState<ResponseItem[]>([]);

  useEffect(() => {
    setItems([]);
    setTotalItems(0);
  }, []);

  async function searchBooks(page: number, text: string) {
    const { data } = await api.get('books/v1/volumes', {
      params: {
        q: text,
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

    setItems(books);
    setTotalItems(data.totalItems);
    setTextSearch(text);
    favoriteList();
  }

  async function changePage(page: number) {
    const index = page * 10 - 10;
    const { data } = await api.get('books/v1/volumes', {
      params: {
        q: textSearch,
        startIndex: index
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

    setItems(books);
  }

  function setFavorite(item: ResponseItem) {
    if (item.favorite)
      setFavorites(favorites.filter(favorite => favorite.id !== item.id));
    else
      setFavorites([...favorites, item]);

    favoriteList();
  }

  function favoriteList() {
    const tempItems = items.slice();

    if (favorites && favorites.length > 0) {
      tempItems.forEach(item => {
        if (favorites.some(favorite => favorite.id === item.id))
          item.favorite = true;
      })
  
      setItems(tempItems);
    }
  }

  return (
    <SearchContext.Provider value={{
      items,
      totalItems,
      textSearch,
      searchBooks,
      changePage,
      setFavorite
    }}>
      { children }
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  
  return context;
}