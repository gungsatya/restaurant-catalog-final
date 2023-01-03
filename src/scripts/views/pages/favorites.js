import { createRestaurantDeck } from '../templates/restaurant-deck'
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'

const Favorites = {
  async render() {
    return `
    <section id="restaurants">
      <div class="container">
        <h2 class="title">Your Favorite Restaurant</h2>
        <div class="card-deck" id="restaurant-deck"></div>
      </div>
    </section>`
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant()
    const restaurantDeckElement = document
      .getElementById('restaurant-deck')

    if (restaurants.length > 0) {
      restaurantDeckElement.style = null
      restaurantDeckElement
        .replaceChildren(...createRestaurantDeck(restaurants))
    } else {
      restaurantDeckElement.style = 'grid-template-columns: 1fr;'
      restaurantDeckElement.innerHTML = '<p style="text-align: center" id="have-no-favorites">You have no favorite restaurants yet</p>'
    }
  }
}

export default Favorites
