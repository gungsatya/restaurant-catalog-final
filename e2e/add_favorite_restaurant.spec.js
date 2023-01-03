const assert = require('assert')

Feature('Add Favorite Restaurant')

Before(({ I }) => {
  I.amOnPage('#/favorites')
})
Scenario('showing empty favorites restaurant', ({ I }) => {
  I.see('You have no favorite restaurants yet', '#have-no-favorites')
})

Scenario('adding one restaurant to favorites', async ({ I }) => {
  I.see('You have no favorite restaurants yet', '#have-no-favorites')

  I.amOnPage('/')
  I.waitToHide('#loading')
  I.seeElement('restaurant-elm')

  I.click(locate('restaurant-elm a').first())
  I.waitToHide('#loading')
  I.seeElement('.restaurant-details')
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-details h4')
  I.seeElement('button#add-favorite')
  I.wait(1)
  I.click('button#add-favorite')
  I.amOnPage('#/favorites')
  I.waitToHide('#loading')
  I.seeElement('restaurant-elm')
  const likedRestaurantTitle = await I.grabTextFrom(locate('restaurant-elm a').first())

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle)
})
