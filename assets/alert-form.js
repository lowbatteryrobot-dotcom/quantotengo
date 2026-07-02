/* QuantoTengo — gestore condiviso del form "Avvisami" (footer).
   Invio AJAX verso FormSubmit, senza lasciare la pagina.
   Il tracking di 'alert_form_submit' resta negli script di pagina;
   qui tracciamo solo successo/errore per evitare eventi doppi. */
(function(){
  function qtTrack(name, data){
    try {
      if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data || {});
    } catch(e) {}
  }

  function setHiddenFormValue(form, name, value){
    var input = form.querySelector('input[name="' + name + '"]');
    if(!input){
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }

  function submitAlertForm(form){
    var action = (form.getAttribute('action') || '').trim();
    var isPlaceholder = !action || action.indexOf('FORM_ENDPOINT') !== -1;
    var usesFormSubmit = action.indexOf('formsubmit.co') !== -1;
    var note = form.querySelector('.alert-form-note');
    var btn = form.querySelector('button[type="submit"]');
    var originalBtn = btn ? btn.textContent : '';

    form.classList.remove('is-success', 'is-error');

    if(isPlaceholder){
      form.classList.add('is-error');
      if(note) note.textContent = "Modulo non ancora collegato: configura l'endpoint del provider statico per attivare l'invio.";
      return;
    }

    setHiddenFormValue(form, 'source_path', window.location.pathname);
    setHiddenFormValue(form, 'source_url', window.location.href);
    setHiddenFormValue(form, 'form_name', form.getAttribute('data-form-name') || 'vinted_fee_alert');

    if(!window.fetch || !window.FormData){
      HTMLFormElement.prototype.submit.call(form);
      return;
    }

    if(btn){ btn.disabled = true; btn.textContent = 'Invio…'; }
    if(note) note.textContent = 'Invio in corso…';

    fetch(action, {
      method: (form.getAttribute('method') || 'POST').toUpperCase(),
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(res){
      if(!res.ok) throw new Error('Form endpoint error');
      form.reset();
      form.classList.add('is-success');
      if(note) note.textContent = form.getAttribute('data-success-msg') || 'Grazie! Ti avviseremo solo se cambiano commissioni o Protezione Acquisti.';
      qtTrack('alert_form_success', { source_path: window.location.pathname });
    }).catch(function(){
      form.classList.add('is-error');
      if(note) note.textContent = usesFormSubmit
        ? "Invio non riuscito. Se è il primo test, controlla ciao@quantotengo.it e conferma FormSubmit; poi riprova."
        : "Invio non riuscito. Controlla l'endpoint del form e riprova.";
      qtTrack('alert_form_error', { source_path: window.location.pathname });
    }).finally(function(){
      if(btn){ btn.disabled = false; btn.textContent = originalBtn || 'Avvisami'; }
    });
  }

  document.addEventListener('submit', function(e){
    var form = e.target.closest('[data-alert-form]');
    if (!form) return;
    /* engine.js gestisce già il form sulle pagine calcolatore: evita doppio invio */
    if (form.hasAttribute('data-alert-engine')) return;
    e.preventDefault();
    submitAlertForm(form);
  });
})();
