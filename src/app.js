/* =========================================================
   VIDAPET · APP.JS
   Capa de UI: mapea los formularios/botones/tablas del HTML
   a los métodos de VidaPetStore (store.js) y renderiza el DOM.
   No contiene lógica de persistencia: eso vive en store.js.
   ========================================================= */

import { VidaPetStore } from './store.js';
import { t, tn, applyI18n, setCurrentLang, getCurrentLang } from './i18n.js';

const db = new VidaPetStore('vidapet');

/* Preferencias de UI que no son datos de negocio (tema, mascota
   activa, notificaciones, idioma) se guardan aparte, fuera del store de datos. */
const UI_KEY = 'vidapet_ui_prefs';
function loadUiPrefs(){
  try{ 
    return Object.assign({ theme:'light', notificaciones:true, selectedPetId:null, lang:'es' }, JSON.parse(localStorage.getItem(UI_KEY)) || {}); 
  }
  catch(e){ 
    return { theme:'light', notificaciones:true, selectedPetId:null, lang:'es' }; 
  }
}
function saveUiPrefs(){ localStorage.setItem(UI_KEY, JSON.stringify(ui)); }
let ui = loadUiPrefs();

/* Meses/días de la semana ahora viven en el diccionario de i18n.js
   y se leen en caliente según el idioma activo (ver MESES()/DOWS() abajo),
   en vez de una constante fija en español. */
function MESES(){ return t('months'); }
function DOWS(){ return t('dows'); }

/* ---------------------------------------------------------
   1) NAVEGACIÓN SPA (sin recarga de página)
   --------------------------------------------------------- */
function goTo(viewName){
  document.querySelectorAll('.vp-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewName).classList.add('active');
  document.querySelectorAll('.vp-nav-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.target === viewName);
  });

  if(viewName === 'mascotas') renderMascotas();
  if(viewName === 'agenda') renderAgenda();
  if(viewName === 'add-servicio') renderServicios();
  if(viewName === 'historial') renderHistorial();
}
document.querySelectorAll('.vp-nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> goTo(btn.dataset.target));
});

window.addEventListener('DOMContentLoaded', ()=>{
  applyTheme(ui.theme);
  document.getElementById('darkSwitch').checked = (ui.theme === 'dark');
  document.getElementById('notifSwitch').checked = ui.notificaciones;

  // Idioma: fijar el idioma guardado ANTES de traducir el DOM estático,
  // y reflejarlo en el <select>. Antes esto solo tocaba el menú inferior;
  // applyI18n() ahora cubre toda la interfaz estática de una sola pasada.
  setCurrentLang(ui.lang);
  applyI18n();
  const langSelect = document.getElementById('langSelect');
  if(langSelect) langSelect.value = getCurrentLang();

  if(!ui.selectedPetId){
    const primera = db.getMascotas()[0];
    if(primera) ui.selectedPetId = primera.id;
  }

  setTimeout(()=>{
    document.getElementById('view-splash').classList.remove('active');
    goTo('mascotas');
  }, 2000);
});

/* ---------------------------------------------------------
   2) TOAST, THEME E IDIOMA
   --------------------------------------------------------- */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById('vpToast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2200);
}
function applyTheme(theme){ document.documentElement.setAttribute('data-bs-theme', theme); ui.theme = theme; }
function toggleDarkMode(isDark){ applyTheme(isDark?'dark':'light'); saveUiPrefs(); showToast(isDark?t('toastDark'):t('toastLight')); }
function toggleNotificaciones(checked){ ui.notificaciones = checked; saveUiPrefs(); showToast(checked?t('toastNotifOn'):t('toastNotifOff')); }
function modalOf(id){ return bootstrap.Modal.getOrCreateInstance(document.getElementById(id)); }

/* ---------------------------------------------------------
   CAMBIO DE IDIOMA
   Antes: solo tocaba los 5 botones del menú inferior, así que
   el resto de pantallas seguía en español y, peor aún, cada
   re-render (goTo) reescribía texto español "a fuego" en el DOM.
   Ahora: 1) fija el idioma activo en i18n.js, 2) re-traduce TODO
   el HTML estático marcado con data-i18n, y 3) vuelve a renderizar
   la vista actualmente visible para regenerar también los textos
   dinámicos (estados vacíos, listas, catálogo de servicios...).
   --------------------------------------------------------- */
