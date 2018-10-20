# Pepin

## Filter

### Fonctionnement

* filter-data : Permet de filtrer à l'affichage des données déjà présentes dans le document HTML, par leur valeur ou leurs attributs data-*.
* filter-directory : Version alternative pour usage plus spécifique orienté annuaire de personnes.

Note : ce plugin ne fonctionne pas dans un élément "conteneur" principal comprenant les sous-éléments à filtrer et les choix, mais associe des éléments multiples sur la page pouvant être totalement sans parenté pour plus de souplesse. S'il s'agit de lier plus spécifiquement un filtre à une liste et/ou d'exploiter plusieurs fois le plugin sur la même page, tout se déroulera dans le nom des sélecteurs utilisés.

### Paramètres

* `selectorItemsToFilter` : sélecteur des éléments à filtrer dans le conteneur du plugin (défaut : `.js-filter-item`)
* `filterDataAttribute` : attribut data-* servant de base au filtre (défaut : `filterValue` correspond à `data-filter-value` côté HTML)
* `classHidden` : classe à ajouter aux éléments filtrés (défaut : `js-hidden`)
* `eventFilter` : événement à surveiller (défaut : `change` convient bien aux `<select>` pourrait aussi être `keyup` pour un champ input texte)
* `selectorCount` : sélecteur de l'élément recevant le compte total des éléments filtrés (défaut : `.js-filter-count`)
* `selectorTotal` : sélecteur de l'élément recevant le compte total des éléments (défaut : `.js-filter-total`)
* `filterOperator` : opération de comparaison appliquée au filtre (défaut : `==`)

### Exemple d'usage de base

1. Placer la classe `.js-filter-data` sur un élément de formulaire permettant de choisir une valeur (input texte, `<select>`, etc)
2. Choisir un événement lui correspondant
3. Ajouter les classes `.js-filter-item` sur les éléments à filtrer
4. Leur conférer une valeur de filtre avec un attribut HTML `data-filter-value`
5. Optionnel : choisir un opérateur de comparaison et des sélecteurs d'éléments devant recevoir les compteurs (filtré/total).

Voir la démonstration dans index.html
