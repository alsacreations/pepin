# Pepin

## Tabs

### Fonctionnement

Onglets pour panneaux de contenu.

### Paramètres

* `selectorLinks` : sélecteur des liens utilisés en tant qu'onglets (défaut : `.tabs-menu-link`)
* `selectorList`: liste des panneaux de contenu (défaut : `.tabs-menu`)
* `selectorListItems`: panneaux de contenus (défaut : `li`)
* `selectorContent`: sélecteur de contenu (défaut : `.tabs-content-item`)
* `classActive`: classe ajoutée à l'élement actif (défaut : `is-active`)

Certains paramètres sont optionnels selon votre structure. Par exemple si les onglets ne sont pas basés sur une liste `<ul> / <li>`, `selectorList` et `selectorListItems` ne seront pas affectés.

### Exemples

## Usage de base

1. Placer la classe `.js-tabs` sur le conteneur général
2. Utiliser et personnaliser les styles CSS prévus à cet effet.

### Exemple de structure HTML (`<ul> / <li>`)

```html
<div class="tabs js-tabs">
  <ul class="tabs-menu">
    <li class="tabs-menu-item">
      <a href="#tablist1" class="tabs-menu-link is-active">Onglet 1 initialement actif</a>
    </li>
    <li class="tabs-menu-item">
      <a href="#tablist2" class="tabs-menu-link">Onglet 2 inactif</a>
    </li>
    <li class="tabs-menu-item">
      <a href="#tablist3" class="tabs-menu-link">Onglet 3 inactif</a>
    </li>
  </ul>
  <div class="tabs-content">
    <div id="tablist1" class="tabs-content-item">Contenu panneau 1</div>
    <div id="tablist2" class="tabs-content-item">Contenu panneau 2</div>
    <div id="tablist3" class="tabs-content-item">Contenu panneau 3</div>
  </div>
</div>
```

```css
.tabs-menu {
  margin-bottom: 1px;
  list-style: none;
}
.tabs-menu-item {
  display: inline-block;
  margin-right: 1em;
}
.tabs-menu-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
.tabs-menu-link:focus,
.tabs-menu-link:hover {
  color: green;
}
.tabs-menu-link.is-active {
  color: green;
  text-decoration: underline;
}
.tabs-content-item {
  padding: 1em;
  border: 1px solid gray;
}
.tabs-content-item[aria-hidden="true"] {
  visibility: hidden;
  overflow: hidden;
  height: 0;
  min-height: 0;
  padding: 0;
}
.tabs-content-item[aria-hidden="false"] {
  visibility: visible;
}
```

Voir la démonstration dans index-list.html

### Exemple de structure HTML (`<nav>`)

```html
<div class="tabs js-tabs">
  <nav class="tabs-menu">
    <a href="#tabnav1" class="tabs-menu-link is-active">Onglet 1 initialement actif</a>
    <a href="#tabnav2" class="tabs-menu-link">Onglet 2</a>
    <a href="#tabnav3" class="tabs-menu-link">Onglet 3</a>
  </nav>

  <div class="tabs-content">
    <div id="tabnav1" class="tabs-content-item">Contenu 1.</div>
    <div id="tabnav2" class="tabs-content-item">Contenu 2.</div>
    <div id="tabnav3" class="tabs-content-item">Contenu 3.</div>
  </div>
</div>
```

```css
.tabs-menu {
  border-bottom: 2px solid #ddd;
}

.tabs-menu-link {
  display: block;
  margin-bottom: -2px;
  padding: 1em 2em;
  border-bottom: 4px solid transparent;
  text-decoration: none;
  transition: .25s;
  transition-property: color, border, background-color;
}

.tabs-menu-link.is-active {
  border-bottom-color: #ddd;
}
.tabs-menu-link:focus {
  border-bottom-color: olivedrab;
  color: olivedrab;
}

@media (min-width: 576px) {
  .tabs-menu-link {
    display: inline-block;
  }
}

.tabs-content-item {
  padding-top: 10px;
}

.tabs-content-item[aria-hidden="true"] {
  visibility: hidden;
  overflow: hidden;
  height: 0;
  min-height: 0;
  padding: 0;
  border: 0;
}

.tabs-content-item[aria-hidden="false"] {
  visibility: visible;
}
```

Voir la démonstration dans index-nav.html