function changeLanguage(lang, showNotif = true) {
  setCurrentLang(lang);
  ui.lang = getCurrentLang();
  saveUiPrefs();

  applyI18n();
  renderCurrentView();

  if(showNotif) showToast(t('toastLang'));
}

function renderCurrentView(){
  const active = document.querySelector('.vp-view.active');
  if(!active) return;
  const viewName = active.id.replace('view-', '');
  if(viewName === 'mascotas') renderMascotas();
  if(viewName === 'agenda') renderAgenda();
  if(viewName === 'add-servicio') renderServicios();
  if(viewName === 'historial') renderHistorial();
}

/* ---------------------------------------------------------
   3) VISTA: MASCOTAS
   --------------------------------------------------------- */
function initials(name){ return (name||'?').trim().charAt(0).toUpperCase(); }

function renderMascotas(){
  const mascotas = db.getMascotas();
  const row = document.getElementById('petsAvatarRow');
  const empty = document.getElementById('mascotasEmptyState');
  row.innerHTML = '';

  mascotas.forEach(pet=>{
    const col = document.createElement('div');
    col.className = 'text-center';
    col.innerHTML = `
      <div class="vp-pet-avatar ${pet.id===ui.selectedPetId?'selected':''}" data-select-pet="${pet.id}">
        ${pet.foto ? `<img src="${pet.foto}" alt="${pet.nombre}">` : initials(pet.nombre)}
      </div>
      <div class="vp-pet-name">${pet.nombre}</div>
      <div class="vp-pet-breed">${pet.raza || pet.especie}</div>`;
    row.appendChild(col);
  });

  const addCol = document.createElement('div');
  addCol.className = 'text-center';
  addCol.innerHTML = `
    <button class="vp-add-avatar" onclick="goTo('add-mascota')" aria-label="Añadir mascota"><i class="bi bi-plus-lg"></i></button>
    <div class="vp-pet-name">&nbsp;</div>`;
  row.appendChild(addCol);

  row.querySelectorAll('[data-select-pet]').forEach(el=>{
    el.addEventListener('click', ()=> selectPet(el.dataset.selectPet));
  });

  empty.innerHTML = mascotas.length === 0
    ? `<div class="vp-empty mb-3"><i class="bi bi-heart"></i><p>${t('emptyPets')}</p></div>`
    : '';

  ['btnEliminarMascota','btnReagendar','btnCancelar','btnNota'].forEach(id=>{
    document.getElementById(id).disabled = mascotas.length === 0;
  });

  renderNextApptCard(mascotas);
}

/* Idea añadida: tarjeta con la próxima cita de la mascota seleccionada,
   visible directamente en la vista principal (Mascotas) sin tener que
   entrar a Agenda. Reutiliza los datos que ya existen en el store. */
function renderNextApptCard(mascotas){
  const card = document.getElementById('nextApptCard');
  if(!card) return;
  if(mascotas.length === 0){ card.innerHTML = ''; return; }

  const pet = db.getMascota(ui.selectedPetId) || mascotas[0];
  const proxima = db.getCitasPorMascota(pet.id)
    .filter(c => c.estado !== 'cancelada' && new Date(c.fecha) >= new Date(new Date().toDateString()))
    .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha))[0];

  if(!proxima){
    card.innerHTML = `
      <div class="vp-card" style="padding:.85rem 1rem;display:flex;align-items:center;gap:.7rem;color:var(--vp-text-muted);">
        <i class="bi bi-calendar-x fs-5"></i>
        <span style="font-size:.85rem;">${t('noNextAppt')}</span>
      </div>`;
    return;
  }

  const meta = eventTipoMeta(proxima.tipo);
  const fechaFmt = new Date(proxima.fecha+'T00:00:00').toLocaleDateString(t('locale'),{day:'2-digit',month:'short'});
  card.innerHTML = `
    <button class="vp-event-card" style="width:100%;" data-next-appt-id="${proxima.id}">
      <div class="vp-event-icon ${proxima.tipo}"><i class="bi ${meta.icon}"></i></div>
      <div>
        <p class="vp-event-title" style="font-size:.7rem;color:var(--vp-text-muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:.1rem;">${t('nextAppt')}</p>
        <p class="vp-event-title">${meta.label}: ${proxima.nombre}</p>
        <p class="vp-event-sub">${fechaFmt}</p>
      </div>
    </button>`;
  card.querySelector('[data-next-appt-id]').addEventListener('click', ()=> openEventActionModal(proxima.id));
}

