# Pepin

## Typosize

### Fonctionnement

Lorsque l'élément ciblé par le plugin est cliqué, ajoute/supprime la classe définie au `<body>` pour changer ses styles et notamment la taille de police.

Il peut y en avoir plusieurs par page.

Pensez à donner un intitulé explicite aux boutons d'action, par exemple en utilisant `arial-label`.

Des attributs `data-alt-label` et `data-alt-content` définissent le texte et le label aria alternatifs lorsque l'élément a été actionné (afin que l'intitulé devienne _diminuer_ plutôt qu'_agrandir_).

### Paramètres

* `classActive` : classe à ajouter/supprimer à l'élément ciblé par _target_ lorsque l'élément du plugin est cliqué (défaut : `typosize-big`)
* `target` : sélecteur de l'élément à modifier (défaut : `body`)

### Exemples

## Usage de base

1. Placer la classe `.js-typosize` sur un bouton (de préférence) ou un lien
2. Définir les styles de `.typosize-big` dans la feuille de styles CSS

```html
<button type="button" class="js-typosize" title="Agrandir/réduire la taille de police">aA</button>
```

## Usage avec paramètres

Par attributs data-* on peut moduler les paramètres par défaut.

```html
<button type="button" class="js-typosize" title="Agrandir/réduire la taille de police" data-class-enabled="bigbigbig" data-target=".container">aA</button>
```

Voir la démonstration dans index.html
