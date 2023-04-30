import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '34375479-0be71e9ee085bc26f1477b7fd';
const defaultSettingsUrl =
  'image_type=photo&orientation=horizontal&per_page=12';

export const getPictures = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${KEY}&${defaultSettingsUrl}`
  );
  return response.data;
};
