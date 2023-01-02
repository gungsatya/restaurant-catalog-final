import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter'

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.getElementById('favorite-button-container'),
    restaurant
  })
}

export { createFavoriteButtonPresenterWithRestaurant }