function selectPet(id){ ui.selectedPetId = id; saveUiPrefs(); renderMascotas(); }

function eliminarMascotaSeleccionada(){
  const mascotas = db.getMascotas();
  if(mascotas.length === 0){ showToast(t('toastNoPetsDelete')); return; }
  const pet = db.getMascota(ui.selectedPetId) || mascotas[0];
  document.getElementById('deletePetMsg').textContent = tn('deletePetConfirmNamed', pet.nombre);

  document.getElementById('btnConfirmDeletePet').onclick = ()=>{
    db.deleteMascota(pet.id); // el store hace el log + borra sus citas en cascada
    const restantes = db.getMascotas();
    ui.selectedPetId = restantes.length ? restantes[0].id : null;
    saveUiPrefs();
    renderMascotas();
    modalOf('modalConfirmDeletePet').hide();
    showToast(tn('petDeletedNamed', pet.nombre));
  };
  modalOf('modalConfirmDeletePet').show();
}

/* "Re agendar" / "Cancelar" desde Mascotas → lista de citas de la mascota activa */
function irReagendar(){ abrirSelectorDeCita('reagendar'); }
function irCancelar(){ abrirSelectorDeCita('cancelar'); }

function abrirSelectorDeCita(modo){
  const pet = db.getMascota(ui.selectedPetId) || db.getMascotas()[0];
  if(!pet){ showToast(t('toastNoPets')); return; }

  const citasPet = db.getCitasPorMascota(pet.id)
    .filter(c => c.estado !== 'cancelada')
    .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha));

  document.getElementById('pickEventTitle').textContent =
    modo === 'reagendar' ? tn('rescheduleApptOf', pet.nombre) : tn('cancelApptOf', pet.nombre);

  const list = document.getElementById('pickEventList');
  if(citasPet.length === 0){
    list.innerHTML = `<div class="vp-empty"><i class="bi bi-calendar-x"></i><p>${pet.nombre} ${t('noApptsForPet')}</p></div>`;
  } else {
    list.innerHTML = citasPet.map(c => eventCardHTML(c)).join('');
    list.querySelectorAll('[data-event-id]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        modalOf('modalPickEvent').hide();
        openEventActionModal(btn.dataset.eventId, modo);
      });
    });
  }
  modalOf('modalPickEvent').show();
}

/* ---------------------------------------------------------
   4) VISTA: AÑADIR MASCOTA
   --------------------------------------------------------- */
let pendingPetPhoto = null;

function handlePetPhoto(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e=>{
    pendingPetPhoto = e.target.result;
    document.getElementById('petPhotoPreview').innerHTML =
      `<img src="${pendingPetPhoto}" alt="foto mascota"><span class="vp-upload-badge"><i class="bi bi-check"></i></span>`;
  };
  reader.readAsDataURL(file);
}

document.getElementById('formAddPet').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('petNombre').value.trim();
  if(!nombre){ showToast(t('toastEnterName')); return; }

  const nuevaMascota = db.addMascota({
    nombre,
    especie: document.getElementById('petEspecie').value,
    raza: document.getElementById('petRaza').value.trim(),
    color: document.getElementById('petColor').value.trim(),
    sexo: document.getElementById('petSexo').value,
    nacimiento: document.getElementById('petNacimiento').value,
    peso: document.getElementById('petPeso').value,
    altura: document.getElementById('petAltura').value,
    comentarios: document.getElementById('petComentarios').value.trim(),
    foto: pendingPetPhoto
  });

  ui.selectedPetId = nuevaMascota.id;
  saveUiPrefs();

  this.reset();
  pendingPetPhoto = null;
  document.getElementById('petPhotoPreview').innerHTML = `<i class="bi bi-camera-fill"></i><span class="vp-upload-badge"><i class="bi bi-check"></i></span>`;

  showToast(tn('petAddedNamed', nombre));
  goTo('agenda');
});

