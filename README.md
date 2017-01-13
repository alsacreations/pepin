# Pepin

Pepin est un modèle (parmi tant d'autres) de plugin jQuery modulaire.

Il est accompagné d'exemples d'implémentations pratiques.

## Intérêt

* Comporte des paramètres par défaut.
* Lit les paramètres additionnels ou remplace les valeurs par défaut depuis les attributs `data-*`  HTML de l'élément sur lequel il est appliqué, ou depuis un objet passé en argument à l'initialiation.
* Peut comporter des méthodes privées/publiques.
* Est protégé pour ne pas s'exécuter plusieurs fois (par erreur) sur le même élément.
* Accès facile aux paramètres internes et autres méthodes.

## Usage

* Modifier le nom du plugin `pluginName`.
* Modifier la classe HTML des éléments sur lequel il peut s'appliquer `.js-plugin-elements`.
* Compléter les paramètres par défaut `defaults`.
* Compléter les méthodes privées et publiques, notamment la gestion des événements s'il y en a avec `registerEvents`.

```javascript
$(document).ready(function() {

    // Lie le plugin aux éléments
    $('.js-plugin-elements').pluginName();

});
```

### Variantes

```javascript
$(document).ready(function() {

    // Lie le plugin aux éléments
    $('.js-plugin-elements').pluginName({'chou': 'croute'});

    // Appel de méthode publique
    $('.js-plugin-elements').data('pluginName').doSomething();

    // Récupère la valeur de paramètres
    $('.js-plugin-elements').data('pluginName').settings.parameter;

});
```

### Faire communiquer deux plugins indépendants

* Placer un écouteur d'événement personnalisé dans le premier plugin dans la section `registerEvents`.
* Le déclencher par le deuxième lorsque c'est nécessaire avec un appel de `trigger()`.

Premier, sur l'élément de classe `.first` :
```javascript
var registerEvents = function() {
  // ... Other basic events
  $element.off('myCustomEvent').on('myCustomEvent', function() {
    // Do something when called from other script
  });
}
```

Second sur l'élément `.second` :
```javascript
// ... Code stuff
$('.first').trigger('myCustomEvent');
// ... Code stuff
```


## Inspirations

* <https://github.com/jquery-boilerplate>
* <http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/>

# Plugins

Plusieurs scripts/plugins jQuery sont proposés comme base de travail :

* Accordion : Blocs déployables en accordéon
* Anchor : Ancres provoquant un scroll vers la destination
* Filter :
  * Filter-data : Filtrage de données sur la page
  * Filter-directory : Auto-complétion et recherche d'éléments sur la page
* Offcanvas : Principe de déploiement off-canvas (ex : menu)
* Selection : Eléments parents sélectionnables (ex : checkbox/radio)
* Slider : Défilement de contenu de type carousel
* Slideshow : Défilement de contenu de type diaporama
* Sticky : Elément fixé en sticky au scroll
* Tabs : Onglets
* Toggle :
  * Toggle-trigger : Déclencheurs d'ajout/suppression de classe, de gestion d'éléments à distance
  * Toggle-tablecells : Agir sur les cellules d'un tableau
* Typosize : Affectation de styles au body, par exemple pour agrandir/réduire la taille des polices

## TODO

* Documentation avancée de ces plugins et de leurs paramètres/méthodes
* Exemples de code HTML par défaut

### Scripts à venir

* Liens d'évitement
* Liste/menu déroulant (à X niveaux)
* Menu horizontal déroulant
* Modale
* Tooltip
* Back to top
* Navigation responsive
* Bandeau cookie
* Autocomplete
* Smooth scroll
