export default function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('p, h1, h2, h3, h4, li, blockquote').forEach((element) => {
    element.append('\n\n')
  })
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  return (document.body.textContent || '').trim()
}

