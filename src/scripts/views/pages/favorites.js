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

    document
      .getElementById('restaurant-deck')
      .replaceChildren(...createRestaurantDeck(restaurants))
  }
}

export default Favorites
