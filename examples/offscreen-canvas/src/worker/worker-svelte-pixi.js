// @ts-nocheck
import PixiApp from './PixiApp.svelte'

self.onmessage = async ({ data }) => {
  const { width, height, resolution, view } = data

  new PixiApp({
    target: document.createElement('div'),
    props: {
      width,
      height,
      resolution,
      view,
    },
  })
}

/* DISREGARD THIS */
var document = (self.document = {
  parentNode: null,
  nodeType: 9,
  toString: function () {
    return 'FakeDocument'
  },
})
var window = (self.window = self)
var fakeElement = Object.create(document)
fakeElement.insertBefore = function (child) {
  this.childNodes = [child]
}
fakeElement.nodeType = 1
fakeElement.toString = function () {
  return 'FakeElement'
}
fakeElement.parentNode =
  fakeElement.firstChild =
  fakeElement.lastChild =
    fakeElement
fakeElement.ownerDocument = document

document.head = document.body = fakeElement
document.ownerDocument = document.documentElement = document
document.getElementById = document.createElement = function () {
  return fakeElement
}
document.createDocumentFragment = function () {
  return this
}
document.getElementsByTagName = document.getElementsByClassName = function () {
  return [fakeElement]
}
document.getAttribute =
  document.setAttribute =
  document.removeChild =
  document.addEventListener =
  document.removeEventListener =
    function () {
      return null
    }
document.cloneNode = document.appendChild = function () {
  return this
}
document.appendChild = function (child) {
  return child
}
document.childNodes = []
document.implementation = {
  createHTMLDocument: function () {
    return document
  },
}
document.dispatchEvent = () => {}
document.createComment = () => document.createElement('comment')
document.createTextNode = () => document.createElement('text')
document.querySelectorAll = () => {
  return []
}

globalThis.HTMLElement = class {}
