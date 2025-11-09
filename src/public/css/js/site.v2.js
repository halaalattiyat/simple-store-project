document.addEventListener('DOMContentLoaded', function(){
  // Mobile search toggle
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
      const s = document.getElementById('searchForm');
      if (s) s.classList.toggle('d-none');
    });
  }

  // Quick view buttons (delegation)
  document.body.addEventListener('click', function(e){
    const target = e.target.closest('[data-quickview]');
    if (!target) return;
    e.preventDefault();
    const id = target.getAttribute('data-quickview');
    // fetch product data from /api/products/:id then populate modal
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(p => showQuickView(p))
      .catch(()=> alert('Unable to load product'));
  });

  function showQuickView(p) {
    // create modal markup
    const html = `
      <div class="modal fade show" style="display:block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body p-4">
              <div class="row">
                <div class="col-md-6"><img src="${p.image}" class="img-fluid rounded"></div>
                <div class="col-md-6">
                  <h4 class="fw-bold">${p.name}</h4>
                  <p class="text-muted small mb-2">${p.category}</p>
                  <h3 class="text-primary">$${p.price}</h3>
                  <p class="mt-3">${p.description || ''}</p>
                  <div class="mt-4">
                    <a href="/products/${p.id}" class="btn btn-outline-primary me-2">View details</a>
                    <form method="post" action="/api/orders" class="d-inline">
                      <input type="hidden" name="productId" value="${p.id}">
                      <input type="hidden" name="userId" value="u01">
                      <button class="btn btn-primary">Buy now</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    // close handler
    wrapper.querySelector('.btn-close').addEventListener('click', ()=> wrapper.remove() );
    wrapper.addEventListener('click', (ev) => {
      if (ev.target === wrapper) wrapper.remove();
    });
  }
});
