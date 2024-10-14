// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslation } from '../models';

const translation: I18nTranslation = {
  about: {
    documentations: {
      aboutUs: 'À propos',
      contact: 'Contact',
      heading: 'Documentation',
      home: 'Accueil',
      license: 'Licence',
    },
    heading: 'À propos de LiveCodes',
    livecodes: {
      para1:
        '<1><tag-2>LiveCodes</tag-2></tag-1> est un éditeur de code <tag-3> libre</tag-3>, avec une <tag-4>multitude de fonctions intégrées</tag-4> et une intégration du <tag-5>côté client</tag-5>. Actuellement, <tag-6>plus de 80 langages et <tag-7></tag-7>frameworks</tag-6> sont pris en charge. Il peut être utilisé comme une application autonome ou <tag-8>intégré</tag-8> dans une page web. De nombreuses options sont disponibles pour <tag-9>intégrer le code</tag-9>.',
      para2:
        "Livecodes dispose d'une large gamme <1>d'options de configuration</tag-1> qui le rend très flexible. Un puissant <tag-2>SDK</tag-2> (pour <tag-3>JS/TS</tag-3>, <tag-4>React</tag-4>, <tag-5>Vue</tag-5> et <tag-6>Svelte</tag-6>) facilite <tag-7>l'intégration</tag-7> et <tag-8>la communication</tag-8> avec l'éditeur de code. Une <tag-9>documentation complète</tag-9> est disponible avec des exemples de code, des démos et des captures d'écran.",
    },
    version: {
      app: 'Version : {{APP_VERSION}}',
      appPermanentUrl: 'URL permanente',
      commit: 'Validation Git : {{COMMIT_SHA}}',
      heading: 'Version',
      sdk: 'Version du SDK : {{SDK_VERSION}}',
      sdkPermanentUrl: 'URL permanente du SDK',
    },
  },
  app: {
    copy: {
      hint: 'Copier (Ctrl/Cmd + A, Ctrl/Cmd + C)',
    },
    copyAsUrl: {
      hint: "Copier le code en tant qu'URL de données",
    },
    customSettings: {
      hint: 'Paramètres personnalisés',
    },
    editorMode: {
      hint: 'Mode éditeur',
    },
    editorSettings: {
      hint: "Paramètres de l'éditeur",
    },
    externalResources: {
      hint: 'Ressources externes',
    },
    focus: {
      hint: 'Basculer le mode de mise au point',
    },
    format: {
      hint: 'Formater (Alt + Maj + F)',
    },
    fullscreen: {
      hint: 'Plein écran',
    },
    logo: {
      title: 'LiveCodes : un éditeur de code dans le navigateur !',
    },
    projectInfo: {
      hint: 'Informations sur le projet',
    },
    redo: {
      hint: 'Rétablir (Ctrl/Cmd + Maj + Z)',
    },
    result: {
      hint: 'Basculer le résultat',
    },
    run: {
      hint: 'Exécuter (Maj + Entrée)',
    },
    share: {
      hint: 'Partager',
    },
    undo: {
      hint: 'Annuler (Ctrl/Cmd + Z)',
    },
    untitledProject: 'Projet sans titre',
  },
  assets: {
    add: {
      dataURL: {
        desc: "Ajouter un actif en tant qu'<1>URL de données</tag-1> encodée en base64.",
        heading: 'URL de données',
        label: 'Ajouter un fichier',
      },
      githubPages: {
        desc: "Déployer l'actif sur GitHub Pages. Le fichier est poussé vers la branche <1>gh-pages</tag-1> du dépôt <tag-2>livecodes-assets</tag-2> sur votre compte GitHub. Si le dépôt n'existe pas déjà, un dépôt public sera créé.",
        heading: 'GitHub Pages',
        label: 'Téléverser le fichier',
      },
      heading: 'Ajouter un actif',
    },
    delete: {
      all: 'Supprimer {{assets}} actifs ?',
      one: "Supprimer l'actif : {{asset}} ?",
    },
    deleteAll: 'Tout supprimer',
    generic: {
      clickToCopyURL: "Cliquer pour copier l'URL",
    },
    heading: 'Actifs numériques',
    link: {
      date: 'Date : {{modified}}',
      type: 'Type : {{type}}',
      url: 'URL : {{url}}',
    },
    loadFile: {
      error: {
        failedToUpload: 'Erreur : Le téléversement du fichier a échoué',
        unauthenticated: 'Erreur : Utilisateur non authentifié',
      },
      upload: 'Téléverser un fichier',
      uploading: 'Téléversement en cours...',
    },
    noMatch: 'Aucun actif ne correspond à ces filtres.',
    noSavedAssets: "Vous n'avez aucun actif enregistré.",
    processAsset: {
      addFile: 'Fichier ajouté : ',
      deployNotice: "L'actif devrait être disponible sur cette URL sous peu (~1 min).",
      success: 'Fichier ajouté aux actifs numériques!',
      urlLabel: 'URL : ',
    },
    resetFilters: 'Réinitialiser',
    search: 'Rechercher',
    sort: {
      date: 'Date',
      fileName: 'Nom de fichier',
      heading: 'Trier par :',
    },
    type: {
      archive: 'Archive',
      audio: 'Audio',
      csv: 'CSV',
      font: 'Police',
      html: 'HTML',
      icon: 'Icône',
      image: 'Image',
      json: 'JSON',
      other: 'Autre',
      script: 'Script',
      stylesheet: 'Feuille de style',
      text: 'Texte',
      video: 'Vidéo',
      xml: 'XML',
    },
    types: {
      all: 'Tous les types',
    },
    url: {
      fail: "Échec de la copie de l'URL.",
      success: "L'URL est copiée dans le presse-papiers.",
    },
  },
  backup: {
    backup: {
      assets: 'Actifs',
      button: 'Sauvegarder',
      desc: "Sauvegardez les données LiveCodes afin de pouvoir les restaurer ultérieurement sur cet appareil ou d'autres. <1></tag-1> Veuillez consulter la <tag-2>documentation</tag-2> pour plus de détails.",
      heading: 'Sauvegarder',
      projects: 'Projets',
      settings: 'Paramètres utilisateur',
      snippets: 'Extraits de code',
      templates: 'Modèles utilisateur',
    },
    backupBtn: 'Sauvegarder',
    error: {
      atLeastOneStore: 'Veuillez sélectionner au moins un option à sauvegarder',
      incorrectFileType: 'Erreur : Type de fichier incorrect',
    },
    fileInputLabel: 'Restaurer à partir du fichier',
    heading: 'Sauvegarder / Restaurer',
    inProgress: 'En cours...',
    restore: {
      desc: 'Restaurer les données LiveCodes précédemment sauvegardées. <1></tag-1> Si vous choisissez de remplacer le contenu actuel, vous souhaiterez peut-être d’abord le sauvegarder. <tag-2></tag-2> Pour plus de détails, veuillez consulter la <tag-3>documentation</tag-3>',
      fromFile: 'Restaurer à partir du fichier',
      heading: 'Restaurer',
      mode: {
        merge: 'Fusionner avec le contenu actuel',
        replace: 'Remplacer le contenu actuel',
      },
      success: 'Restauré avec succès !',
    },
  },
  broadcast: {
    broadcastBtn: {
      start: 'Diffuser',
      stop: 'Arrêter la diffusion',
    },
    broadcasting: 'Diffusion en cours...',
    channelURL: 'URL de chaîne',
    connecting: 'Connexion en cours...',
    desc: 'Diffuser la page de résultats vers d’autres navigateurs ou appareils en temps réel. Pour plus de détails, veuillez consulter la <1>documentation</tag-1>',
    error: {
      generic: 'La diffusion a échoué !',
      serverURLRequired: "L'URL du serveur est requise !",
    },
    heading: 'Diffuser',
    includeSourceCode: 'Inclure le code source',
    serverURL: {
      heading: 'URL du serveur',
    },
  },
  core: {
    broadcast: {
      heading: 'Diffuser',
      successSetToken: "Le jeton d'utilisateur de diffusion a été défini avec succès",
    },
    changeLanguage: {
      hint: 'Changer de langage',
      message: 'Chargement {{lang}}. Cela peut prendre un certain temps!',
    },
    copy: {
      copied: 'Code copié dans le presse-papiers',
      copiedAsDataURL: 'Code copié comme URL de données',
      hint: 'Copié !',
      title: 'Copier',
    },
    error: {
      couldNotLoadTemplate: 'Impossible de charger le modèle : {{template}}',
      failedToCopyCode: 'Échec de la copie du code',
      failedToLoadTemplate: 'Échec du chargement du modèle',
      failedToLoadTemplates: 'Échec du chargement des modèles de démarrage',
      failedToParseSettings: "Échec de l'analyse des paramètres en JSON",
      invalidCommand: 'Commande invalide !',
      invalidImport: "URL d'importation invalide",
      invalidPanelId: 'ID de panneau invalide',
      invalidToken: 'Jeton invalide !',
      login: 'Erreur de connexion !',
      logout: 'Erreur de déconnexion !',
      noResultContainer: 'Conteneur de résultat introuvable',
      unavailable: 'Commande indisponible',
      unavailableForEmbeds: 'Commande indisponible pour les intégrations',
    },
    export: {
      gist: 'Créer un gist GitHub public...',
    },
    fork: {
      success: 'Dupliquer (nouveau projet)',
    },
    fullScreen: {
      enter: 'Plein écran',
      exit: 'Quitter le mode plein écran',
    },
    import: {
      loading: 'Chargement du projet...',
    },
    layout: {
      horizontal: 'Disposition horizontale',
      responsive: 'Disposition réactive',
      vertical: 'Disposition verticale',
    },
    loadDefaults: {
      template: 'Chargement du modèle par défaut',
    },
    login: {
      success: 'Connexion réussie',
      successWithName: 'Connecté en tant que : {{name}}',
    },
    logout: {
      success: 'Déconnexion réussie',
    },
    result: {
      hint: 'Afficher le résultat dans une nouvelle fenêtre',
    },
    save: {
      success: "Projet enregistré localement sur l'appareil !",
      successWithName: 'Projet "{{name}}" enregistré sur l\'appareil.',
    },
    template: {
      blank: 'Projet vide',
      delete: 'Supprimer le modèle "{{item}}" ?',
      javascript: 'Démarrage JavaScript',
      react: 'Démarrage React',
      saved: 'Enregistré comme nouveau modèle',
      typescript: 'Démarrage TypeScript',
      vue: 'Démarrage Vue 3',
    },
    unload: {
      notSaved: 'Les modifications que vous avez apportées peuvent ne pas être enregistrées.',
    },
    zoom: {
      hint: 'Zoom',
    },
  },
  customSettings: {
    JSON: 'JSON des paramètres personnalisés',
    heading: 'Paramètres personnalisés',
    load: 'Charger',
  },
  deploy: {
    create: {
      desc: 'Un nouveau dépôt <1>public</tag-1> sera créé. La page de résultat sera  envoyée (push) vers la branche <tag-2>gh-pages</tag-2>.',
      heading: 'Créer un nouveau dépôt',
      repoName: 'Nom du dépôt <1></tag-1>',
    },
    error: {
      generic: 'Le déploiement a échoué !',
      repoNameExists: 'Le nom du dépôt existe déjà',
      repoNameRequired: 'Le nom du dépôt est requis',
    },
    existing: {
      desc: 'Un nouveau commit sera ajouté à la branche <1>gh-pages</tag-1>.',
      heading: 'Dépôt existant',
      repoName: 'Nom du dépôt',
    },
    generic: {
      commitMessage: 'Message du commit',
      commitSourceCodePublic: 'Commiter le code source (public)',
      deployBtn: 'Déployer',
      deploying: 'Déploiement en cours...',
    },
    heading: 'Déployer sur GitHub Pages',
    searchRepo: 'Rechercher vos dépôts publics...',
  },
  editorSettings: {
    appLanguage: {
      heading: "Langue de l'interface utilisateur",
      note: "L'application sera rechargée pour appliquer le changement de langue.",
    },
    closeBrackets: 'Fermeture automatique des crochets et des guillemets',
    codeJarDesc: '* Les fonctionnalités marquées ne sont pas disponibles dans CodeJar.',
    default: 'Par défaut',
    desc: 'Pour plus de détails, veuillez consulter la <1>documentation</tag-1>',
    editor: {
      codejar: 'CodeJar',
      codemirror: 'CodeMirror',
      heading: 'Éditeur',
      monaco: 'Monaco',
    },
    editorMode: {
      emacs: 'Emacs',
      heading: 'Mode éditeur *',
      vim: 'Vim',
    },
    editorTheme: "Thème de l'éditeur",
    emmet: 'Activer Emmet *',
    enableAI: {
      heading: "Activer l'assistant de code IA",
      note: 'Propulsé par <1><tag-2></tag-2></tag-1>',
    },
    fontFamily: 'Famille de polices',
    fontSize: 'Taille de la police',
    format: 'Format',
    heading: "Paramètres de l'éditeur",
    lineNumbers: 'Afficher les numéros de ligne',
    notAvailableInCodeJar: 'Non disponible dans CodeJar',
    preview: 'Aperçu',
    semicolons: 'Format : Utiliser des points-virgules',
    singleQuote: 'Format : Utiliser des guillemets simples',
    tabSize: 'Taille de la tabulation',
    theme: 'Mode sombre',
    trailingComma: 'Format : Utiliser des virgules finales',
    useTabs: {
      heading: 'Indentation',
      spaces: 'Espaces',
      tabs: 'Tabulations',
    },
    wordWrap: 'Retour à la ligne',
  },
  embed: {
    activeEditor: {
      heading: 'Éditeur actif',
      markup: '{{markup}}',
      script: '{{script}}',
      style: '{{style}}',
    },
    activeTool: {
      compiled: 'Compilé',
      console: 'Console',
      heading: 'Outil actif',
      tests: 'Tests',
    },
    code: {
      copy: 'Copier le code',
      heading: 'Code',
    },
    desc: 'Pour des configurations avancées, veuillez consulter la <1>documentation</tag-1>',
    embedType: {
      cdn: 'Script (CDN)',
      heading: "Type d'intégration",
      html: 'HTML',
      iframe: 'Iframe',
      npm: 'JS (npm)',
      react: 'React',
      svelte: 'Svelte',
      vue: 'Vue',
    },
    heading: 'Intégrer le projet',
    lite: 'Mode simplifié',
    loading: {
      click: 'Au clic',
      eager: 'Immédiat',
      heading: 'Chargement',
      lazy: 'Différé',
    },
    mode: {
      codeblock: 'Bloc de code',
      editor: 'Éditeur',
      full: 'Complet',
      heading: "Mode d'affichage",
      result: 'Résultat',
    },
    permanentUrl: 'URL permanente',
    preview: 'Aperçu',
    previewLoading: "Chargement de l'aperçu...",
    readonly: 'Lecture seule',
    theme: {
      dark: 'Sombre',
      heading: 'Thème',
      light: 'Clair',
    },
    tools: {
      closed: 'Fermé',
      full: 'Complet',
      heading: 'Outils',
      none: 'Aucun',
      open: 'Ouvert',
    },
    view: {
      editor: 'Éditeur',
      heading: 'Vue par défaut',
      result: 'Résultat',
      split: 'Scinder',
    },
  },
  generic: {
    about: {
      blog: 'Blog',
      configuration: 'Configuration',
      features: 'Fonctionnalités',
      gettingStarted: 'Mise en route',
      github: 'GitHub',
      sdk: 'SDK',
      sponsor: 'Parrainer',
      twitter: '𝕏 / Twitter',
    },
    clickForInfo: "Cliquer pour plus d'information...",
    close: 'Fermer',
    error: {
      authentication: "Erreur d'authentification !",
      exceededSize: 'Erreur : Taille dépassée {{size}} MB',
      failedToReadFile: 'Erreur : Échec de lecture du fichier',
    },
    loading: 'Chargement...',
    more: 'Plus...',
    optional: 'Facultatif',
    required: 'Requis',
  },
  import: {
    bulk: {
      desc: "Importer en masse plusieurs projets dans vos projets enregistrés. Les projets peuvent être exportés depuis l'écran <1>Projets enregistrés</tag-1>",
      fromFile: 'Importation en masse depuis un fichier local',
      fromURL: 'Importation en masse depuis une URL',
      heading: 'Importation en masse',
      started: 'Importation en masse a commencée...',
    },
    code: {
      desc: 'Sources prises en charge : <1> <tag-2>Gist GitHub</tag-2> <tag-3>Fichier GitHub</tag-3> <tag-4>Répertoire dans un dépôt GitHub</tag-4> <tag-5>Extrait Gitlab</tag-5> <tag-6>Fichier Gitlab</tag-6> <tag-7>Répertoire dans un dépôt Gitlab</tag-7> <tag-8>JS Bin</tag-8> <tag-9>Code brut</tag-9> <tag-10>Code dans une page Web</tag-10> <tag-11>Code dans un fichier zip</tag-11> <tag-12>Playgrounds officiels<tag-13></tag-13>(TypeScript, Vue et Svelte)</tag-12> </tag-1> Pour plus de détails, veuillez consulter la <tag-14>documentation</tag-14>',
      fromFile: 'Importer des fichiers locaux',
      fromURL: 'Importer depuis une URL',
      heading: 'Importer du code',
    },
    error: {
      failedToLoadURL: "Erreur : échec du chargement de l'URL",
      invalidConfigFile: 'Fichier de configuration invalide',
      invalidFile: 'Erreur : Fichier invalide',
    },
    generic: {
      file: 'Fichier local',
      url: 'URL',
    },
    heading: 'Importer',
    json: {
      desc: "Importer un seul projet JSON dans l'éditeur. Un projet peut être exporté depuis le menu Projet → Exporter → Exporter le projet (JSON).",
      fromFile: 'Importer un projet depuis un fichier local',
      fromURL: 'Importer un projet depuis une URL',
      heading: 'Importer un projet JSON',
    },
    success: 'Importation réussie !',
  },
  login: {
    accessAllowed: "Autoriser l'accès à :",
    desc: '<1>En vous connectant, vous acceptez que des <tag-2>cookies</tag-2> soient stockés sur votre appareil.</tag-1> <tag-3> <tag-4>Pourquoi ces autorisations sont nécessaires ?</tag-4> </tag-3> <tag-5> <tag-6>Comment révoquer les autorisations ?</tag-6> </tag-5>',
    gist: 'Gists',
    heading: 'Se connecter avec GitHub',
    loginAs: 'Connecté en tant que {{name}}',
    loginBtn: 'Se connecter',
    logout: 'Se déconnecter',
    privateRepo: 'Dépôts privés',
    publicRepo: 'Dépôts',
  },
  menu: {
    about: 'À propos...',
    appHelp: {
      heading: 'Aide',
      hint: 'Aide',
    },
    appProject: {
      heading: 'Projet',
      hint: 'Projet',
    },
    appSettings: {
      heading: 'Paramètres',
      hint: 'Paramètres',
    },
    assets: 'Actifs numériques …',
    autoSave: 'Auto Enregistrer',
    autoUpdate: 'Mise à jour automatique',
    backup: 'Sauvegarde / Restauration …',
    broadcast: 'Diffuser …',
    customSettings: 'Paramètres personnalisés …',
    delay: {
      heading: 'Délai : <1>1.5</tag-1>s',
      hint: 'Délai de mise à jour automatique',
    },
    deploy: 'Déployer …',
    editorSettings: "Paramètres de l'éditeur …",
    embed: 'Intégrer …',
    export: {
      codepen: 'Éditer dans CodePen',
      gist: 'Exporter vers GitHub Gist',
      heading: 'Exporter',
      jsfiddle: 'Éditer dans JSFiddle',
      json: 'Exporter le projet (JSON)',
      result: 'Exporter le résultat (HTML)',
      src: 'Exporter la source (ZIP)',
    },
    formatOnsave: "Formater à l'enregistrement",
    import: 'Importer …',
    layout: 'Disposition verticale',
    login: 'Connexion …',
    logout: 'Déconnexion',
    new: 'Nouveau …',
    open: 'Ouvrir …',
    project: 'Information du projet …',
    recoverUnsaved: 'Récupérer non enregistré',
    resources: 'Ressources externes …',
    save: 'Enregistrer',
    saveAs: {
      fork: 'Dupliquer (nouveau projet)',
      heading: 'Enregistrer sous',
      template: 'Modèle',
    },
    share: 'Partager …',
    showSpacing: {
      heading: "Afficher l'espacement",
      hint: 'Appuyer sur Alt/Option et déplacer le curseur sur le résultat',
    },
    snippets: 'Extraits de code …',
    sync: 'Synchronisation (bêta) … <1> ⏳</tag-1>',
    theme: 'Thème sombre',
    welcome: {
      heading: 'Écran de Bienvenue …',
      hint: "Afficher l'écran de bienvenue au démarrage",
    },
  },
  open: {
    defaultTemplate: 'Modèle par défaut ',
    delete: {
      all: 'Supprimer {{projects}} projets ?',
      deleting: 'Suppression des projets...',
      one: 'Supprimer le projet : {{project}} ?',
    },
    deleteAll: 'Tout supprimer',
    exportAll: 'Tout exporter',
    filter: {
      language: 'Filtrer par langage ',
      tag: 'Filtrer par étiquette',
    },
    heading: 'Projets enregistrés',
    import: 'Importer',
    lastModified: 'Dernière modification : {{modified}}',
    noData: {
      desc: 'Vous pouvez enregistrer un projet depuis le menu&nbsp;Projet&nbsp;&gt;&nbsp;Enregistrer et le raccourci clavier (Ctrl/Cmd&nbsp;+&nbsp;S).',
      heading: "Vous n'avez aucun projet enregistré.",
    },
    noMatch: 'Aucun projet ne correspond à ces filtres.',
    placeholder: {
      allLanguages: 'Tous les langages',
      filterByTags: 'Filtrer par étiquettes',
      search: 'Rechercher',
    },
    removeDefault: '(désélectionner)',
    reset: 'Réinitialiser',
    setAsDefault: 'Définir par défaut',
    sort: {
      heading: 'Trier par :',
      lastModified: 'Dernière modification',
      title: 'Titre',
    },
  },
  project: {
    desc: 'Description',
    head: 'Ajouter à &lt;head&gt;',
    heading: 'Information sur le projet',
    htmlAttr: 'Attributs pour &lt;html&gt;',
    tags: 'Étiquettes',
    title: 'Titre du projet',
  },
  recoverPrompt: {
    desc: 'Votre dernier projet comporte des modifications non enregistrées !',
    heading: 'Récupérer le projet non enregistré ?',
    meta: 'Titre : <1></tag-1> <tag-2></tag-2> Dernière modification : <tag-3></tag-3>',
    notShowAgain: 'Ne plus afficher ceci.',
    prompt: {
      discard: 'Supprimer le projet non enregistré',
      heading: '<1></tag-1>Voulez-vous le récupérer maintenant ?',
      recover: "Récupérer le projet dans l'éditeur",
      save: "Enregistrer sur l'appareil et continuer",
    },
  },
  resources: {
    browseOnJsDelivr: 'Parcourir les fichiers du package sur jsDelivr',
    cssPresets: {
      heading: 'Préréglages CSS',
      none: 'Aucun',
      normalizeCss: 'Normalize.css',
      resetCss: 'Reset CSS',
    },
    error: {
      failedToLoadResults: 'Échec du chargement des résultats !',
      noResultsFound: 'Aucun résultat trouvé pour : ',
    },
    fonts: {
      add: 'Ajouter',
      heading: 'Polices <1>(propulsé par Google Fonts)</tag-1>',
      select: 'Sélectionner une police ...',
    },
    heading: 'Ressources externes',
    scripts: 'Scripts externes',
    search: {
      heading: 'Rechercher des packages <1>(propulsé par jsDelivr)</tag-1>',
      placeholder: 'par ex. jquery, lodash@4, bootstrap@5.2.3, ...',
    },
    stylesheets: 'Feuilles de style externes',
    urlDesc:
      'Ajouter des URLs de feuilles de style/scripts. Chaque URL doit figurer sur une ligne distincte.',
  },
  savePrompt: {
    heading: 'Modifications non enregistrées',
    prompt: {
      cancel: 'Annuler',
      discard: 'Ne pas enregistrer',
      heading:
        'Les modifications ne sont peut-être pas enregistrées. <1></tag-1> Voulez-vous enregistrer maintenant ?',
      save: 'Enregistrer',
    },
  },
  share: {
    characters: '{{urlLength}} caractères',
    copy: {
      clickToCopy: 'Cliquez pour copier',
      copied: 'URL copiée dans le presse-papiers',
    },
    encodedURL: "Obtenir l'URL encodée",
    error: {
      failedToCopy: 'Échec de la copie dans le presse-papiers !',
      failedToGenerateURL: "Échec de la génération de l'URL courte !",
    },
    expireInOneYear: 'Expire dans 1 an',
    generateURL: "Génération de l'URL …",
    heading: 'Partager',
    permanentURL: 'URL permanente',
    qrcode: {
      clickToDownload: 'Cliquer pour télécharger',
      generating: 'Génération en cours...',
    },
    services: {
      copyUrl: "Copier l'URL",
      devTo: 'Dev.to',
      email: 'Email',
      facebook: 'Facebook',
      hackerNews: 'Hacker News',
      linkedIn: 'LinkedIn',
      pinterest: 'Pinterest',
      pocket: 'Pocket',
      qrCode: 'Code QR',
      reddit: 'Reddit',
      share: 'Partager via …',
      telegram: 'Telegram',
      tumblr: 'Tumblr',
      twitter: '? / Twitter',
      whatsApp: 'WhatsApp',
    },
    shortURL: 'Obtenir une URL courte',
  },
  snippets: {
    action: {
      copy: 'Copier',
      delete: 'Supprimer',
      edit: 'Modifier',
    },
    add: {
      code: 'Code',
      desc: 'Description',
      heading: 'Ajouter un extrait',
      language: 'Langage',
      save: 'Enregistrer',
      snippets: 'Extraits',
      title: 'Titre',
    },
    copy: {
      clickToCopySnippet: "Cliquez pour copier l'extrait",
      copied: "L'extrait est copié dans le presse-papiers.",
    },
    delete: {
      all: 'Supprimer {{snippets}} extraits ?',
      one: "Supprimer l'extrait : {{snippet}} ?",
    },
    deleteAll: 'Tout supprimer',
    error: {
      failedToCopy: "Échec de la copie de l'URL.",
      noTitle: "Veuillez ajouter un titre d'extrait.",
    },
    filter: {
      language: 'filtrer par langage',
    },
    heading: 'Extraits de code',
    lastModified: 'Dernière modification : {{modified}}',
    noMatch: 'Aucun extrait ne correspond à ces filtres.',
    noSavedSnippets: "Vous n'avez aucun extrait enregistré.",
    placeholder: {
      allLanguages: 'Tous les langages',
      search: 'Rechercher',
    },
    reset: 'Réinitialiser',
    save: {
      success: "Extrait enregistré localement sur l'appareil !",
    },
    sort: {
      date: 'Date',
      heading: 'Trier par :',
      title: 'Titre',
    },
    text: 'Texte brut',
  },
  splash: {
    loading: 'Chargement de LiveCodes…',
  },
  sync: {
    autoSync: 'Synchronisation automatique',
    create: {
      desc: 'Un nouveau dépôt <1>privé</tag-1> sera créé. Vos données locales LiveCodes seront synchronisées avec la branche <tag-2>main</tag-2>.',
      heading: 'Créer un nouveau dépôt',
      repoName: 'Nom du dépôt',
    },
    error: {
      generic: 'Échec de la synchronisation !',
      repoNameRequired: 'Le nom du dépôt est requis',
    },
    existing: {
      desc: 'Vos données locales LiveCodes seront synchronisées avec la branche <1>main</tag-1>.',
      heading: 'Dépôt existant',
      repoName: 'Nom du dépôt',
    },
    heading: 'Synchroniser avec un dépôt GitHub',
    searchRepos: 'Rechercher dans vos dépôts...',
    success: 'Synchronisation terminée !',
    syncBtn: 'Synchroniser',
    syncInProgress: 'Synchronisation en cours...',
    syncStarted: 'Synchronisation démarrée...',
  },
  templates: {
    heading: 'Nouveau Projet',
    noUserTemplates: {
      desc: 'Vous pouvez enregistrer un projet comme modèle depuis <1></tag-1>(Menu&nbsp;Projet&nbsp;&gt;&nbsp;Enregistrer&nbsp;sous&nbsp;&gt; Modèle).',
      heading: "Vous n'avez aucun modèle enregistré.",
    },
    starter: {
      angular: 'Angular',
      assemblyscript: 'AssemblyScript',
      astro: 'Astro',
      backbone: 'Backbone',
      blank: 'Blank',
      blockly: 'Blockly',
      bootstrap: 'Bootstrap',
      civet: 'Civet',
      clio: 'Clio',
      clojurescript: 'ClojureScript',
      coffeescript: 'CoffeeScript',
      commonlisp: 'Common Lisp',
      cpp: 'C++',
      diagrams: 'Diagrams',
      fennel: 'Fennel',
      gleam: 'Gleam',
      go: 'Go',
      heading: 'Modèles de démarrage',
      imba: 'Imba',
      javascript: 'JavaScript',
      jest: 'Jest',
      'jest-react': 'Jest/React',
      jquery: 'jQuery',
      julia: 'Julia',
      knockout: 'Knockout',
      lit: 'Lit',
      livescript: 'LiveScript',
      loading: 'Chargement des modèles de démarrage...',
      lua: 'Lua',
      'lua-wasm': 'Lua (Wasm)',
      malina: 'Malina.js',
      markdown: 'Markdown',
      mdx: 'MDX',
      ocaml: 'Ocaml',
      perl: 'Perl',
      php: 'PHP',
      'php-wasm': 'PHP (Wasm)',
      postgresql: 'PostgreSQL',
      preact: 'Preact',
      prolog: 'Prolog',
      python: 'Python',
      r: 'R',
      react: 'React',
      'react-native': 'React Native',
      reason: 'Reason',
      rescript: 'ReScript',
      riot: 'Riot.js',
      ruby: 'Ruby',
      'ruby-wasm': 'Ruby (Wasm)',
      scheme: 'Scheme',
      solid: 'Solid',
      sql: 'SQL',
      stencil: 'Stencil',
      svelte: 'Svelte',
      tailwindcss: 'Tailwind CSS',
      tcl: 'Tcl',
      teal: 'Teal',
      typescript: 'TypeScript',
      vue: 'Vue 3 SFC',
      vue2: 'Vue 2',
      wat: 'WebAssembly Text',
    },
    user: {
      heading: 'Mes modèles',
      loading: "Chargement des modèles d'utilisateur...",
    },
  },
  testEditor: {
    heading: 'Éditer les Tests',
    load: 'Exécuter',
    tests: 'Tests',
  },
  toolspane: {
    close: 'Fermer',
    compiled: {
      title: 'Compilé',
    },
    console: {
      clear: 'Effacer la console',
      title: 'Console',
    },
    test: {
      edit: 'Éditer',
      error: '<1><tag-2>Erreur de test !</tag-2></tag-1>',
      loading: '<1>Chargement des tests...</tag-1>',
      noTest: "<1>Ce projet n'a pas de tests !</tag-1>",
      reset: 'Réinitialiser',
      run: {
        desc: 'Ctrl/Cmd + Alt + T',
        heading: 'Exécuter',
      },
      summary: {
        desc: 'Tests : {{failed}}\n        {{passed}}\n        {{skipped}}\n        {{total}}<1></tag-1>\nTemps : {{duration}}s',
        failed: '{{failedNum}} échoués',
        passed: '{{passedNum}} réussis',
        skipped: '{{skippedNum}} ignorés',
        total: '{{totalNum}} au total',
      },
      title: 'Tests',
      watch: {
        desc: 'Exécuter les tests quand le code change',
        heading: 'Voir',
      },
    },
  },
  welcome: {
    about: {
      documentation: 'Documentation',
      heading: 'À propos de LiveCodes',
    },
    heading: 'Bienvenue',
    recent: {
      heading: 'Récent',
    },
    recover: {
      cancel: 'Annuler',
      heading: 'Récupération',
      lastModified: 'Dernière modification : <1></tag-1>',
      recover: 'Récupérer',
      save: 'Enregistrer',
      unsavedChanges: 'Votre dernier projet avait des modifications non enregistrées :',
    },
    showOnStartup: 'Afficher au démarrage',
    start: {
      heading: 'Démarrer',
      import: 'Importer...',
      loadDefaultTemplate: 'Charger le modèle par défaut',
      new: 'Nouveau...',
      noDefaultTemplate: 'Aucun modèle par défaut',
      open: 'Ouvrir...',
    },
    templates: {
      heading: 'Modèles de démarrage',
    },
  },
};

export default translation;
