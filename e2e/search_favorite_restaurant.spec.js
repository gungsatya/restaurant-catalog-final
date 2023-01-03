const assert = require('assert')

Feature('Search favorite restaurant')
Before(async ({ I }) => {
  I.amOnPage('#/favorites')
  I.waitToHide('#loading')
  I.seeElement('#have-no-favorites')

  for (let i = 1; i <= 3; i++) {
    I.amOnPage('/')
    I.waitToHide('#loading')
    I.seeElement('restaurant-elm')
    const restaurantTitleLinkLocation = locate('restaurant-elm a').at(i)
    I.seeElement(restaurantTitleLinkLocation)
    I.click(restaurantTitleLinkLocation)
    I.waitToHide('#loading')
    I.seeElement('button#add-favorite')
    I.wait(1)
    I.click('button#add-favorite')
  }
  I.amOnPage('#/favorites')
  I.waitToHide('#loading')
})

Scenario('keyword found in collection', async ({ I }) => {
  const numberOfElement = await I.grabNumberOfVisibleElements('restaurant-elm')
  const names = []
  for (let i = 1; i <= numberOfElement; i++) {
    const restaurantTitleLocation = locate('restaurant-elm a').at(i)
    names.push(await I.grabTextFrom(restaurantTitleLocation))
  }
  const searchKeyword = names[0].substring(1, 3)
  const matchingRestaurants = names.filter((name) => name.indexOf(searchKeyword) !== -1)

  I.seeElement('#search-favorite')
  I.fillField('#search-favorite', searchKeyword)
  I.pressKey('Enter')
  I.wait(1)
  const numberOfResult = await I.grabNumberOfVisibleElements('restaurant-elm')
  assert.strictEqual(matchingRestaurants.length, numberOfResult)

  for (const name of matchingRestaurants) {
    const index = matchingRestaurants.indexOf(name)
    const visibleName = await I.grabTextFrom(locate('restaurant-elm a').at(index + 1))
    assert.strictEqual(name, visibleName)
  }
})

Scenario('keyword not found in collection', async ({ I }) => {
  const numberOfElement = await I.grabNumberOfVisibleElements('restaurant-elm')
  const names = []
  for (let i = 1; i <= numberOfElement; i++) {
    const restaurantTitleLocation = locate('restaurant-elm a').at(i)
    names.push(await I.grabTextFrom(restaurantTitleLocation))
  }
  const searchKeyword = 'Ini cuma asal'
  const matchingRestaurants = names.filter((name) => name.indexOf(searchKeyword) !== -1)
  assert.strictEqual(matchingRestaurants.length, 0)
  I.seeElement('#search-favorite')
  I.fillField('#search-favorite', searchKeyword)
  I.pressKey('Enter')
  I.wait(1)
  const numberOfResult = await I.grabNumberOfVisibleElements('restaurant-elm')
  assert.strictEqual(numberOfResult, 0)
})
