# Pepin

## SmoothScroll

### Fonctionnement

Lorsque le lien portant la classe est cliqué, le navigateur défile de manière douce vers la cible du lien.

Il peut y en avoir plusieurs par page.

### Paramètres

* `target` : élément cible vers lequel défiler (défaut : `null`)
* `speed` : vitesse d'animation en ms (défaut : `500`)

### Exemples

## Usage de base

1. Placer la classe `.js-smoothscroll` sur un bouton ou un lien
2. Définir par l'attribut `data-target` la cible vers laquelle il faudra faire défiler le contenu, avec un sélecteur CSS (de préférence un id #). Si cet attribut n'est pas défini, la valeur `href` est retenue et doit mener vers une ancre de la page.

```html
<a class="js-smoothscroll" data-target="#menu">Retour au haut de page</button>
```

Voir la démonstration dans index.html
