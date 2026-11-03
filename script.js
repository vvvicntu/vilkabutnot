// Просмотр фотографий
const modal = document.getElementById('lightbox');

document.querySelectorAll('.photo').forEach(button => {
  button.addEventListener('click', () => {
    const source = button.querySelector('img');

    modal.querySelector('img').src = source.src;
    modal.querySelector('img').alt = source.alt;
    modal.querySelector('p').textContent = button.dataset.caption;

    modal.showModal();
  });
});

modal.querySelector('.close').addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', event => {
  if (event.target !== modal) return;

  const rect = modal.getBoundingClientRect();

  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    modal.close();
  }
});

// Одновременно воспроизводится только одно видео
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

// Заменяем стрелки и звёздочку на цветочки
(() => {
  const namespace = 'http://www.w3.org/2000/svg';

  const flowerPath =
    'M50 8C67-3 83 17 69 34C94 26 108 49 88 62' +
    'C96 84 70 99 57 80C45 106 18 91 24 70' +
    'C-1 72-8 45 17 38C4 17 29 0 42 24' +
    'C42 16 45 11 50 8ZM50 40a11 11 0 1 0 0 22' +
    'a11 11 0 1 0 0-22Z';

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (
      !node.parentElement.closest('script, style, textarea') &&
      /[↗↘✳]/u.test(node.nodeValue)
    ) {
      textNodes.push(node);
    }
  }

  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    const insideStamp = Boolean(
      node.parentElement.closest('.postmark')
    );

    node.nodeValue.split(/([↗↘✳])/u).forEach(part => {
      if (!/^[↗↘✳]$/u.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const flower = document.createElementNS(namespace, 'svg');
      const size = insideStamp ? '24' : '18';

      flower.setAttribute('viewBox', '0 0 100 100');
      flower.setAttribute('width', size);
      flower.setAttribute('height', size);
      flower.setAttribute('aria-hidden', 'true');
      flower.setAttribute('focusable', 'false');

      flower.style.cssText = `
        display: inline-block;
        vertical-align: middle;
        flex-shrink: 0;
        overflow: visible;
        pointer-events: none;
      `;

      const path = document.createElementNS(namespace, 'path');

      path.setAttribute('d', flowerPath);
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('fill', 'currentColor');

      flower.append(path);
      fragment.append(flower);
    });

    node.replaceWith(fragment);
  });
})();
