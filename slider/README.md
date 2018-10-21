# Pepin

## Slider

### Fonctionnement

Défilement de contenus (images) avec effet de déplacement par transitions CSS.
Fait appel à <https://hammerjs.github.io/> pour l'activation des événements touch (écran tactile).

### Paramètres

* `selectorLinks` : sélecteur ciblant les liens (défaut : `.slider-pagination-list-item`)
* `selectorWrapper` : sélecteur ciblant le conteneur du slider (défaut : `.slider-wrapper`)
* `selectorItem` : sélecteur ciblant les items du slider (défaut : `.slider-item`)
* `selectorItemTitle` : sélecteur ciblant les éléments de titre des items (défaut : `.slider-item-title`)
* `selectorControlBtn` : sélecteur ciblant les boutons de contrôle (défaut : `.slider-control-btn`)
* `classControlBtnPlay` : sélecteur ciblant le bouton de lecture (défaut : `slider-control-btn-play`)
* `classControlBtnPause` : sélecteur ciblant le bouton de pause (défaut : `slider-control-btn-pause`)
* `selectorControlPrev` : sélecteur ciblant le bouton précédent (défaut : `.slider-item-control-prev`)
* `selectorControlNext` : sélecteur ciblant le bouton suivant (défaut : `.slider-item-control-next`)
* `classActive` : classe appliquée sur un item actif (défaut : `slider-item-active`)
* `classActiveLink` : classe appliquée sur un lien actif (défaut : `slider-pagination-list-link-active`)
* `autoTimer` : délai automatique entre chaque défilement (défaut : `1500`)
* `autoPlay` : lecture automatique au chargement (défaut : `false`)
* `loop` : boucler si le défilement arrive à la fin (défaut : `true`)
* `touchEnabled` : comportement au touch (tactile) activé (défaut : `true`)
* `touching` : en train d'être contrôlé de manière tactile (défaut : `false`)
* `touchDelta` : valeur de défilement au touch (défaut : `50`)
* `animating` : en cours d'animation (défaut : `false`)
* `activeIndex` : index de l'élément/item actif  (défaut : `0`)

### Exemple

Voir index.html

## Usage de base

1. Placer la classe `.js-slider` sur l'élément qui contient les items
2. Utiliser l'exemple de code HTML fourni (respecter la structure des classes).
3. Configurer les dimensions du slider dans la taille des images et dans la feuille de styles.
4. Affiner les paramètres les plus communs tels que `autoTimer`, `autoPlay` et `loop`

Voir la démonstration dans index.html
