const API_URL = "http://localhost:5000/api";


// =========================
// DOM ELEMENTS
// =========================

const noteForm =
  document.getElementById("noteForm");

const titleInput =
  document.getElementById("title");

const contentInput =
  document.getElementById("content");

const notesContainer =
  document.getElementById("notesContainer");

const noteCount =
  document.getElementById("noteCount");

const message =
  document.getElementById("message");

const addNoteButton =
  document.getElementById("addNoteButton");

const clearButton =
  document.getElementById("clearButton");

const searchInput =
  document.getElementById("searchInput");

const sortSelect =
  document.getElementById("sortSelect");

const themeButton =
  document.getElementById("themeButton");

const languageSelect =
  document.getElementById("languageSelect");

const fontSelect =
  document.getElementById("fontSelect");

const titleCounter =
  document.getElementById("titleCounter");

const contentCounter =
  document.getElementById("contentCounter");

const accentButtons =
  document.querySelectorAll(".accent-button");


// =========================
// STATE
// =========================

let allNotes = [];

let currentLanguage =
  localStorage.getItem("quickNotesLanguage") ||
  "en";

let currentFont =
  localStorage.getItem("quickNotesFont") ||
  "Inter";

let currentTheme =
  localStorage.getItem("quickNotesTheme") ||
  "light";

let currentAccent =
  localStorage.getItem("quickNotesAccent") ||
  "#6366f1";

let searchTerm = "";

let sortMode = "newest";

let pinnedNotes =
  JSON.parse(
    localStorage.getItem("quickNotesPinned") ||
    "[]"
  );


// =========================
// TRANSLATIONS
// =========================

