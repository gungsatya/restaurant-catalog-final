import { createRestaurantDeck } from '../templates/restaurant-deck'

const FavoriteRestaurantSearchPresenter = {
  init({
    keywordInputElement,
    collectionContainerElement,
    favoriteRestaurantModel
  }) {
    this._keywordInputElement = keywordInputElement
    this._collectionContainerElement = collectionContainerElement
    this._model = favoriteRestaurantModel
    this._latestKeyword = ''

    this._listenToKeywordInput()
    this._searchByKeyword('')
    return this
  },

  get latestKeyword() {
    return this._latestKeyword
  },

  _listenToKeywordInput() {
    this._keywordInputElement.addEventListener('change', async (event) => {
      await this._searchByKeyword(event.target.value)
    })
  },

  async _searchByKeyword(keyword) {
    this._latestKeyword = keyword
    let restaurants = []
    if (this._latestKeyword.length > 0) {
      restaurants = await this._model.getAllRestaurantByKeyword(this._latestKeyword)
    } else {
      restaurants = await this._model.getAllRestaurant()
    }

    this.renderRestaurantDeck(restaurants)
  },

  renderRestaurantDeck(restaurants = []) {
    if (restaurants.length > 0) {
      this._collectionContainerElement.style = null
      this._collectionContainerElement
        .replaceChildren(...createRestaurantDeck(restaurants))
    } else {
      this._collectionContainerElement.style = 'grid-template-columns: 1fr;'
      this._collectionContainerElement.innerHTML = '<p style="text-align: center" id="have-no-favorites">You have no favorite restaurants yet</p>'
    }
  }
}

export default FavoriteRestaurantSearchPresenter
