export default function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  const whitespace = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const formattingNodes = []
  while (whitespace.nextNode()) {
    if (/^[\t\r\n ]+$/.test(whitespace.currentNode.textContent) &&
        /[\r\n]/.test(whitespace.currentNode.textContent)) {
      formattingNodes.push(whitespace.currentNode)
    }
  }
  formattingNodes.forEach((node) => node.remove())
  document.querySelectorAll('p, h1, h2, h3, h4, li, blockquote').forEach((element) => {
    element.append('\n\n')
  })
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  return (document.body.textContent || '')
    .replace(/\n[\t ]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

