# Pepin

## Selection

### Fonctionnement

Lorsque l'élément contient une case à cocher (checkbox), il se voit ajouté une classe spécifique si la case devient cochée. Et inversement, la classe est retirée lorsque la case est décochée.

### Paramètres

* `classSelected` : classe à ajouter à l'élément lorsque le _toggler_ est en état coché (défaut : `is-selected`)
* `toggler` : sélecteur de l'élément qui va être le déclencheur pour son ancêtre (défaut : `:checkbox`)

### Exemple d'usage de base

1. Placer la classe `.js-selection` sur un élément ancêtre (ex : div)
2. Définir les styles de `.is-selected`

```html
<p class="js-selection">
  <input type="checkbox" id="check1"> <label for="check1">Cochez-moi !</label>
</p>
```

Voir la démonstration dans index.html
