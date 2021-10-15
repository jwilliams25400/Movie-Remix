export const getSavedMovieIds = () => {
  const saveTitle = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : [];

  return saveTitle;
};

export const saveMovieIds = (titleArr) => {
  if (titleArr.length) {
    localStorage.setItem('save_movie', JSON.stringify(titleArr));
  } else {
    localStorage.removeItem('save_movie');
  }
};

export const removeMovieId = (title) => {
  const saveTitle = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : null;

  if (!saveTitle) {
    return false;
  }

  const updatedSaveTitle= saveTitle?.filter((saveTitle) => saveTitle !== title);
  localStorage.setItem('save_movie', JSON.stringify(updatedSaveTitle));

  return true;
};
