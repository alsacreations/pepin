# Pepin

Pepin est un modèle (parmi tant d'autres) de plugin jQuery modulaire. Il est accompagné d'exemples d'implémentations pratiques et pourrait dans le futur être adapté en JavaScript Vanilla (sans dépendance vis-à-vis d'un framework).

Voir aussi les [Snippets](https://github.com/alsacreations/snippets) et [Guidelines](https://github.com/alsacreations/guidelines)

## Intérêt

* Comporte des paramètres par défaut.
* Lit les paramètres additionnels ou remplace les paramètres par défaut depuis les attributs `data-*`  HTML de l'élément sur lequel il est appliqué, ou depuis un objet JavaScript passé en argument à l'initialiation.
* Peut comporter des méthodes privées (internes au plugin) / publiques (exécutables depuis d'autres scripts).
* Est protégé pour ne pas s'exécuter plusieurs fois (par erreur) sur le même élément.
* Accès facile aux paramètres internes et autres méthodes.

Les scripts fournis font au maximum attention à leur réutilisabilité (plusieurs fois sur un même document sans conflit) et à leur capacité à se ré-adapter si leur structure change (ex : ajout d'un item dans des onglets, dans un menu accordéon).

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

| Nom  | Description | Statut | Doc |
| ------------- | ------------- | ------------- | ------------- |
| Accordion | Blocs déployables en accordéon  | OK | OK |
| Filter | Filtrage de données sur la page / Auto-complétion et recherche d'éléments sur la page | OK | TODO |
| Offcanvas | Principe de déploiement off-canvas (ex : menu) | En cours | TODO |
| Selection | Eléments parents sélectionnables (ex : checkbox/radio) | OK | OK |
| Slider | Défilement de contenu de type carousel | OK | TODO |
| Slideshow | Défilement de contenu de type diaporama | OK | En cours |
| SmoothScroll | Défilement de page (vertical en général) suite au clic sur un lien/bouton | OK | OK |
| Sticky | Elément fixé en sticky au scroll | OK | TODO |
| Tabs | Onglets | OK | OK |
| Toggle | Déclencheurs d'ajout/suppression de classe, de gestion d'éléments à distance (ex : afficher/masquer un élément, listes déroulantes, agir sur les cellules d'un tableau, etc) | OK | OK |
| Typosize | Affectation de styles au body, par exemple pour agrandir/réduire la taille des polices | OK | OK |
| - | Liens d'évitement | Prévu | - |
| - | Menu déroulant | Prévu | - |
| - | Modale | Prévu | - |
| - | Tooltip | Prévu | - |
| - | Navigation responsive | Prévu | - |
| - | Autocomplete | Prévu | - |