const translations = {

  en: {

    appTitle: "Quick Notes",

    appSubtitle:
      "Capture your thoughts instantly.",

    live: "Live",

    language: "Language",

    font: "Font",

    accent: "Accent",

    createEyebrow: "CREATE",

    createTitle:
      "Create a New Note",

    createSubtitle:
      "Turn your thoughts into something worth remembering.",

    titleLabel: "Title",

    contentLabel: "Content",

    titlePlaceholder:
      "Enter note title...",

    contentPlaceholder:
      "Write your note here...",

    characterLimit:
      "Maximum 2000 characters",

    clear: "Clear",

    addNote: "Add Note",

    collection: "COLLECTION",

    yourNotes: "Your Notes",

    searchPlaceholder:
      "Search notes...",

    newest: "Newest first",

    oldest: "Oldest first",

    az: "A → Z",

    za: "Z → A",

    noNotes:
      "No notes yet",

    createFirst:
      "Create your first note above.",

    delete: "Delete",

    loading:
      "Loading notes...",

    loadError:
      "Unable to load notes",

    backendMessage:
      "Make sure the backend server is running.",

    noteCreated:
      "Note created successfully! 🎉",

    noteDeleted:
      "Note deleted successfully! 🗑️",

    createError:
      "Unable to create note.",

    deleteError:
      "Unable to delete note.",

    required:
      "Please enter both title and content.",

    confirmDelete:
      "Are you sure you want to delete this note?",

    noSearchResults:
      "No matching notes",

    tryDifferentSearch:
      "Try a different search term.",

    builtWith:
      "Built with",

    forIdeas:
      "for your ideas",

    notes: "notes",

    note: "note"

  },


  te: {

    appTitle: "క్విక్ నోట్స్",

    appSubtitle:
      "మీ ఆలోచనలను వెంటనే నమోదు చేసుకోండి.",

    live: "లైవ్",

    language: "భాష",

    font: "ఫాంట్",

    accent: "రంగు",

    createEyebrow: "సృష్టించండి",

    createTitle:
      "కొత్త నోట్ సృష్టించండి",

    createSubtitle:
      "మీ ఆలోచనలను గుర్తుంచుకునేలా నమోదు చేసుకోండి.",

    titleLabel: "శీర్షిక",

    contentLabel: "విషయం",

    titlePlaceholder:
      "నోట్ శీర్షికను నమోదు చేయండి...",

    contentPlaceholder:
      "మీ నోట్ ఇక్కడ రాయండి...",

    characterLimit:
      "గరిష్టంగా 2000 అక్షరాలు",

    clear: "క్లియర్",

    addNote: "నోట్ జోడించండి",

    collection: "సేకరణ",

    yourNotes: "మీ నోట్స్",

    searchPlaceholder:
      "నోట్స్ కోసం వెతకండి...",

    newest: "కొత్తవి ముందు",

    oldest: "పాతవి ముందు",

    az: "A → Z",

    za: "Z → A",

    noNotes:
      "ఇంకా నోట్స్ లేవు",

    createFirst:
      "పైన మీ మొదటి నోట్ సృష్టించండి.",

    delete: "తొలగించండి",

    loading:
      "నోట్స్ లోడ్ అవుతున్నాయి...",

    loadError:
      "నోట్స్ లోడ్ చేయడం సాధ్యం కాలేదు",

    backendMessage:
      "బ్యాక్‌ఎండ్ సర్వర్ నడుస్తుందో లేదో చూడండి.",

    noteCreated:
      "నోట్ విజయవంతంగా సృష్టించబడింది! 🎉",

    noteDeleted:
      "నోట్ విజయవంతంగా తొలగించబడింది! 🗑️",

    createError:
      "నోట్ సృష్టించడం సాధ్యం కాలేదు.",

    deleteError:
      "నోట్ తొలగించడం సాధ్యం కాలేదు.",

    required:
      "శీర్షిక మరియు విషయం రెండింటినీ నమోదు చేయండి.",

    confirmDelete:
      "ఈ నోట్‌ను తొలగించాలనుకుంటున్నారా?",

    noSearchResults:
      "సరిపోలే నోట్స్ లేవు",

    tryDifferentSearch:
      "వేరే పదంతో ప్రయత్నించండి.",

    builtWith:
      "మీ ఆలోచనల కోసం",

    forIdeas:
      "ప్రేమతో నిర్మించబడింది",

    notes: "నోట్స్",

    note: "నోట్"

  },


  hi: {

    appTitle: "क्विक नोट्स",

    appSubtitle:
      "अपने विचार तुरंत लिखें।",

    live: "लाइव",

    language: "भाषा",

    font: "फ़ॉन्ट",

    accent: "रंग",

    createEyebrow: "बनाएं",

    createTitle:
      "नया नोट बनाएं",

    createSubtitle:
      "अपने विचारों को याद रखने के लिए लिखें।",

    titleLabel: "शीर्षक",

    contentLabel: "सामग्री",

    titlePlaceholder:
      "नोट का शीर्षक लिखें...",

    contentPlaceholder:
      "अपना नोट यहां लिखें...",

    characterLimit:
      "अधिकतम 2000 अक्षर",

    clear: "साफ़ करें",

    addNote: "नोट जोड़ें",

    collection: "संग्रह",

    yourNotes: "आपके नोट्स",

    searchPlaceholder:
      "नोट्स खोजें...",

    newest: "नए पहले",

    oldest: "पुराने पहले",

    az: "A → Z",

    za: "Z → A",

    noNotes:
      "अभी कोई नोट नहीं",

    createFirst:
      "ऊपर अपना पहला नोट बनाएं।",

    delete: "हटाएं",

    loading:
      "नोट्स लोड हो रहे हैं...",

    loadError:
      "नोट्स लोड नहीं हो सके",

    backendMessage:
      "सुनिश्चित करें कि बैकएंड सर्वर चल रहा है।",

    noteCreated:
      "नोट सफलतापूर्वक बनाया गया! 🎉",

    noteDeleted:
      "नोट सफलतापूर्वक हटाया गया! 🗑️",

    createError:
      "नोट नहीं बनाया जा सका।",

    deleteError:
      "नोट नहीं हटाया जा सका।",

    required:
      "शीर्षक और सामग्री दोनों दर्ज करें।",

    confirmDelete:
      "क्या आप इस नोट को हटाना चाहते हैं?",

    noSearchResults:
      "कोई मिलान वाला नोट नहीं",

    tryDifferentSearch:
      "कोई दूसरा शब्द आज़माएं।",

    builtWith:
      "आपके विचारों के लिए",

    forIdeas:
      "प्यार से बनाया गया",

    notes: "नोट्स",

    note: "नोट"

  },


  es: {

    appTitle: "Notas Rápidas",

    appSubtitle:
      "Captura tus pensamientos al instante.",

    live: "En vivo",

    language: "Idioma",

    font: "Fuente",

    accent: "Color",

    createEyebrow: "CREAR",

    createTitle:
      "Crear una nueva nota",

    createSubtitle:
      "Convierte tus pensamientos en algo memorable.",

    titleLabel: "Título",

    contentLabel: "Contenido",

    titlePlaceholder:
      "Escribe el título...",

    contentPlaceholder:
      "Escribe tu nota aquí...",

    characterLimit:
      "Máximo 2000 caracteres",

    clear: "Limpiar",

    addNote: "Añadir nota",

    collection: "COLECCIÓN",

    yourNotes: "Tus notas",

    searchPlaceholder:
      "Buscar notas...",

    newest: "Más recientes",

    oldest: "Más antiguas",

    az: "A → Z",

    za: "Z → A",

    noNotes:
      "No hay notas todavía",

    createFirst:
      "Crea tu primera nota arriba.",

    delete: "Eliminar",

    loading:
      "Cargando notas...",

    loadError:
      "No se pudieron cargar las notas",

    backendMessage:
      "Asegúrate de que el servidor backend esté funcionando.",

    noteCreated:
      "¡Nota creada correctamente! 🎉",

    noteDeleted:
      "¡Nota eliminada correctamente! 🗑️",

    createError:
      "No se pudo crear la nota.",

    deleteError:
      "No se pudo eliminar la nota.",

    required:
      "Introduce el título y el contenido.",

    confirmDelete:
      "¿Seguro que quieres eliminar esta nota?",

    noSearchResults:
      "No hay notas coincidentes",

    tryDifferentSearch:
      "Prueba con otro término.",

    builtWith:
      "Creado con",

    forIdeas:
      "para tus ideas",

    notes: "notas",

    note: "nota"

  },


  fr: {

    appTitle: "Notes Rapides",

    appSubtitle:
      "Capturez vos pensées instantanément.",

    live: "En direct",

    language: "Langue",

    font: "Police",

    accent: "Couleur",

    createEyebrow: "CRÉER",

    createTitle:
      "Créer une nouvelle note",

    createSubtitle:
      "Transformez vos pensées en souvenirs utiles.",

    titleLabel: "Titre",

    contentLabel: "Contenu",

    titlePlaceholder:
      "Entrez le titre...",

    contentPlaceholder:
      "Écrivez votre note ici...",

    characterLimit:
      "Maximum 2000 caractères",

    clear: "Effacer",

    addNote: "Ajouter une note",

    collection: "COLLECTION",

    yourNotes: "Vos notes",

    searchPlaceholder:
      "Rechercher des notes...",

    newest: "Plus récentes",

    oldest: "Plus anciennes",

    az: "A → Z",

    za: "Z → A",

    noNotes:
      "Aucune note",

    createFirst:
      "Créez votre première note ci-dessus.",

    delete: "Supprimer",

    loading:
      "Chargement des notes...",

    loadError:
      "Impossible de charger les notes",

    backendMessage:
      "Vérifiez que le serveur backend fonctionne.",

    noteCreated:
      "Note créée avec succès ! 🎉",

    noteDeleted:
      "Note supprimée avec succès ! 🗑️",

    createError:
      "Impossible de créer la note.",

    deleteError:
      "Impossible de supprimer la note.",

    required:
      "Veuillez saisir le titre et le contenu.",

    confirmDelete:
      "Voulez-vous vraiment supprimer cette note ?",

    noSearchResults:
      "Aucune note correspondante",

    tryDifferentSearch:
      "Essayez un autre terme.",

    builtWith:
      "Créé avec",

    forIdeas:
      "pour vos idées",

    notes: "notes",

    note: "note"

  }

};


