
export function articlePlusHeaders(item, value) {
  return (
    item.header ||
    item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    item.content.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

export function sortItems(a, b, value) {
  const aLower = a.name.toLowerCase()
  const bLower = b.name.toLowerCase()
  const valueLower = value.toLowerCase()
  const queryPosA = aLower.indexOf(valueLower)
  const queryPosB = bLower.indexOf(valueLower)
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB
  }
  return aLower < bLower ? -1 : 1
}

export function fakeRequest(value, cb) {
  setTimeout(cb, 500, value ?
    getItems().filter(item => articlePlusHeaders(item, value)) :
    getItems()
  )
}

export function getItems() {
  return [
    { header: 'News' },
    { id: '0', name: 'Cocaine', content: '' },
    { id: '1', name: 'Codeine', content: '' }
  ]
}