/* ---------------------------------------------------------
   5) VISTA: AGENDA (calendario + citas)
   --------------------------------------------------------- */
let calDate = new Date();
function pad(n){ return String(n).padStart(2,'0'); }

function renderAgenda(){
  const pet = db.getMascota(ui.selectedPetId) || db.getMascotas()[0];
  const infoBox = document.getElementById('agendaPetInfo');

  if(pet){
    const opciones = db.getMascotas().map(p=>`<option value="${p.id}" ${p.id===pet.id?'selected':''}>${p.nombre}</option>`).join('');
    infoBox.innerHTML = `
      <div class="vp-mini-avatar">${pet.foto?`<img src="${pet.foto}">`:initials(pet.nombre)}</div>
      <div class="flex-grow-1">
        <div style="font-weight:700;font-size:.9rem;">${pet.nombre}</div>
        <div style="font-size:.68rem;opacity:.8;">${pet.especie} · ${pet.raza||'—'} · ${edadTexto(pet.nacimiento)}</div>
      </div>
      <select id="agendaPetSelect">${opciones}</select>`;
    document.getElementById('agendaPetSelect').addEventListener('change', function(){
      ui.selectedPetId = this.value; saveUiPrefs(); renderAgenda();
    });
  } else {
    infoBox.innerHTML = `<div style="font-size:.85rem;">${t('addFirstPetAgenda')}</div>`;
  }
  renderCalendar();
  renderEventsList();
}

function edadTexto(fechaISO){
  if(!fechaISO) return t('unknownAge');
  const nac = new Date(fechaISO), hoy = new Date();
  let years = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if(m < 0 || (m===0 && hoy.getDate() < nac.getDate())) years--;
  return years >= 0 ? `${years} ${t('yearsOld')}` : '—';
}

