# Pepin

## Copy

### Fonctionnement

Copie le contenu (innerHTML ou attribut value) d'un élément vers un autre.

### Paramètres

* `copyEvent` : événement qui initie le déclenchement de la copie sur l'élément d'origine (défaut : `click`)
* `copyTarget` : sélecteur visant l'élément cible qui va recevoir la copie
* `copySourceMode` : mode de copie depuis la source, `text` (recopie du contenu texte de l'élément d'origine) ou `value` (recopie de la valeur de l'attribut value dans l'élément d'origine) (défaut : `text`)
* `copyTargetMode` : mode de copie dans la destination, `text` (recopie du contenu texte de l'élément d'origine) ou `value` (recopie de la valeur de l'attribut value dans l'élément d'origine) (défaut : `text`)

### Exemples

## Usage de base

1. Placer la classe `.js-copy` sur l'élément d'origine
2. Ajouter l'attribut `data-copy-target` contenant un sélecteur vers l'élément destination
3. Préciser si nécessaire les autres paramètres avec `data-copy-event` s'il est différent du clic et `data-copy-source-mode` ou `data-copy-target-mode` s'ils sont différents du texte simple

Voir la démonstration dans index.html
