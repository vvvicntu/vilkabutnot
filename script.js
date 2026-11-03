// Открытие фотографий
const modal = document.getElementById('lightbox');

if (modal) {
  const modalImage = modal.querySelector('img');
  const modalCaption = modal.querySelector('p');
  const closeButton = modal.querySelector('.close');

  document.querySelectorAll('.photo').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');

      if (!source) return;

      modalImage.src = source.currentSrc || source.src;
      modalImage.alt = source.alt;
      modalCaption.textContent = button.dataset.caption || '';

      modal.showModal();
    });
  });

  closeButton.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', event => {
    if (event.target !== modal) return;

    const rect = modal.getBoundingClientRect();

    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (outside) modal.close();
  });
}

// Одновременно воспроизводится только одно видео
const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

// Цветочки размещены непосредственно в index.html.
// Автоматической замены текста и стрелок больше нет.