// =========================
// TRANSLATION FUNCTION
// =========================

function translate(key) {

  return (
    translations[currentLanguage]?.[key] ||
    translations.en[key] ||
    key
  );

}


// =========================
// APPLY LANGUAGE
// =========================

function applyLanguage() {

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {

      const key =
        element.getAttribute("data-i18n");

      element.textContent =
        translate(key);

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((element) => {

      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      element.placeholder =
        translate(key);

    });


  renderNotes();

  localStorage.setItem(
    "quickNotesLanguage",
    currentLanguage
  );

}


// =========================
// THEME
// =========================

function applyTheme() {

  if (currentTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

  } else {

    document.body.classList.remove("dark");

    themeButton.textContent = "🌙";

  }

  localStorage.setItem(
    "quickNotesTheme",
    currentTheme
  );

}


// =========================
// FONT
// =========================

function applyFont() {

  document.documentElement.style
    .setProperty(
      "--font-family",
      `"${currentFont}", sans-serif`
    );

  localStorage.setItem(
    "quickNotesFont",
    currentFont
  );

}


// =========================
// ACCENT
// =========================

function applyAccent() {

  document.documentElement.style
    .setProperty(
      "--accent",
      currentAccent
    );

  const darkerAccent =
    darkenColor(currentAccent);

  document.documentElement.style
    .setProperty(
      "--accent-dark",
      darkerAccent
    );

  accentButtons.forEach(
    (button) => {

      button.classList.toggle(
        "active",
        button.dataset.color ===
          currentAccent
      );

    }
  );


  localStorage.setItem(
    "quickNotesAccent",
    currentAccent
  );

}


// =========================
// DARKEN COLOR
// =========================

function darkenColor(hex) {

  const value =
    hex.replace("#", "");

  const r =
    parseInt(value.substring(0, 2), 16);

  const g =
    parseInt(value.substring(2, 4), 16);

  const b =
    parseInt(value.substring(4, 6), 16);

  const darkerR =
    Math.max(0, r - 35);

  const darkerG =
    Math.max(0, g - 35);

  const darkerB =
    Math.max(0, b - 35);

  return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;

}


// =========================
// SHOW MESSAGE
// =========================

function showMessage(
  text,
  isError = false
) {

  message.textContent = text;

  message.className =
    isError
      ? "message error"
      : "message success";


  setTimeout(() => {

    message.textContent = "";

    message.className =
      "message";

  }, 3000);

}


// =========================
// DATE FORMAT
// =========================

function formatDate(timestamp) {

  const date =
    new Date(timestamp);

  return date.toLocaleString(
    currentLanguage === "te"
      ? "te-IN"
      : currentLanguage === "hi"
      ? "hi-IN"
      : currentLanguage === "es"
      ? "es-ES"
      : currentLanguage === "fr"
      ? "fr-FR"
      : "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );

}


// =========================
// LOAD NOTES
// =========================

async function loadNotes() {

  try {

    notesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          ⏳
        </div>

        <h3>
          ${translate("loading")}
        </h3>
      </div>
    `;


    const response =
      await fetch(
        `${API_URL}/notes`
      );


    if (!response.ok) {

      throw new Error(
        "Failed to load notes"
      );

    }


    const result =
      await response.json();


    allNotes =
      result.data || [];


    renderNotes();

  } catch (error) {

    console.error(error);


    notesContainer.innerHTML = `
      <div class="empty-state">

        <div class="empty-icon">
          ⚠️
        </div>

        <h3>
          ${translate("loadError")}
        </h3>

        <p>
          ${translate("backendMessage")}
        </p>

      </div>
    `;


    noteCount.textContent =
      `0 ${translate("notes")}`;

  }

}


// =========================
// FILTER + SORT
// =========================

function getVisibleNotes() {

  let notes =
    [...allNotes];


  if (searchTerm) {

    const search =
      searchTerm.toLowerCase();


    notes =
      notes.filter(
        (note) =>

          note.title
            .toLowerCase()
            .includes(search) ||

          note.content
            .toLowerCase()
            .includes(search)
      );

  }


  notes.sort(
    (a, b) => {

      const aPinned =
        pinnedNotes.includes(a.id);

      const bPinned =
        pinnedNotes.includes(b.id);


      if (
        aPinned &&
        !bPinned
      ) {

        return -1;

      }


      if (
        !aPinned &&
        bPinned
      ) {

        return 1;

      }


      if (sortMode === "newest") {

        return (
          new Date(b.created_at) -
          new Date(a.created_at)
        );

      }


      if (sortMode === "oldest") {

        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        );

      }


      if (sortMode === "az") {

        return a.title
          .localeCompare(b.title);

      }


      if (sortMode === "za") {

        return b.title
          .localeCompare(a.title);

      }


      return 0;

    }
  );


  return notes;

}


// =========================
// RENDER NOTES
// =========================

function renderNotes() {

  const notes =
    getVisibleNotes();


  const total =
    allNotes.length;


  noteCount.textContent =
    `${total} ${
      total === 1
        ? translate("note")
        : translate("notes")
    }`;


  if (notes.length === 0) {

    if (
      searchTerm &&
      total > 0
    ) {

      notesContainer.innerHTML = `
        <div class="empty-state">

          <div class="empty-icon">
            🔍
          </div>

          <h3>
            ${translate("noSearchResults")}
          </h3>

          <p>
            ${translate("tryDifferentSearch")}
          </p>

        </div>
      `;

    } else {

      notesContainer.innerHTML = `
        <div class="empty-state">

          <div class="empty-icon">
            📝
          </div>

          <h3>
            ${translate("noNotes")}
          </h3>

          <p>
            ${translate("createFirst")}
          </p>

        </div>
      `;

    }

    return;

  }


  notesContainer.innerHTML =
    notes
      .map(
        (note) => {

          const isPinned =
            pinnedNotes.includes(
              note.id
            );


          return `

            <article
              class="note-card"
            >

              <button
                class="pin-button ${
                  isPinned
                    ? "pinned"
                    : ""
                }"
                onclick="togglePin(${note.id})"
                title="Pin note"
              >
                ${isPinned ? "📌" : "📍"}
              </button>


              <h3>
                ${escapeHTML(note.title)}
              </h3>


              <p class="note-content">
                ${escapeHTML(note.content)}
              </p>


              <div class="note-footer">

                <span class="note-date">
                  ${formatDate(
                    note.created_at
                  )}
                </span>


                <button
                  class="delete-button"
                  onclick="deleteNote(${note.id})"
                >
                  🗑
                  ${translate("delete")}
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text;

  return div.innerHTML;

}


// =========================
// CREATE NOTE
// =========================

noteForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const title =
      titleInput.value.trim();


    const content =
      contentInput.value.trim();


    if (
      !title ||
      !content
    ) {

      showMessage(
        translate("required"),
        true
      );

      return;

    }


    try {

      addNoteButton.disabled =
        true;


      addNoteButton.innerHTML =
        "⏳ Adding...";


      const response =
        await fetch(
          `${API_URL}/notes`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                title,
                content
              })

          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.error ||
            "Failed to create note"
        );

      }


      showMessage(
        translate("noteCreated")
      );


      noteForm.reset();


      updateCounters();


      await loadNotes();


    } catch (error) {

      console.error(error);


      showMessage(
        translate("createError"),
        true
      );


    } finally {

      addNoteButton.disabled =
        false;


      addNoteButton.innerHTML =
        `<span>➕</span>
         <span>
           ${translate("addNote")}
         </span>`;

    }

  }
);