function changeMonth(delta){ calDate.setMonth(calDate.getMonth()+delta); renderCalendar(); renderEventsList(); }
function isoDate(dt){ return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`; }

function renderCalendar(){
  document.getElementById('calMonthLabel').textContent = `${MESES()[calDate.getMonth()]} ${calDate.getFullYear()}`;
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';
  DOWS().forEach(d=>{ const el=document.createElement('div'); el.className='vp-cal-dow'; el.textContent=d; grid.appendChild(el); });

  const year=calDate.getFullYear(), month=calDate.getMonth();
  const firstDow = new Date(year,month,1).getDay();
  const daysInMonth = new Date(year,month+1,0).getDate();
  const daysInPrevMonth = new Date(year,month,0).getDate();
  const today = new Date();

  const citas = db.getCitas().filter(c => c.estado !== 'cancelada' && (!ui.selectedPetId || c.mascotaId === ui.selectedPetId));
  const eventDaysByDate = new Set(citas.map(c=>c.fecha));

  for(let i=firstDow-1;i>=0;i--){
    const d = daysInPrevMonth-i;
    const iso = isoDate(new Date(year, month-1, d));
    grid.appendChild(dayCell(d, true, false, eventDaysByDate.has(iso), iso));
  }
  for(let d=1; d<=daysInMonth; d++){
    const iso = isoDate(new Date(year, month, d));
    const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
    grid.appendChild(dayCell(d,false,isToday,eventDaysByDate.has(iso), iso));
  }
  const trailing = (7 - ((firstDow+daysInMonth)%7))%7;
  for(let d=1; d<=trailing; d++){
    const iso = isoDate(new Date(year, month+1, d));
    grid.appendChild(dayCell(d,true,false,eventDaysByDate.has(iso), iso));
  }
}
function dayCell(num,muted,isToday,hasEvent,isoStr){
  const el=document.createElement('div');
  el.className='vp-cal-day'+(muted?' muted':'')+(isToday?' today':'')+(hasEvent?' has-event':'');
  el.textContent=num;
  el.dataset.date = isoStr;
  el.addEventListener('click', ()=> openDayEventsModal(isoStr));
  return el;
}

/* --- Modal: todos los eventos de un día concreto --- */
function openDayEventsModal(dateISO){
  const citasDia = db.getCitas()
    .filter(c => c.fecha === dateISO && c.estado !== 'cancelada' && (!ui.selectedPetId || c.mascotaId === ui.selectedPetId))
    .sort((a,b)=> a.nombre.localeCompare(b.nombre));

  const fechaFmt = new Date(dateISO+'T00:00:00').toLocaleDateString(t('locale'),{day:'2-digit',month:'long',year:'numeric'});
  document.getElementById('dayEventsTitle').innerHTML = `<i class="bi bi-calendar3 me-2"></i>${fechaFmt}`;

  const list = document.getElementById('dayEventsList');
  if(citasDia.length === 0){
    list.innerHTML = `<div class="vp-empty"><i class="bi bi-calendar-x"></i><p>${t('noDayEvents')}</p></div>`;
  } else {
    list.innerHTML = citasDia.map(c => eventCardHTML(c)).join('');
    list.querySelectorAll('[data-event-id]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        modalOf('modalDayEvents').hide();
        openEventActionModal(btn.dataset.eventId);
      });
    });
  }
  modalOf('modalDayEvents').show();
}

function eventTipoMeta(tipo){
  if(tipo==='vacuna') return {icon:'bi-shield-plus', label:t('typeVacuna')};
  if(tipo==='consulta') return {icon:'bi-clipboard2-pulse', label:t('typeConsulta')};
  return {icon:'bi-capsule', label:t('typeMedicamento')};
}

function eventCardHTML(c){
  const pet = db.getMascota(c.mascotaId);
  const meta = eventTipoMeta(c.tipo);
  const fechaFmt = new Date(c.fecha+'T00:00:00').toLocaleDateString(t('locale'),{day:'2-digit',month:'short',year:'numeric'});
  const estadoTag = c.estado === 'reagendada' ? ' · reagendada' : '';
  return `
    <button class="vp-event-card" data-event-id="${c.id}">
      <div class="vp-event-icon ${c.tipo}"><i class="bi ${meta.icon}"></i></div>
      <div>
        <p class="vp-event-title">${meta.label}: ${c.nombre}</p>
        <p class="vp-event-sub">${c.info || '—'}</p>
        <p class="vp-event-sub">${fechaFmt}${estadoTag}</p>
      </div>
      <span class="vp-event-badge">${pet ? pet.nombre : '—'}</span>
    </button>`;
}

function renderEventsList(){
  const list = document.getElementById('eventsList');
  const citas = db.getCitas()
    .filter(c => c.estado !== 'cancelada' && (!ui.selectedPetId || c.mascotaId === ui.selectedPetId))
    .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha));

  if(citas.length === 0){
    list.innerHTML = `<div class="vp-empty"><i class="bi bi-calendar2-week"></i><p>${t('emptyEvents')}</p></div>`;
    return;
  }
  list.innerHTML = citas.map(c => eventCardHTML(c)).join('');
  list.querySelectorAll('[data-event-id]').forEach(btn=>{
    btn.addEventListener('click', ()=> openEventActionModal(btn.dataset.eventId));
  });
}

/* --- Nueva cita --- */
function openNuevaCitaModal(){
  const mascotas = db.getMascotas();
  if(mascotas.length === 0){ showToast(t('toastAddPetBeforeAppt')); return; }
  const select = document.getElementById('citaPet');
  select.innerHTML = mascotas.map(p=>`<option value="${p.id}" ${p.id===ui.selectedPetId?'selected':''}>${p.nombre}</option>`).join('');
  document.getElementById('formNuevaCita').reset();
  select.value = ui.selectedPetId;
  modalOf('modalNuevaCita').show();
}

document.getElementById('formNuevaCita').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('citaNombre').value.trim();
  const fecha = document.getElementById('citaFecha').value;
  if(!nombre || !fecha){ showToast(t('toastFillApptFields')); return; }

  db.addCita({
    mascotaId: document.getElementById('citaPet').value,
    tipo: document.getElementById('citaTipo').value,
    nombre,
    info: document.getElementById('citaInfo').value.trim(),
    fecha
  });

  modalOf('modalNuevaCita').hide();
  renderAgenda();
  showToast(t('toastApptScheduled'));
});

/* --- Acciones sobre una cita existente --- */
function openEventActionModal(eventId, forzarModo){
  const cita = db.getCita(eventId);
  if(!cita) return;

  const pet = db.getMascota(cita.mascotaId);
  const meta = eventTipoMeta(cita.tipo);
  const fechaFmt = new Date(cita.fecha+'T00:00:00').toLocaleDateString(t('locale'),{day:'2-digit',month:'long',year:'numeric'});

  document.getElementById('eventActionTitle').textContent = `${meta.label}: ${cita.nombre}`;
  document.getElementById('eventActionInfo').textContent = `${pet?pet.nombre:'—'} · ${cita.info||t('noAdditionalInfo')} · ${t('currentDate')}: ${fechaFmt}`;

  const box = document.getElementById('eventReagendarBox');
  const fechaInput = document.getElementById('eventNuevaFecha');
  box.classList.add('d-none');
  fechaInput.value = cita.fecha;

  document.getElementById('btnEventReagendar').onclick = ()=>{
    if(box.classList.contains('d-none')){ box.classList.remove('d-none'); return; }
    const nuevaFecha = fechaInput.value;
    if(!nuevaFecha){ showToast(t('toastPickDate')); return; }
    db.reagendarCita(cita.id, nuevaFecha);
    modalOf('modalEventAction').hide();
    renderAgenda();
    showToast(t('toastApptRescheduled'));
  };

  document.getElementById('btnEventCancelar').onclick = ()=>{
    db.cancelarCita(cita.id);
    modalOf('modalEventAction').hide();
    renderAgenda();
    showToast(t('toastApptCancelled'));
  };

  modalOf('modalEventAction').show();
  if(forzarModo === 'reagendar') box.classList.remove('d-none');
}

/* ---------------------------------------------------------
   6) VISTA: AÑADIR SERVICIO (stepper + registro en historial)
   --------------------------------------------------------- */
const SERVICES_CATALOG = [
  { key:'medicamentos', nombreKey:'svcMedicamentos' },
  { key:'antipulgas', nombreKey:'svcAntipulgas' },
  { key:'consultas', nombreKey:'svcConsultas' },
  { key:'vacunas', nombreKey:'svcVacunas' },
  { key:'banio', nombreKey:'svcBanio' },
  { key:'pelo', nombreKey:'svcPelo' }
];
let serviceCounts = {};
let serviceNotes = {};

function escapeAttr(str){ return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;'); }

/* MEJORA PEDIDA: si todavía no hay mascotas registradas, esta vista
   (accesible desde la barra inferior "Servicios") ya no muestra el
   stepper de servicios vacío y sin sentido: muestra un mensaje de
   fondo de pantalla sugiriendo crear primero una mascota, igual que
   ya hacían Historial y Agenda, y desactiva el botón "Añadir". */
function renderServicios(){
  const wrap = document.getElementById('serviceListWrap');
  const btnGuardar = document.getElementById('btnGuardarServicios');
  const mascotas = db.getMascotas();

  if(mascotas.length === 0){
    wrap.innerHTML = `
      <div class="vp-empty" style="padding:2rem 1rem;">
        <i class="bi bi-heart"></i>
        <p>${t('emptyServicesNoPets')}</p>
        <button type="button" class="btn btn-vp-primary btn-sm mt-2" onclick="goTo('add-mascota')">${t('goAddPet')}</button>
      </div>`;
    if(btnGuardar){ btnGuardar.disabled = true; btnGuardar.classList.add('d-none'); }
    return;
  }
  if(btnGuardar){ btnGuardar.disabled = false; btnGuardar.classList.remove('d-none'); }

  wrap.innerHTML = SERVICES_CATALOG.map(svc=>{
    const count = serviceCounts[svc.key] || 0;
    const nota = serviceNotes[svc.key] || '';
    return `
      <div class="vp-service-row-wrap">
        <div class="vp-service-row">
          <span class="vp-service-name">${t(svc.nombreKey)}</span>
          <div class="vp-stepper">
            <button class="vp-step-btn" data-step="${svc.key}" data-delta="-1" ${count===0?'disabled':''}>−</button>
            <span class="vp-step-count">${count}</span>
            <button class="vp-step-btn plus" data-step="${svc.key}" data-delta="1">+</button>
          </div>
        </div>
        ${count>0 ? `<input type="text" class="form-control form-control-sm vp-service-note" data-note="${svc.key}" placeholder="${t('additionalInfoPh')}" value="${escapeAttr(nota)}">` : ''}
      </div>`;
  }).join('');
  wrap.querySelectorAll('[data-step]').forEach(btn=>{
    btn.addEventListener('click', ()=> stepService(btn.dataset.step, Number(btn.dataset.delta)));
  });
  wrap.querySelectorAll('[data-note]').forEach(inp=>{
    inp.addEventListener('input', ()=> { serviceNotes[inp.dataset.note] = inp.value; });
  });
}
function stepService(key, delta){
  serviceCounts[key] = Math.max(0, (serviceCounts[key]||0) + delta);
  if(serviceCounts[key] === 0) delete serviceNotes[key];
  renderServicios();
}
function guardarServicios(){
  const mascotas = db.getMascotas();
  if(mascotas.length === 0){ showToast(t('toastAddPetBeforeService')); return; }
  const seleccionados = Object.entries(serviceCounts).filter(([,c])=> c>0);
  if(seleccionados.length === 0){ showToast(t('toastPickService')); return; }

  // Establecer la fecha actual por defecto en el input del modal
  const inputDate = document.getElementById('inputServiceDate');
  if(inputDate) {
    inputDate.value = new Date().toISOString().slice(0,10);
  }
  modalOf('modalServiceDate').show();
}

function confirmarGuardarServicios(){
  const mascotas = db.getMascotas();
  const pet = db.getMascota(ui.selectedPetId) || mascotas[0];
  const seleccionados = Object.entries(serviceCounts).filter(([,c])=> c>0);
  const fechaSeleccionada = document.getElementById('inputServiceDate').value || new Date().toISOString().slice(0,10);

  seleccionados.forEach(([key,count])=>{
    const svc = SERVICES_CATALOG.find(s=>s.key===key);
    db.registrarServicio(t(svc.nombreKey), count, pet.id, fechaSeleccionada, serviceNotes[key] || '');
  });

  serviceCounts = {};
  serviceNotes = {};
  renderServicios();
  modalOf('modalServiceDate').hide();
  showToast(t('toastServicesSaved'));
  goTo('historial');
}


/* ---------------------------------------------------------
   7) VISTA: HISTORIAL (auditoría: mascota | cita | servicio | nota)
   --------------------------------------------------------- */
const HISTORIAL_FILTROS = [
  { key:'todos', labelKey:'filterAll' },
  { key:'mascota', labelKey:'filterPets' },
  { key:'cita', labelKey:'filterAppts' },
  { key:'servicio', labelKey:'filterServices' },
  { key:'nota', labelKey:'filterNotes' }
];
let historialFiltroActivo = 'todos';

function renderFiltrosHistorial(){
  const wrap = document.getElementById('historialFiltros');
  wrap.innerHTML = HISTORIAL_FILTROS.map(f=>
    `<button class="vp-filter-chip ${f.key===historialFiltroActivo?'active':''}" data-filtro="${f.key}">${t(f.labelKey)}</button>`
  ).join('');
  wrap.querySelectorAll('[data-filtro]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ historialFiltroActivo = btn.dataset.filtro; renderHistorial(); });
  });
}

function iconoPorTipo(tipo){
  return { mascota:'bi-heart-pulse', cita:'bi-calendar-check', servicio:'bi-bag-check', nota:'bi-journal-medical' }[tipo] || 'bi-clock-history';
}

function renderHistorial(){
  renderFiltrosHistorial();
  const container = document.getElementById('historialList');
  const query = (document.getElementById('historialSearch')?.value || '').toLowerCase().trim();

  const filtroTipo = historialFiltroActivo === 'todos' ? null : historialFiltroActivo;
  let items = db.getHistorial({ tipo: filtroTipo })
    .filter(h => !query || h.descripcion.toLowerCase().includes(query));

  if(items.length === 0){
    container.innerHTML = `<div class="vp-empty"><i class="bi bi-search"></i><p>${t('emptyHistory')}</p></div>`;
    return;
  }

  const groups = {};
  items.forEach(h=>{
    const d = new Date(h.fecha+'T00:00:00');
    const label = `${MESES()[d.getMonth()].slice(0,3).toUpperCase()} ${d.getFullYear()}`;
    (groups[label] ||= []).push(h);
  });

  let html = '';
  Object.keys(groups).forEach(mesLabel=>{
    html += `<div class="vp-month-label">${mesLabel}</div>`;
    groups[mesLabel].forEach(h=>{
      const pet = h.mascotaId ? db.getMascota(h.mascotaId) : null;
      const fechaFmt = new Date(h.fecha+'T00:00:00').toLocaleDateString(t('locale'),{day:'2-digit',month:'short'});
      html += `
        <div class="vp-card vp-hist-card">
          <div class="vp-hist-icon"><i class="bi ${iconoPorTipo(h.tipo)}"></i></div>
          <div class="flex-grow-1">
            <p class="vp-hist-title">${fechaFmt} ${h.hora} &nbsp;·&nbsp; ${h.descripcion}</p>
          </div>
          ${pet ? `<span class="vp-event-badge" style="align-self:flex-start;">${pet.nombre}</span>` : ''}
          <button class="vp-hist-delete" data-hist-id="${h.id}" aria-label="Eliminar registro" title="Eliminar registro">
            <i class="bi bi-trash3"></i>
          </button>
        </div>`;
    });
  });
  container.innerHTML = html;
  container.querySelectorAll('[data-hist-id]').forEach(btn=>{
    btn.addEventListener('click', ()=> confirmarEliminarHistorial(btn.dataset.histId));
  });
}
document.getElementById('historialSearch').addEventListener('input', renderHistorial);

function confirmarEliminarHistorial(id){
  document.getElementById('btnConfirmDeleteHist').onclick = ()=>{
    db.deleteHistorial(id);
    modalOf('modalConfirmDeleteHist').hide();
    renderHistorial();
    showToast(t('toastRecordDeleted'));
  };
  modalOf('modalConfirmDeleteHist').show();
}

/* ---------------------------------------------------------
   8) NOTAS CLÍNICAS / MANUALES
   --------------------------------------------------------- */
function openNotaModal(){
  const select = document.getElementById('notaMascota');
  select.innerHTML = `<option value="">${t('generalNoPet')}</option>` +
    db.getMascotas().map(p=>`<option value="${p.id}" ${p.id===ui.selectedPetId?'selected':''}>${p.nombre}</option>`).join('');
  document.getElementById('formNota').reset();
  select.value = ui.selectedPetId || '';
  modalOf('modalNota').show();
}
document.getElementById('formNota').addEventListener('submit', function(e){
  e.preventDefault();
  const texto = document.getElementById('notaTexto').value.trim();
  const mascotaId = document.getElementById('notaMascota').value || null;
  try{
    db.registrarNota(texto, mascotaId);
    modalOf('modalNota').hide();
    showToast(t('toastNoteSaved'));
  }catch(err){
    showToast(err.message);
  }
});

/* ---------------------------------------------------------
   9) VISTA: CONFIGURACIÓN
   --------------------------------------------------------- */
const INFO_CONTENT = {
  sobre: { titleKey:'infoAboutTitle', bodyKey:'infoAboutBody' },
  politica: { titleKey:'infoPolicyTitle', bodyKey:'infoPolicyBody' },
  terminos: { titleKey:'infoTermsTitle', bodyKey:'infoTermsBody' },
  contacto: { titleKey:'infoContactTitle', bodyKey:'infoContactBody' }
};
function openInfoModal(key){
  const data = INFO_CONTENT[key];
  if(!data) return;
  document.getElementById('infoModalTitle').textContent = t(data.titleKey);
  // Los textos legales vienen con formato (títulos, listas) desde i18n.js,
  // por eso se inyectan como HTML y no como texto plano.
  document.getElementById('infoModalBody').innerHTML = t(data.bodyKey);
  modalOf('modalInfo').show();
}

// Expone las funciones invocadas vía atributos inline (onclick="…") en index.html,
// ya que ahora app.js es un módulo ES y ese scope ya no es global por defecto.
Object.assign(window, {
  goTo, changeLanguage, toggleDarkMode, toggleNotificaciones,
  eliminarMascotaSeleccionada, irReagendar, irCancelar, openNotaModal,
  handlePetPhoto, changeMonth, openNuevaCitaModal, guardarServicios,
  confirmarGuardarServicios, openInfoModal, renderHistorial
});