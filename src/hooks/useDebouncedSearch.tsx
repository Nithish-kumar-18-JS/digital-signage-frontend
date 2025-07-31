import { debounce } from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMediaList } from '@/lib/redux/slice/mediaSlice'; // adjust the import as needed
import mediaApi from '@/app/apis/media';
const useDebouncedSearch = (token: string,type?: string) => {
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
        const {searchMedia} = mediaApi()
      const data = await searchMedia(token, value,type);
      dispatch(setMediaList(data));
    }, 500), // debounce delay in ms
    [token, dispatch]
  );

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return { handleSearch };
};

export default useDebouncedSearch;