// =========================
// DELETE NOTE
// =========================

async function deleteNote(id) {

  const confirmed =
    confirm(
      translate(
        "confirmDelete"
      )
    );


  if (!confirmed) {

    return;

  }


  try {

    const response =
      await fetch(
        `${API_URL}/notes/${id}`,
        {
          method: "DELETE"
        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.error ||
          "Failed to delete note"
      );

    }


    pinnedNotes =
      pinnedNotes.filter(
        (noteId) =>
          noteId !== id
      );


    savePinnedNotes();


    showMessage(
      translate("noteDeleted")
    );


    await loadNotes();


  } catch (error) {

    console.error(error);


    showMessage(
      translate("deleteError"),
      true
    );

  }

}


// =========================
// PIN NOTE
// =========================

function togglePin(id) {

  if (
    pinnedNotes.includes(id)
  ) {

    pinnedNotes =
      pinnedNotes.filter(
        (noteId) =>
          noteId !== id
      );

  } else {

    pinnedNotes.push(id);

  }


  savePinnedNotes();

  renderNotes();

}


function savePinnedNotes() {

  localStorage.setItem(
    "quickNotesPinned",
    JSON.stringify(
      pinnedNotes
    )
  );

}


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
  "input",
  (event) => {

    searchTerm =
      event.target.value.trim();

    renderNotes();

  }
);


