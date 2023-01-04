const assert = require('assert')

Feature('Add Favorite Restaurant')

Before(({ I }) => {
  I.amOnPage('#/favorites')
  I.see('You have no favorite restaurants yet', '#have-no-favorites')
})

Scenario('show have no restaurants', ({ I }) => {
  I.seeElement('#have-no-favorites')
  I.dontSeeElement('restaurant-elm')
})

Scenario('adding one restaurant to favorites', async ({ I }) => {
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

Scenario('add-to-favorite button change to remove-from-favorite button after add restaurant to favorites', async ({ I }) => {
  I.amOnPage('/')
  I.waitToHide('#loading')
  I.seeElement('restaurant-elm')

  I.click(locate('restaurant-elm a').first())
  I.waitToHide('#loading')
  I.seeElement('.restaurant-details')
  I.dontSeeElement('button#remove-favorite')
  I.seeElement('button#add-favorite')
  I.wait(1)
  I.click('button#add-favorite')
  I.wait(1)
  I.seeElement('button#remove-favorite')
  I.dontSeeElement('button#add-favorite')
})
