import React from 'react'

import {addItemToFavorites, removeItemFromFavorites} from './favorites-utils'

test('Add favorite', () => {
  const newFavs = addItemToFavorites([321], 123)
  expect(newFavs).toEqual(expect.arrayContaining([321, 123]))
})

test('Remove favirite', () => {
  const newFavs = removeItemFromFavorites([321, 123, 432], 123)
  expect(newFavs).not.toEqual(expect.arrayContaining([123]))
})