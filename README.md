# Pepin

Pepin est un modèle (parmi tant d'autres) de plugin jQuery modulaire.

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

## Inspirations

* <https://github.com/jquery-boilerplate>
* <http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/>

