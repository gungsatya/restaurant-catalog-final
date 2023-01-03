import {
  createAddToFavoritesButtonTemplate,
  createRemoveFromFavoritesButtonTemplate
} from '../templates/restaurant-detail'

const FavoriteButtonPresenter = {
  async init({
    favoriteButtonContainer,
    favoriteRestaurantModel: FavoriteRestaurantIdb,
    restaurant
  }) {
    this._favoriteButtonContainer = favoriteButtonContainer
    this._restaurant = restaurant
    this._favoriteRestaurantIdb = FavoriteRestaurantIdb

    await this._renderButton()
  },

  async _renderButton() {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderRemoveFromFavoriteButton()
    } else {
      this._renderAddToFavoriteButton()
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurantIdb.getRestaurant(id)
    return !!restaurant
  },

  _renderAddToFavoriteButton() {
    this._favoriteButtonContainer.innerHTML = createAddToFavoritesButtonTemplate()

    const favoriteButton = document.querySelector('#add-favorite')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurantIdb.putRestaurant(this._restaurant)
      await this._renderButton()
    })
  },

  _renderRemoveFromFavoriteButton() {
    this._favoriteButtonContainer.innerHTML = createRemoveFromFavoritesButtonTemplate()

    const favoriteButton = document.querySelector('#remove-favorite')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurantIdb.deleteRestaurant(this._restaurant.id)
      await this._renderButton()
    })
  }
}

export default FavoriteButtonPresenter
