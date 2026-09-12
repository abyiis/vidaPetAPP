/* =========================================================
   VIDAPET · I18N.JS
   Diccionario único de traducción + helpers de aplicación.

   BUG ORIGINAL: changeLanguage() solo traducía los 5 botones
   del menú inferior. El resto de la interfaz (encabezados,
   formularios, modales, estados vacíos, toasts...) quedaba
   siempre en español, y además cada re-render (goTo) volvía
   a pintar texto español "hardcodeado" en los template
   strings de app.js, así que el cambio de idioma se perdía
   apenas se navegaba a otra vista.

   SOLUCIÓN: un diccionario central + dos mecanismos:
   1) data-i18n / data-i18n-placeholder en el HTML estático
      → aplyI18n() los actualiza recorriendo el DOM.
   2) t(key) importado en app.js para todo texto generado
      dinámicamente (empty states, toasts, listas).
   Ambos leen siempre el idioma actual (ui.lang), así que
   sobreviven a los re-renders.
   ========================================================= */

export const dict = {
  es: {
    // Encabezados / subtítulos
    subPets: 'Mascotas', subAdd: 'Registrar', subAgenda: 'Agenda',
    subServices: 'Servicios', subHistory: 'Historial', subConfig: 'Configuración',

    // Nav inferior
    navPets: 'Mascotas', navAgenda: 'Agenda', navServices: 'Servicios',
    navHistory: 'Historial', navConfig: 'Configuración',

    // Vista Mascotas
    moreActions: 'Más acciones',
    deletePet: 'Eliminar mascota',
    rescheduleService: 'Re agendar servicio',
    cancelService: 'Cancelar servicio',
    addClinicalNote: 'Añadir nota clínica',
    haveProblems: '¿Tienes problemas?',
    contactUs: 'Contáctanos',
    emptyPets: 'Aún no tienes mascotas registradas.<br>Toca "+" para añadir la primera.',
    nextAppt: 'Próxima cita',
    noNextAppt: 'Sin citas próximas',

    // Formulario añadir mascota
    petPhotoLabel: 'Foto de la mascota',
    petName: 'Nombre de la mascota', petNamePh: 'Ej. Rocco',
    petSpecies: 'Especie', speciesDog: 'Perro', speciesCat: 'Gato', speciesBird: 'Ave', speciesOther: 'Otro',
    petBreed: 'Raza', petBreedPh: 'Ej. Labrador',
    petColor: 'Color', petColorPh: 'Ej. Dorado',
    petSex: 'Sexo', sexMale: 'Macho', sexFemale: 'Hembra',
    petBirth: 'Fecha de nacimiento',
    petWeight: 'Peso (kg)', petHeight: 'Altura (cm)',
    petComments: 'Comentarios adicionales', petCommentsPh: 'Alergias, condiciones especiales…',
    addPetBtn: 'Añadir mascota',

    // Agenda
    upcomingEvents: 'Próximos eventos',
    newAppt: 'Nueva cita',
    addServiceFab: 'Adicionar servicio',
    emptyEvents: 'No hay eventos próximos.<br>Toca "Nueva cita" para agendar uno.',
    addFirstPetAgenda: 'Añade tu primera mascota para ver su agenda.',
    yearsOld: 'años', unknownAge: 'edad desconocida',

    // Servicios
    addBtn: 'Añadir',
    emptyServicesNoPets: 'Necesitas registrar una mascota antes de agendar un servicio.',
    goAddPet: 'Añadir mascota',
    additionalInfoPh: 'Información adicional (opcional): dosis, indicaciones…',
    svcMedicamentos: 'Medicamentos', svcAntipulgas: 'Antipulgas', svcConsultas: 'Consultas',
    svcVacunas: 'Vacunas', svcBanio: 'Baño y corte de uñas', svcPelo: 'Corte de pelo',

    // Historial
    searchPh: '¿Qué estás buscando?',
    filterAll: 'Todos', filterPets: 'Mascotas', filterAppts: 'Citas',
    filterServices: 'Servicios', filterNotes: 'Notas',
    emptyHistory: 'No se encontraron registros.',

    // Configuración
    changePhoto: 'Cambiar foto',
    accountSection: 'Cuenta',
    moreSection: 'Más',
    notifications: 'Notificaciones',
    darkMode: 'Modo oscuro',
    langLabel: 'Idioma / Language',
    legalSection: 'Legal',
    aboutUs: 'Sobre nosotros',
    privacyPolicy: 'Política de privacidad',
    termsConditions: 'Términos y condiciones',

    // Modales
    manageAppt: 'Gestionar cita',
    newDate: 'Nueva fecha',
    cancelAppt: 'Cancelar cita',
    reschedule: 'Reagendar',
    pickAppt: 'Selecciona una cita',
    clinicalNote: 'Nota clínica',
    petOptional: 'Mascota (opcional)',
    generalNoPet: 'General (sin mascota específica)',
    noteLabel: 'Nota', notePh: 'Ej. Presenta leve cojera en pata trasera derecha',
    cancel: 'Cancelar', save: 'Guardar', saveNote: 'Guardar nota',
    information: 'Información', understood: 'Entendido',
    dayEvents: 'Eventos del día', noDayEvents: 'No hay eventos para este día.',
    deleteRecord: 'Eliminar registro',
    deleteRecordConfirm: '¿Eliminar este registro del historial? Esta acción no se puede deshacer.',
    delete: 'Eliminar',
    serviceDate: 'Fecha del servicio',
    serviceDateHint: 'Selecciona cuándo se realizó o realizará el servicio:',
    confirmSave: 'Confirmar y guardar',
    deletePetModalTitle: 'Eliminar mascota',
    deletePetConfirm: '¿Eliminar esta mascota? Esta acción no se puede deshacer.',
    apptTitle: 'Nueva cita', apptPet: 'Mascota', apptType: 'Tipo de cita',
    typeVacuna: 'Vacuna', typeMedicamento: 'Medicamento', typeConsulta: 'Consulta',
    apptNameLabel: 'Nombre / motivo', apptNamePh: 'Ej. Antirrábica',
    apptInfoLabel: 'Información adicional', apptInfoPh: 'Ej. Dosis anual',
    apptDate: 'Fecha', saveAppt: 'Guardar cita',
    noApptsForPet: 'no tiene citas agendadas.',
    noAdditionalInfo: 'Sin información adicional',
    currentDate: 'Fecha actual',
    deletePetConfirmNamed: '¿Eliminar a {name}? Esta acción no se puede deshacer.',
    petDeletedNamed: '{name} fue eliminado',
    petAddedNamed: '{name} fue añadido con éxito',
    rescheduleApptOf: 'Reagendar cita de {name}',
    cancelApptOf: 'Cancelar cita de {name}',

    // Toasts
    toastLang: 'Idioma cambiado a Español',
    toastDark: 'Modo oscuro activado', toastLight: 'Modo claro activado',
    toastNotifOn: 'Notificaciones activadas', toastNotifOff: 'Notificaciones desactivadas',
    toastNoPetsDelete: 'No hay mascotas para eliminar',
    toastPetDeleted: 'fue eliminado',
    toastNoPets: 'No hay mascotas registradas',
    toastPetAdded: 'fue añadido con éxito',
    toastEnterName: 'Ingresa el nombre de la mascota',
    toastApptScheduled: 'Cita agendada con éxito',
    toastFillApptFields: 'Completa nombre y fecha de la cita',
    toastAddPetBeforeAppt: 'Añade una mascota antes de crear una cita',
    toastPickDate: 'Selecciona una nueva fecha',
    toastApptRescheduled: 'Cita reagendada con éxito',
    toastApptCancelled: 'Cita cancelada',
    toastAddPetBeforeService: 'Añade una mascota antes de agendar un servicio',
    toastPickService: 'Selecciona al menos un servicio',
    toastServicesSaved: 'Servicio(s) añadido(s) al historial',
    toastRecordDeleted: 'Registro eliminado del historial',
    toastNoteSaved: 'Nota guardada en el historial',

    // Info legal
    infoAboutTitle: 'Sobre nosotros',
    infoAboutBody: `
      <p>En <strong>VidaPet</strong>, entendemos que las mascotas no son solo animales de compañía; son miembros fundamentales de nuestras familias. Nacimos con la misión de proporcionar a todos los tutores una herramienta intuitiva, accesible y segura para gestionar la salud, los cuidados y el bienestar de sus peludos, plumosos o escamosos compañeros.</p>
      <p>Sabemos lo complejo que puede ser llevar el control de vacunas, dosis de medicamentos, desparasitaciones, visitas al veterinario y cortes de pelo. Por eso diseñamos una plataforma 100% enfocada en la usabilidad y la privacidad, centralizando toda la vida médica y estética de tus mascotas en un solo lugar.</p>
      <h6 class="fw-bold mt-3 mb-1">¿Por qué elegir VidaPet?</h6>
      <ul class="ps-3 mb-0">
        <li><strong>100% offline y privado:</strong> no requiere conexión a internet para funcionar.</li>
        <li><strong>Control integral de salud:</strong> fichas clínicas, agenda de citas e historial organizado por fechas.</li>
        <li><strong>Experiencia multi-dispositivo:</strong> disponible como app web y como app móvil híbrida.</li>
        <li><strong>Diseñado para la familia:</strong> interfaz limpia, moderna y disponible en varios idiomas.</li>
      </ul>`,
    infoPolicyTitle: 'Política de privacidad',
    infoPolicyBody: `
      <p style="font-size:.75rem;">Última actualización: 3 de septiembre de 2026</p>
      <p>En VidaPet la privacidad de nuestros usuarios es nuestra mayor prioridad. Esta política explica cómo se maneja —o, más bien, cómo <strong>no</strong> se recopila ni comparte— la información personal y los datos de tus mascotas.</p>
      <h6 class="fw-bold mt-3 mb-1">1. Recopilación y almacenamiento (arquitectura local)</h6>
      <p>VidaPet opera bajo una arquitectura estrictamente cliente/local (offline-first). Toda la información que ingresas (nombres, fotos, especie, raza, fechas de nacimiento, notas clínicas, citas y servicios) se almacena exclusivamente dentro de tu dispositivo mediante <code>localStorage</code> del navegador o de la app híbrida (WebView). VidaPet no envía, recopila, procesa ni vende tus datos a servidores externos ni a la nube.</p>
      <h6 class="fw-bold mt-3 mb-1">2. Permisos del dispositivo móvil</h6>
      <ul class="ps-3">
        <li><strong>Cámara / galería:</strong> solo al adjuntar una foto de tu mascota; se procesa localmente.</li>
        <li><strong>Notificaciones locales:</strong> para recordatorios de citas y vacunas, generadas por el propio sistema operativo.</li>
      </ul>
      <h6 class="fw-bold mt-3 mb-1">3. Servicios y analítica de terceros</h6>
      <p>No utilizamos rastreadores, cookies de publicidad ni analítica de comportamiento. Los estilos, iconos y tipografías (Bootstrap, etc.) están empaquetados en la app: no se hacen peticiones a CDNs externos.</p>
      <h6 class="fw-bold mt-3 mb-1">4. Seguridad y conservación</h6>
      <p>Tienes control total: puedes eliminar mascotas, historial o notas en cualquier momento. Si borras la caché, desinstalas la app o formateas tu dispositivo, la información se pierde de forma permanente. Te recomendamos proteger tu dispositivo con PIN, patrón o huella.</p>
      <h6 class="fw-bold mt-3 mb-1">5. Privacidad de menores</h6>
      <p>No recopilamos activamente información personal identificable de nadie, incluidos menores de 13 años.</p>
      <h6 class="fw-bold mt-3 mb-1">6. Cambios en esta política</h6>
      <p>Podemos actualizarla ocasionalmente; los cambios entran en vigor al publicarse dentro de la app o en las tiendas.</p>
      <h6 class="fw-bold mt-3 mb-1">7. Contacto</h6>
      <p class="mb-0">juan.parras@upb.edu.co</p>`,
    infoTermsTitle: 'Términos y condiciones',
    infoTermsBody: `
      <p style="font-size:.75rem;">Última actualización: 3 de septiembre de 2026</p>
      <p>Al acceder, instalar o utilizar VidaPet (la "Aplicación"), usted acepta quedar vinculado legalmente por los presentes Términos y Condiciones. Si no está de acuerdo, le rogamos no utilizar la Aplicación.</p>
      <h6 class="fw-bold mt-3 mb-1">1. Naturaleza del servicio</h6>
      <p>VidaPet es una plataforma de gestión personal para el cuidado y la salud de mascotas: registro de perfiles, agenda de citas y tratamientos, catálogo de servicios e historial de actividad.</p>
      <p><strong>Aviso legal veterinario:</strong> VidaPet es una herramienta de organización e información personal. En ningún caso sustituye la consulta, diagnóstico o tratamiento de un médico veterinario colegiado. Ante cualquier emergencia, acuda a un profesional.</p>
      <h6 class="fw-bold mt-3 mb-1">2. Arquitectura offline y almacenamiento</h6>
      <p>Todos los datos se guardan local y exclusivamente en tu dispositivo (<code>localStorage</code> / WebView nativo). VidaPet no transmite ni sincroniza datos en servidores propios. La pérdida de caché, desinstalación o daño del dispositivo implica pérdida irreversible de la información; el usuario es responsable de resguardar su dispositivo.</p>
      <h6 class="fw-bold mt-3 mb-1">3. Distribución en tiendas y permisos</h6>
      <p>Al descargar VidaPet desde Google Play o Apple App Store, aceptas además los términos de dichas plataformas. La app puede solicitar permisos locales (p. ej. cámara/galería) que se procesan estrictamente en el dispositivo, sin compartirse con terceros.</p>
      <h6 class="fw-bold mt-3 mb-1">4. Uso permitido y propiedad intelectual</h6>
      <p>Se concede una licencia limitada, personal, no exclusiva, no transferible, revocable y gratuita para uso estrictamente personal y no comercial. El código, diseño, marcas y componentes gráficos son propiedad de VidaPet o de sus licencias de código abierto correspondientes. Queda prohibida la ingeniería inversa, la redistribución comercial y cualquier uso ilícito o que desatienda el bienestar animal.</p>
      <h6 class="fw-bold mt-3 mb-1">5. Limitación de responsabilidad</h6>
      <p>La Aplicación se ofrece "tal cual" y "según disponibilidad", sin garantías de ningún tipo. VidaPet no será responsable de daños directos, indirectos o consecuentes —incluidos gastos veterinarios, pérdida de datos o tratamientos omitidos por fallos de agenda/recordatorios— derivados del uso de la app.</p>
      <h6 class="fw-bold mt-3 mb-1">6. Modificaciones</h6>
      <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento; el uso continuado tras su publicación implica aceptación.</p>
      <h6 class="fw-bold mt-3 mb-1">7. Ley aplicable</h6>
      <p>Se rigen por la legislación de la jurisdicción de origen del proyecto, sometiéndose a sus tribunales competentes ante cualquier disputa.</p>
      <h6 class="fw-bold mt-3 mb-1">8. Contacto</h6>
      <p class="mb-0">juan.parras@upb.edu.co</p>`,
    infoContactTitle: 'Contáctanos',
    infoContactBody: '¿Tienes problemas con la app? Escríbenos a juan.parras@upb.edu.co y te responderemos a la brevedad.',

    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    dows: ['D','L','M','M','J','V','S'],
    locale: 'es-ES'
  },

  en: {
    subPets: 'Pets', subAdd: 'Register', subAgenda: 'Schedule',
    subServices: 'Services', subHistory: 'History', subConfig: 'Settings',

    navPets: 'Pets', navAgenda: 'Schedule', navServices: 'Services',
    navHistory: 'History', navConfig: 'Settings',

    moreActions: 'More actions',
    deletePet: 'Delete pet',
    rescheduleService: 'Reschedule service',
    cancelService: 'Cancel service',
    addClinicalNote: 'Add clinical note',
    haveProblems: 'Having trouble?',
    contactUs: 'Contact us',
    emptyPets: "You haven't registered any pets yet.<br>Tap \"+\" to add your first one.",
    nextAppt: 'Next appointment',
    noNextAppt: 'No upcoming appointments',

    petPhotoLabel: 'Pet photo',
    petName: 'Pet name', petNamePh: 'E.g. Rocco',
    petSpecies: 'Species', speciesDog: 'Dog', speciesCat: 'Cat', speciesBird: 'Bird', speciesOther: 'Other',
    petBreed: 'Breed', petBreedPh: 'E.g. Labrador',
    petColor: 'Color', petColorPh: 'E.g. Golden',
    petSex: 'Sex', sexMale: 'Male', sexFemale: 'Female',
    petBirth: 'Date of birth',
    petWeight: 'Weight (kg)', petHeight: 'Height (cm)',
    petComments: 'Additional comments', petCommentsPh: 'Allergies, special conditions…',
    addPetBtn: 'Add pet',

    upcomingEvents: 'Upcoming events',
    newAppt: 'New appointment',
    addServiceFab: 'Add service',
    emptyEvents: 'No upcoming events.<br>Tap "New appointment" to schedule one.',
    addFirstPetAgenda: 'Add your first pet to see its schedule.',
    yearsOld: 'years old', unknownAge: 'unknown age',

    addBtn: 'Add',
    emptyServicesNoPets: 'You need to register a pet before booking a service.',
    goAddPet: 'Add pet',
    additionalInfoPh: 'Additional info (optional): dose, instructions…',
    svcMedicamentos: 'Medication', svcAntipulgas: 'Flea treatment', svcConsultas: 'Consultations',
    svcVacunas: 'Vaccines', svcBanio: 'Bath & nail trim', svcPelo: 'Haircut',

    searchPh: 'What are you looking for?',
    filterAll: 'All', filterPets: 'Pets', filterAppts: 'Appointments',
    filterServices: 'Services', filterNotes: 'Notes',
    emptyHistory: 'No records found.',

    changePhoto: 'Change photo',
    accountSection: 'Account',
    moreSection: 'More',
    notifications: 'Notifications',
    darkMode: 'Dark mode',
    langLabel: 'Idioma / Language',
    legalSection: 'Legal',
    aboutUs: 'About us',
    privacyPolicy: 'Privacy policy',
    termsConditions: 'Terms & conditions',

    manageAppt: 'Manage appointment',
    newDate: 'New date',
    cancelAppt: 'Cancel appointment',
    reschedule: 'Reschedule',
    pickAppt: 'Select an appointment',
    clinicalNote: 'Clinical note',
    petOptional: 'Pet (optional)',
    generalNoPet: 'General (no specific pet)',
    noteLabel: 'Note', notePh: 'E.g. Mild limp on right hind leg',
    cancel: 'Cancel', save: 'Save', saveNote: 'Save note',
    information: 'Information', understood: 'Got it',
    dayEvents: 'Events for this day', noDayEvents: 'No events for this day.',
    deleteRecord: 'Delete record',
    deleteRecordConfirm: 'Delete this history record? This action cannot be undone.',
    delete: 'Delete',
    serviceDate: 'Service date',
    serviceDateHint: 'Select when the service took place or will take place:',
    confirmSave: 'Confirm & save',
    deletePetModalTitle: 'Delete pet',
    deletePetConfirm: 'Delete this pet? This action cannot be undone.',
    apptTitle: 'New appointment', apptPet: 'Pet', apptType: 'Appointment type',
    typeVacuna: 'Vaccine', typeMedicamento: 'Medication', typeConsulta: 'Consultation',
    apptNameLabel: 'Name / reason', apptNamePh: 'E.g. Rabies shot',
    apptInfoLabel: 'Additional info', apptInfoPh: 'E.g. Annual dose',
    apptDate: 'Date', saveAppt: 'Save appointment',
    noApptsForPet: 'has no scheduled appointments.',
    noAdditionalInfo: 'No additional info',
    currentDate: 'Current date',
    deletePetConfirmNamed: 'Delete {name}? This action cannot be undone.',
    petDeletedNamed: '{name} was deleted',
    petAddedNamed: '{name} was added successfully',
    rescheduleApptOf: "Reschedule {name}'s appointment",
    cancelApptOf: "Cancel {name}'s appointment",

    toastLang: 'Language set to English',
    toastDark: 'Dark mode enabled', toastLight: 'Light mode enabled',
    toastNotifOn: 'Notifications enabled', toastNotifOff: 'Notifications disabled',
    toastNoPetsDelete: 'No pets to delete',
    toastPetDeleted: 'was deleted',
    toastNoPets: 'No pets registered',
    toastPetAdded: 'was added successfully',
    toastEnterName: "Enter the pet's name",
    toastApptScheduled: 'Appointment scheduled successfully',
    toastFillApptFields: 'Fill in the appointment name and date',
    toastAddPetBeforeAppt: 'Add a pet before creating an appointment',
    toastPickDate: 'Select a new date',
    toastApptRescheduled: 'Appointment rescheduled successfully',
    toastApptCancelled: 'Appointment cancelled',
    toastAddPetBeforeService: 'Add a pet before booking a service',
    toastPickService: 'Select at least one service',
    toastServicesSaved: 'Service(s) added to history',
    toastRecordDeleted: 'Record deleted from history',
    toastNoteSaved: 'Note saved to history',

    infoAboutTitle: 'About us',
    infoAboutBody: `
      <p>At <strong>VidaPet</strong>, we understand that pets aren't just animal companions — they're core members of our families. We started with the mission of giving every pet owner an intuitive, accessible and secure tool to manage the health, care and wellbeing of their furry, feathered or scaled companions.</p>
      <p>We know how complex it can be to keep track of vaccines, medication doses, deworming, vet visits and grooming. That's why we built a platform focused entirely on usability and privacy, centralizing your pets' medical and grooming life in one place.</p>
      <h6 class="fw-bold mt-3 mb-1">Why choose VidaPet?</h6>
      <ul class="ps-3 mb-0">
        <li><strong>100% offline and private:</strong> no internet connection required to work.</li>
        <li><strong>Complete health tracking:</strong> clinical records, an appointment schedule and a date-organized history.</li>
        <li><strong>Multi-device experience:</strong> available as a web app and as a hybrid mobile app.</li>
        <li><strong>Built for the whole family:</strong> a clean, modern interface available in several languages.</li>
      </ul>`,
    infoPolicyTitle: 'Privacy policy',
    infoPolicyBody: `
      <p style="font-size:.75rem;">Last updated: September 3, 2026</p>
      <p>At VidaPet, our users' privacy is our top priority. This policy explains how we handle — or rather, how we <strong>do not</strong> collect or share — your personal information and your pets' data.</p>
      <h6 class="fw-bold mt-3 mb-1">1. Data collection and storage (local architecture)</h6>
      <p>VidaPet runs on a strictly client-side/local (offline-first) architecture. Everything you enter (names, photos, species, breed, birth dates, clinical notes, appointments and services) is stored exclusively on your device using your browser's <code>localStorage</code> or the hybrid app's WebView. VidaPet does not send, process or sell your data to external servers or the cloud.</p>
      <h6 class="fw-bold mt-3 mb-1">2. Mobile device permissions</h6>
      <ul class="ps-3">
        <li><strong>Camera / gallery:</strong> only when attaching a pet photo; processed locally.</li>
        <li><strong>Local notifications:</strong> for appointment and vaccine reminders, generated by the OS itself.</li>
      </ul>
      <h6 class="fw-bold mt-3 mb-1">3. Third-party services and analytics</h6>
      <p>We don't use trackers, advertising cookies, or behavioral analytics. Styles, icons and fonts (Bootstrap, etc.) are bundled into the app — no requests are made to external CDNs.</p>
      <h6 class="fw-bold mt-3 mb-1">4. Security and data retention</h6>
      <p>You're in full control: you can delete pets, history entries or notes at any time. Clearing the cache, uninstalling the app, or a device reset will permanently erase your data. We recommend protecting your device with a PIN, pattern or fingerprint lock.</p>
      <h6 class="fw-bold mt-3 mb-1">5. Children's privacy</h6>
      <p>We do not knowingly collect personally identifiable information from anyone, including children under 13.</p>
      <h6 class="fw-bold mt-3 mb-1">6. Changes to this policy</h6>
      <p>We may update this policy occasionally; changes take effect once published in the app or app stores.</p>
      <h6 class="fw-bold mt-3 mb-1">7. Contact</h6>
      <p class="mb-0">juan.parras@upb.edu.co</p>`,
    infoTermsTitle: 'Terms & conditions',
    infoTermsBody: `
      <p style="font-size:.75rem;">Last updated: September 3, 2026</p>
      <p>By accessing, installing or using VidaPet (the "Application"), you agree to be legally bound by these Terms & Conditions. If you do not agree, please do not use the Application.</p>
      <h6 class="fw-bold mt-3 mb-1">1. Nature of the service</h6>
      <p>VidaPet is a personal management platform for pet care and health: profile registration, appointment and treatment scheduling, a service catalog, and an activity history.</p>
      <p><strong>Veterinary disclaimer:</strong> VidaPet is an organizational and informational tool. It never replaces the consultation, diagnosis or treatment of a licensed veterinarian. In any emergency, seek a professional immediately.</p>
      <h6 class="fw-bold mt-3 mb-1">2. Offline architecture and storage</h6>
      <p>All data is stored locally and exclusively on your device (<code>localStorage</code> / native WebView). VidaPet does not transmit or sync data to any servers of its own. Clearing cache, uninstalling, or device damage results in irreversible data loss; the user is responsible for safeguarding their device.</p>
      <h6 class="fw-bold mt-3 mb-1">3. App store distribution and permissions</h6>
      <p>When downloading VidaPet from Google Play or the Apple App Store, you also agree to those platforms' terms. The app may request local device permissions (e.g. camera/gallery) that are processed strictly on-device and never shared with third parties.</p>
      <h6 class="fw-bold mt-3 mb-1">4. Permitted use and intellectual property</h6>
      <p>You are granted a limited, personal, non-exclusive, non-transferable, revocable, free license for strictly personal, non-commercial use. Code, design, trademarks and graphic assets are the property of VidaPet or used under their respective open-source licenses. Reverse engineering, commercial redistribution, and any illicit use or use that disregards animal welfare are prohibited.</p>
      <h6 class="fw-bold mt-3 mb-1">5. Limitation of liability</h6>
      <p>The Application is provided "as is" and "as available", without warranties of any kind. VidaPet is not liable for direct, indirect or consequential damages — including vet expenses, data loss, or missed treatments due to schedule/reminder failures — arising from use of the app.</p>
      <h6 class="fw-bold mt-3 mb-1">6. Changes</h6>
      <p>We reserve the right to update these terms at any time; continued use after publication constitutes acceptance.</p>
      <h6 class="fw-bold mt-3 mb-1">7. Governing law</h6>
      <p>These terms are governed by the law of the project's jurisdiction of origin, subject to its competent courts for any dispute.</p>
      <h6 class="fw-bold mt-3 mb-1">8. Contact</h6>
      <p class="mb-0">juan.parras@upb.edu.co</p>`,
    infoContactTitle: 'Contact us',
    infoContactBody: 'Having trouble with the app? Write to us at juan.parras@upb.edu.co and we will get back to you shortly.',

    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    dows: ['S','M','T','W','T','F','S'],
    locale: 'en-US'
  }
};

let currentLang = 'es';

export function setCurrentLang(lang){
  currentLang = dict[lang] ? lang : 'es';
}
export function getCurrentLang(){ return currentLang; }

/** Traducción de una clave. Nunca revienta: si falta la clave o el idioma, cae a español y luego a la propia clave. */
export function t(key){
  const table = dict[currentLang] || dict.es;
  if(table[key] !== undefined) return table[key];
  if(dict.es[key] !== undefined) return dict.es[key];
  return key;
}

/** Como t(), pero sustituye {name} por el valor dado (para toasts/mensajes con datos dinámicos). */
export function tn(key, name){
  return t(key).replace('{name}', name);
}

/** Recorre el DOM y aplica las traducciones estáticas marcadas con data-i18n. */
export function applyI18n(root = document){
  root.querySelectorAll('[data-i18n]').forEach(el=>{
    el.innerHTML = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  root.querySelectorAll('[data-i18n-aria]').forEach(el=>{
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.documentElement.setAttribute('lang', currentLang);
}