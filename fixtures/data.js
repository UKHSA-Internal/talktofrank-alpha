
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
  setTimeout(cb, 200, value ?
    getItems().filter(item => articlePlusHeaders(item, value)) :
    getItems()
  )
}

export function getItems() {
  return [

    { id: '0', name: 'Cocaine', content: 'A powerful stimulant that is snorted as a powder (coke) or smoked from small rocks (crack)' },
    { id: '1', name: 'Codeine', content: 'Something to chill you out' },
    { id: '2', name: 'Fake cocaine (Methylphenidate)', content: 'A stimulant and is used to treat Attention Deficit Hyperactivity Disorder' },
  ]
}

