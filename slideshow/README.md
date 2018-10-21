# Pepin

## Slideshow

### Fonctionnement

Défilement de contenus (images) avec effet de fondu par transitions CSS.
Fait appel à <https://hammerjs.github.io/> pour l'activation des événements touch (écran tactile).

### Paramètres

* `selectorWrapper`: sélecteur ciblant le conteneur (défaut : `.slideshow-wrapper`)
* `selectorItem`: sélecteur ciblant les items (défaut : `.slideshow-item`)
* `selectorItemLink`: sélecteur ciblant les liens des items (défaut : `.slideshow-item-link`)
* `selectorControlPrev`: sélecteur ciblant le bouton précédent (défaut : `.slideshow-item-control-left`)
* `selectorControlNext`: sélecteur ciblant le bouton suivant (défaut : `.slideshow-item-control-right`)
* `selectorThumbnailsPrev`: sélecteur ciblant la vignette précédente (défaut : `.slideshow-thumbnails-control-left`)
* `selectorThumbnailsNext`: sélecteur ciblant la vignette suivante (défaut : `.slideshow-thumbnails-control-right`)
* `selectorThumbnailsLinks`: sélecteur ciblant les liens des vignettes (défaut : `.slideshow-thumbnails-list-link`)
* `selectorPaginationLinks`: sélecteur ciblant les liens de la pagination (défaut : `.slideshow-pagination-list-link`)
* `selectorThumbnailsList`: sélecteur ciblant la liste des vignettes (défaut : `.slideshow-thumbnails-list`)
* `selectorThumbnailsItem`: sélecteur ciblant les vignettes dans leur liste (défaut : `.slideshow-thumbnails-list-item`)
* `selectorThumbnailsWrapper`: sélecteur ciblant le conteneur des vignettes (défaut : `.slideshow-thumbnails-wrapper`)
* `classActiveLink`: classe ajoutée au lien actif (défaut : `is-active`)
* `classActivePaginationLink`: classe ajoutée au lien de pagination actif (défaut : `slideshow-pagination-list-link-active`)
* `touchEnabled` : comportement au touch (tactile) activé (défaut : `true`)
* `touching` : en train d'être contrôlé de manière tactile (défaut : `false`)
* `touchDelta` : valeur de défilement au touch (défaut : `50`)
* `animating` : en cours d'animation (défaut : `false`)
* `loop` : boucler si le défilement arrive à la fin (défaut : `true`)
* `activeIndex`: index de l'item affiché (défaut : `0`)
* `activeThumbnailsIndex`: index de la vignette affichée (défaut : `0`)

### Exemple

Voir index.html

## Usage de base

1. Placer la classe `.js-slideshow` sur l'élément qui contient les items
2. Utiliser l'exemple de code HTML fourni (respecter la structure des classes).
3. Configurer les dimensions dans la taille des images et dans la feuille de styles.
4. Affiner les paramètres les plus communs tels que `touchEnabled` et `loop`

Voir la démonstration dans index.html
