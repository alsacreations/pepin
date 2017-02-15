# Pepin

## Accordion

### Fonctionnement

Lorsque la classe `.js-accordion` est utilisée sur un élément HTML, ses petits-enfants de classe `.js-accordion-header` deviennent les en-têtes et ceux de classe `.js-accordion-panel` les panneaux de contenu.

La classe `.visually-hidden` est appliquée, il faut que celle-ci soit déjà intégrée à votre feuille de styles, ou ajoutée.

Il peut y en avoir plusieurs par page.

### Paramètres

* `selectorHeader` : sélecteur d'en-tête (défaut : '.js-accordion-header')
* `selectorPanel` : sélecteur de panneau (défaut : '.js-accordion-panel')
* `selectorIcon` : sélecteur d'icône s'il y a lieu (défaut : '.icon-arrow')
* `classIconActive` : classe d'icône active (défaut : 'to-bottom')
* `classHidden` : classe de panneau caché (défaut : 'visually-hidden')
* `autoScroll` : faire défiler automatiquement au contenu actif (défaut : true)
* `scrollSpeed` : vitesse de défilement (défaut : 300)
* `mobileMaxWidth` : limite à partir de laquelle considérer que l'on est en mobile et que le comportement change (défaut : 768)

### Exemples

## Usage de base

1. Placer la classe `.js-accordion` sur le conteneur parent
2. Placer la classe `.js-accordion-header` sur les en-têtes
3. Placer la classe `.js-accordion-panel` sur les panneaux de contenu

```html
<div class="js-accordion">
  <h2 class="js-accordion-header">xxx <i class="icon-arrow" aria-hidden="true"></i></h2>
  <div class="js-accordion-panel">xxx</div>
</div>
```

Voir la démonstration dans index.html
