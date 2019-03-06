# Pepin

## Modal

### Fonctionnement

Permet d'ouvrir une "fenêtre" modale dans une page web, par exemple au clic sur un lien/bouton, éventuellement en chargeant son contenu via une URL passée en attribut.

### Paramètres

* `modalUrl` : URL du document à charger dans la modale (défaut : `undefined`)
* `useHistory` : utiliser l'API History de HTML5 (défaut : `true`)
* `open` : état ouvert (défaut : `false`)
* `focusableElements` : sélecteur de tous les éléments pouvant recevoir le focus dans la modale (défaut : voir source)
* `classOverlay` : classe à ajouter à l'overlay, pour l'effet d'ombrage sous la modale par exemple (défaut : `modal-overlay`)
* `classModal` : classe de la modale (défaut : `modal`)
* `selectorPage` : sélecteur de la page contenue dans la modale (défaut : `#container`)

### Exemples

## Usage de base

1. Placer la classe `.js-modal` sur un bouton ou un lien
2. Définir par l'attribut `data-modal-url` l'URL du document à charger (en AJAX) dans la modale
3. Ajouter les styles CSS prévus par défaut pour la modale (voir fichier index.html)

```html
<button class="js-modal" data-modal-url="modal.html">Ouvrir</button>
```

Voir la démonstration dans index.html
