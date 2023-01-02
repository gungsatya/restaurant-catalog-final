import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/restaurant-detail'
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb'

const FavoriteInitiator = {
  async init({
    favoriteButtonContainer,
    restaurant
  }) {
    this._favoriteButtonContainer = favoriteButtonContainer
    this._restaurant = restaurant

    await this._renderButton()
  },

  async _renderButton() {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderFavorited()
    } else {
      this._renderFavorite()
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id)
    return !!restaurant
  },

  _renderFavorite() {
    this._favoriteButtonContainer.innerHTML = createLikeButtonTemplate()

    const favoriteButton = document.querySelector('#add-favorite')
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant)
      await this._renderButton()
    })
  },

  _renderFavorited() {
    this._favoriteButtonContainer.innerHTML = createLikedButtonTemplate()

    const favoriteButton = document.querySelector('#remove-favorite')
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id)
      await this._renderButton()
    })
  }
}

export default FavoriteInitiator
