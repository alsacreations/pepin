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

### Exemples

## Usage de base

1. Placer la classe `.js-tabs` sur le conteneur général
2. Utiliser et personnaliser les styles CSS prévus à cet effet.

```html
<div class="tabs js-tabs">
  <ul class="tabs-menu">
    <li class="tabs-menu-item">
      <a href="#tab1" class="tabs-menu-link is-active">Onglet 1 actif</a>
    </li>
    <li class="tabs-menu-item">
      <a href="#tab2" class="tabs-menu-link">Onglet 2 inactif</a>
    </li>
    <li class="tabs-menu-item">
      <a href="#tab3" class="tabs-menu-link">Onglet 3 inactif</a>
    </li>
  </ul>
  <div class="tabs-content">
    <div id="tab1" class="tabs-content-item">Contenu panneau 1</div>
    <div id="tab2" class="tabs-content-item">Contenu panneau 2</div>
    <div id="tab3" class="tabs-content-item">Contenu panneau 3</div>
  </div>
</div>
```

```css
.tabs-menu {
  list-style: none;
}
.tabs-menu-item {
  display: inline-block;
  margin-right: 1em;
}
.tabs-menu-link {
  display: block;
  text-decoration: none;
}
.tabs-menu-link:focus, .tabs-menu-link:hover {
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

Voir la démonstration dans index.html
