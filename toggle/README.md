# Pepin

## Toggle-trigger

### Fonctionnement

Changements de classe sur un élément B déclenchés par un élément A.

### Paramètres

* `events`: événements à surveiller, liste séparée par des espaces (défaut : `click`)
* `classActive`: classe ajoutée à l'élement actif (défaut : `is-active`)
* `classToggle`: classe ajoutée/enlevée à l'élement cible (défaut : `js-hidden`)
* `useChecked`: utiliser l'état "coché" pour déterminer si l'élément est actif - fonctionne avec les inputs checkbox/radio (défaut : `false`)
* `selectorTarget`: sélecteur de la cible à atteindre, affectée par classToggle
* `selectorTargetInvert`: sélecteur de la cible inversée (la classe est ajoutée alors qu'elle est supprimée de l'élément cible selectorTarget, et inversement)
* `selectorToggleInvert`: cible inversée à déclencher - utile pour les listes déroulantes dont un seul élément doit être actif à la fois
* `selectorContainer`: sélecteur de conteneur si la cible doit être restreinte à un ancêtre commun
* `autoOffEvent`: événement extérieur désactivant le toggle, par exemple un clic sur la racine `<html>` pour fermer un menu déployé (défaut : `false`, exemple : `click`)

### Exemples

## Usage de base

1. Placer la classe `.js-toggle-trigger` sur l'élément déclencheur (ex : un bouton, un lien)
2. Définir l'attribut `data-selector-target` contenant un sélecteur vers un autre élément cible du document concerné par l'ajout/suppression de classe
3. Définir l'attribut `data-class-toggle` précisant la classe qui sera ajoutée/supprimée sur l'élément cible

Voir la démonstration dans index.html
