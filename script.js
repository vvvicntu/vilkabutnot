const modal=document.getElementById('lightbox');
document.querySelectorAll('.photo').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');modal.querySelector('img').src=source.src;modal.querySelector('img').alt=source.alt;modal.querySelector('p').textContent=button.dataset.caption;modal.showModal()}));
modal.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close()}});
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()})));