// =========================
// SORT
// =========================

sortSelect.addEventListener(
  "change",
  (event) => {

    sortMode =
      event.target.value;

    renderNotes();

  }
);


// =========================
// CLEAR FORM
// =========================

clearButton.addEventListener(
  "click",
  () => {

    noteForm.reset();

    updateCounters();

    titleInput.focus();

  }
);


// =========================
// COUNTERS
// =========================

function updateCounters() {

  titleCounter.textContent =
    `${titleInput.value.length} / 100`;


  contentCounter.textContent =
    `${contentInput.value.length} / 2000`;

}


titleInput.addEventListener(
  "input",
  updateCounters
);


contentInput.addEventListener(
  "input",
  updateCounters
);


// =========================
// THEME BUTTON
// =========================

themeButton.addEventListener(
  "click",
  () => {

    currentTheme =
      currentTheme === "light"
        ? "dark"
        : "light";

    applyTheme();

  }
);


// =========================
// LANGUAGE SELECT
// =========================

languageSelect.value =
  currentLanguage;


languageSelect.addEventListener(
  "change",
  (event) => {

    currentLanguage =
      event.target.value;

    applyLanguage();

  }
);


// =========================
// FONT SELECT
// =========================

fontSelect.value =
  currentFont;


fontSelect.addEventListener(
  "change",
  (event) => {

    currentFont =
      event.target.value;

    applyFont();

  }
);


// =========================
// ACCENT BUTTONS
// =========================

accentButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        currentAccent =
          button.dataset.color;

        applyAccent();

      }
    );

  }
);


// =========================
// INITIAL SETTINGS
// =========================

applyTheme();

applyFont();

applyAccent();

applyLanguage();

updateCounters();


// =========================
// INITIAL LOAD
// =========================

loadNotes();


// =========================
// GLOBAL DELETE ACCESS
// =========================

window.deleteNote =
  deleteNote;


window.togglePin =
  togglePin;