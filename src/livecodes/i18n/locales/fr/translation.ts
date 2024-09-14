// @ts-nocheck
// This comment is added by i18n-exclude script and should be automatically removed after build.
// If you see this comment in the file, it means there is something wrong during the build process.

// @ts-nocheck
// This comment is added by i18n-exclude script and should be automatically removed after build.
// If you see this comment in the file, it means there is something wrong during the build process.

// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const translation = {
  about: {
    documentations: {
      aboutUs: 'À propos',
      contact: 'Contact',
      heading: 'Documentation',
      home: 'Accueil',
      licence: 'Licence',
    },
    heading: 'À propos de LiveCodes',
    livecodes: {
      para1:
        '<1><2>LiveCodes</2></1> is an <3>open-source</3>, <4>feature-rich</4>, <5>client-side</5> code playground. Currently, <6>80+ languages/<7></7>frameworks</6> are supported. It can be used as a standalone app or can be <8>embedded</8> in any web page. There are many ways to <9>prefill playgrounds</9> with code.',
      para2:
        'A wide range of <1>configuration options</1> makes it very flexible. A powerful <2>SDK</2> (for <3>JS/TS</3>, <4>React</4>, <5>Vue</5> and <6>Svelte</6>) facilitates <7>embedding</7> and <8>communicating</8> with playgrounds. <9>Comprehensive documentations</9> are available with code samples, live demos and screenshots.',
    },
    version: {
      app: 'App version: {{APP_VERSION}}',
      appPermanentUrl: 'App URL permanente',
      commit: 'Validation Git: {{COMMIT_SHA}}',
      heading: 'Version',
      sdk: 'SDK version: {{SDK_VERSION}}',
      sdkPermanentUrl: 'SDK URL permanente',
    },
  },
  app: {
    copy: {
      hint: 'Copier (Ctrl/Cmd + A, Ctrl/Cmd + C)',
    },
    copyAsUrl: {
      hint: 'Copier le code comme URL de données',
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
      hint: 'Format (Alt + Shift + F)',
    },
    fullscreen: {
      hint: 'Plein écran',
    },
    logo: {
      title: 'LiveCodes : un éditeur de code dans le navigateur !',
    },
    menuHelp: {
      heading: 'Help',
      hint: 'Aide',
    },
    menuProject: {
      heading: 'Project',
      hint: 'Projet',
    },
    menuSettings: {
      heading: 'Settings',
      hint: 'Paramètres',
    },
    projectInfo: {
      hint: 'Informations sur le projet',
    },
    redo: {
      hint: 'Refaire (Ctrl/Cmd + Shift + Z)',
    },
    result: {
      hint: 'Basculer le résultat',
    },
    run: {
      hint: 'Exécuter (Shift + Enter)',
    },
    share: {
      hint: 'Partager',
    },
    undo: {
      hint: 'Défaire (Ctrl/Cmd + Z)',
    },
    untitledProject: 'Projet sans titre',
  },
  assets: {
    add: {
      dataURL: {
        desc: 'Ajouter un élément en tant que fichier codé en base64 <1>data url</1>.',
        heading: 'URL des données',
        label: 'Ajouter un fichier',
      },
      githubPages: {
        desc: "Déployer l’actif sur les pages GitHub. Le fichier est transféré vers la branche <1>gh-pages</1> du dépôt <2>livecodes-assets</2> sur votre compte GitHub. Si le dépôt n'existe pas déjà, un dépôt public sera créé.",
        heading: 'GitHub Pages',
        label: 'Télécharger le fichier',
      },
      heading: 'Ajouter',
    },
    delete: {
      all: 'Supprimer {{assets}} ressources?',
      one: 'Supprimer ressource: {{asset}}?',
    },
    deleteAll: 'Supprimer tout',
    generic: {
      clickToCopyURL: "Cliquez pour copier l'URL",
    },
    heading: 'Ressources',
    link: {
      type: 'Type: {{type}}',
      url: 'URL: {{url}}',
    },
    loadFile: {
      error: {
        failedToUpload: 'Erreur : échec de téléchargement du fichier',
        unauthenticated: 'Erreur : Utilisateur non authentifié',
      },
      upload: 'Télécharger le fichier',
      uploading: 'Téléchargement...',
    },
    noMatch: 'Aucune ressource ne correspond à ces filtres.',
    noSavedAssets: "Vous n'avez aucune ressource enregistrée.",
    processAsset: {
      addFile: 'Fichier ajouté: ',
      deployNotice: 'Le fichier devrait bientôt être disponible sur cette URL (~1 min).',
      success: 'Fichier ajouté aux ressources!',
      urlLabel: 'URL: ',
    },
    resetFilters: 'Réinitialiser',
    search: 'Rechercher',
    sort: {
      date: 'Date',
      fileName: 'Nom de fichier',
      heading: 'Trier par:',
    },
    types: {
      all: 'Tous types',
    },
    url: {
      fail: "Échec de la copie de l'URL.",
      success: "L'URL est copiée dans le presse-papiers.",
    },
  },
  backup: {
    backup: {
      assets: 'Ressources',
      button: 'Sauvegarde',
      desc: "Sauvegardez les données LiveCodes afin qu'elles puissent être restaurées ultérieurement sur cet appareil ou autres. <1></1> Pour plus de détails, veuillez consulter la <2>documentation</2>",
      heading: 'Sauvegarder',
      projects: 'Projets',
      settings: 'Paramètres utilisateur',
      snippets: 'Extraits de code',
      templates: "Modèles d'utilisateur",
    },
    backupBtn: 'Sauvegarder',
    error: {
      atLeastOneStore: 'Veuillez sélectionner au moins un option à sauvegarder',
      incorrectFileType: 'Erreur : type de fichier incorrect',
    },
    fileInputLabel: 'Restaurer à partir du fichier',
    heading: 'Sauvegarder / Restaurer',
    inProgress: 'En cours...',
    restore: {
      desc: 'Restaurer les données LiveCodes précédemment sauvegardées. <1></1> Si vous choisissez de remplacer le contenu actuel, vous souhaiterez peut-être d’abord le sauvegarder. <2></2> Pour plus de détails, veuillez consulter la <3>documentation</3>',
      fromFile: 'Restaurer à partir du fichier',
      heading: 'Restaurer',
      mode: {
        merge: 'Fusionner avec le contenu actuel',
        replace: 'Remplacer le contenu actuel',
      },
      success: 'Restauré avec succès!',
    },
  },
  broadcast: {
    broadcastBtn: {
      start: 'Diffuser',
      stop: 'Arrêter la diffusion',
    },
    broadcasting: 'Diffusion...',
    channelURL: 'URL de chaîne',
    connecting: 'Connexion...',
    desc: 'Diffusez la page de résultat vers d’autres navigateurs ou appareils en temps réel. Pour plus de détails, veuillez consulter la <1>documentation</1>',
    error: {
      generic: 'La diffusion a échoué !',
      serverURLRequired: "L'URL du serveur est requise !",
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
    changeLanguage: 'Chargement {{lang}}. Cela peut prendre un certain temps!',
    copy: {
      copied: 'Code copié dans le presse-papiers',
      copiedAsDataURL: 'Code copié comme URL de données',
      hint: 'Copié!',
      title: 'Copier',
    },
    error: {
      couldNotLoadTemplate: 'Impossible de charger le modèle: {{template}}',
      failedToCopyCode: 'Impossible de copier le code',
      failedToLoadTemplate: 'Échec du chargement du modèle',
      failedToLoadTemplates: 'Échec du chargement des modèles de démarrage',
      failedToParseSettings: "Échec de l'analyse des paramètres au format JSON",
      invalidCommand: 'Commande invalide!',
      invalidImport: "URL d'importation non valide",
      invalidPanelId: 'ID de panneau non valide',
      invalidToken: 'Jeton invalide!',
      login: 'Erreur de connexion!',
      logout: 'Erreur de déconnexion !',
      noResultContainer: 'Conteneur de résultat non trouvé',
      unavailable: 'Commande indisponible',
      unavailableForEmbeds: 'Commande indisponible pour les intégrations',
    },
    export: {
      gist: 'Créer un gist GitHub public...',
    },
    fork: {
      success: 'Dupliquer (fork) comme nouveau projet',
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
      success: 'Connecté avec succès',
      successWithName: 'Connecté en tant que: {{name}}',
    },
    logout: {
      success: 'Déconnexion réussie',
    },
    result: {
      hint: 'Afficher le résultat dans une nouvelle fenêtre',
    },
    save: {
      success: "Projet enregistré localement sur l'appareil!",
      successWithName: 'Projet "{{name}}" enregistré localement.',
    },
    template: {
      blank: 'Projet vide',
      delete: 'Supprimer le modèle "{{item}}"?',
      javascript: 'JavaScript Starter',
      react: 'React Starter',
      saved: 'Enregistré comme nouveau modèle',
      typescript: 'TypeScript Starter',
      vue: 'Vue 3 Starter',
    },
    unload: {
      notSaved: 'Les modifications que vous avez apportées peuvent ne pas être enregistrées.',
    },
    zoom: {
      hint: 'Zoom',
    },
  },
  customSettings: {
    JSON: 'Paramètres personnalisés JSON',
    heading: 'Paramètres personnalisés',
    load: 'Charger',
  },
  deploy: {
    create: {
      desc: 'Un nouveau dépôt <1>public</1> sera créé. La page de résultat sera envoyée (push) vers la branche <2>gh-pages</2>.',
      heading: 'Créer un nouveau dépôt',
      repoName: 'Nom du dépôt <1></1>',
    },
    error: {
      generic: 'Le déploiement a échoué!',
      repoNameRequired: 'Le nom du dépôt est obligatoire',
    },
    existing: {
      desc: 'Un nouveau commit sera ajouté à la branche <1>gh-pages</1>.',
      heading: 'Dépôt existant',
      repoName: 'Nom du dépôt',
    },
    generic: {
      commitMessage: 'Commit Message',
      commitSourceCodePublic: 'Commit source code (public)',
      deployBtn: 'Déployer',
      deploying: 'Déploiement...',
    },
    heading: 'Déployer sur les pages GitHub',
    searchRepo: 'Recherchez vos dépôts publics...',
  },
  editorSettings: {
    appLanguage: {
      heading: "Langue de l'interface utilisateur",
      note: "Recharge l'application pour appliquer les modifications après avoir changé de langue.",
    },
    closeBrackets: 'Fermeture automatique des crochets et des guillemets',
    codeJarDesc: '* Les fonctionnalités marquées ne sont pas disponibles dans CodeJar.',
    default: 'Par défaut',
    desc: 'Pour plus de détails, veuillez consulter la <1>documentation</1>',
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
      note: 'Powered by <1><2></2></1>',
    },
    fontFamily: 'Famille de polices',
    fontSize: 'Taille de la police',
    format: 'Format',
    heading: "Paramètres de l'éditeur",
    lineNumbers: 'Afficher les numéros de ligne',
    notAvailableInCodeJar: 'Non disponible dans CodeJar',
    preview: 'Aperçu',
    semicolons: 'Format: Utiliser des points-virgules',
    singleQuote: 'Format: Utiliser des guillemets simples',
    tabSize: 'Taille de tabulation',
    theme: 'Mode sombre',
    trailingComma: 'Format: Utilisez des virgules de fin',
    useTabs: {
      heading: 'Indentations',
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
    desc: 'Voir la <1>documentation</1> pour les configurations avancées.',
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
    heading: 'Projet intégré',
    lite: 'Mode simplifié',
    loading: {
      click: 'Au clic',
      eager: 'Anticipé',
      heading: 'Chargement',
      lazy: 'Différé.',
    },
    mode: {
      codeblock: 'Code Block',
      editor: 'Editor',
      full: 'Full',
      heading: "Mode d'affichage",
      result: 'Résultat',
    },
    permanentUrl: 'URL Permanent',
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
      open: 'Ouvrir',
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
      features: 'Caractéristiques',
      gettingStarted: 'Mise en route',
      github: 'GitHub',
      sdk: 'SDK',
      sponsor: 'Parrainer',
      twitter: '? / Twitter',
    },
    clickForInfo: 'Cliquez pour info...',
    close: 'Fermer',
    error: {
      authentication: "Erreur d'authentification !",
      exceededSize: 'Erreur: taille dépassée {{size}} MB',
      failedToReadFile: 'Erreur: impossible de lire le fichier',
    },
    loading: 'Chargement...',
    more: 'Plus...',
    optional: 'Facultatif',
    required: 'Requis',
  },
  import: {
    bulk: {
      desc: "Importez en masse plusieurs projets dans vos projets enregistrés. Les projets peuvent être exportés depuis l'écran <1>Projets enregistrés</1>",
      fromFile: 'Importation groupée depuis un fichier local',
      fromURL: 'Importation groupée depuis un URL',
      heading: 'Importation groupée',
      started: 'Importation groupée a démarré...',
    },
    code: {
      desc: 'Sources prises en charge: <1> <2>GitHub gist</2> <3>GitHub file</3> <4>Répertoire dans un dépôt GitHub</4> <5>Extrait de code Gitlab</5> <6>Fichier Gitlab</6> <7>Répertoire dans un dépôt Gitlab</7> <8>JS Bin</8> <9>Code brut</9> <10>Code dans une page Web DOM</10> <11>Code dans le fichier zip</11> <12>Playgrounds officiels<13></13>(TypeScript, Vue et Svelte)</12> </1> Pour plus de détails, veuillez consulter la <14>documentation</14>',
      fromFile: 'Importer des fichiers locaux',
      fromURL: 'Importer depuis une URL',
      heading: 'Importer code',
    },
    error: {
      failedToLoadURL: "Erreur: échec du chargement de l'URL",
      invalidConfigFile: 'Fichier de configuration non valide',
      invalidFile: 'Erreur: fichier non valide',
    },
    generic: {
      file: 'Fichier local',
      url: 'URL',
    },
    heading: 'Importer',
    json: {
      desc: "Importez un seul projet JSON dans l'éditeur. Un projet peut être exporté depuis app&nbsp;menu&nbsp;→ Exporter&nbsp;→ Exporter&nbsp;Projet&nbsp;(JSON).",
      fromFile: "Importer un projet à partir d'un fichier local",
      fromURL: 'Importer un projet depuis une URL',
      heading: 'Importer un projet JSON',
    },
    success: 'Importation réussie!',
  },
  login: {
    accessAllowed: "Autoriser l'accès à:",
    desc: '<1>En vous connectant, vous acceptez que des <2>cookies</2> peuvent être stockés sur votre appareil.</1> <3> <4>Pourquoi ces autorisations sont-elles nécessaires ?</4> </3> <5> <6>Comment modifier/révoquer les autorisations ?</6> </5>',
    gist: 'Gists',
    heading: 'Connectez-vous avec GitHub',
    loginAs: 'Connecté en tant que {{name}}',
    loginBtn: 'Se connecter',
    logout: 'Se déconnecter',
    privateRepo: 'Dépôts privés',
    publicRepo: 'Dépôts',
  },
  menu: {
    about: 'À propos …',
    assets: 'Ressources …',
    autoSave: 'Auto Enregistrer',
    autoUpdate: 'Mise à jour automatique',
    backup: 'Sauvegarde / Restauration …',
    blog: 'Blog',
    broadcast: 'Diffuser …',
    config: 'Configuration',
    customSettings: 'Paramètres personnalisés …',
    delay: {
      heading: 'Délai: <1>1.5</1>s',
      hint: 'Délai de mise à jour automatique',
    },
    docs: 'Documentation',
    deploy: 'Déployer …',
    editorSettings: "Paramètres de l'éditeur …",
    embed: 'Intégrer …',
    export: {
      codepen: 'Modifier dans CodePen',
      gist: 'Exporter vers GitHub Gist',
      heading: 'Exporter',
      jsfiddle: 'Modifier dans JSFiddle',
      json: 'Exporter Projet (JSON)',
      result: 'Exporter Result (HTML)',
      src: 'Exporter Source (ZIP)',
    },
    features: 'Fonctionnalités',
    formatOnsave: "Formater à l'enregistrement",
    getstart: 'Mise en route',
    import: 'Importer …',
    layout: 'Disposition verticale',
    license: 'License',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    new: 'Nouveau …',
    open: 'Ouvrir …',
    project: 'Information du Projet …',
    recoverUnsaved: 'Récupérer non enregistré',
    report: 'Raporter un bogue',
    resources: 'Ressources externes …',
    save: 'Enregistrer',
    saveAs: {
      fork: 'Fork (Nouveau projet)',
      heading: 'Enregistrer sous',
      template: 'Modèle',
    },
    sdk: 'Software Dev Kit',
    share: 'Partager …',
    showSpacing: {
      heading: "Afficher l'espacement",
      hint: 'Appuyez sur Alt/Option et déplacez votre curseur sur le résultat',
    },
    snippets: 'Extraits de code …',
    source: 'Code Source sur GitHub',
    sync: 'Sync (beta) … <1> ⏳</1>',
    theme: 'Thème sombre',
    welcome: {
      heading: 'Écran de Bienvenue …',
      hint: "Afficher l'écran de bienvenue au démarrage",
    },
  },
  open: {
    defaultTemplate: 'Modèle par défaut ',
    delete: {
      all: 'Supprimer {{projects}} projets?',
      deleting: 'Suppression de projets...',
      one: 'Supprimer le projet: {{project}}?',
    },
    deleteAll: 'Supprimer tout',
    exportAll: 'Exporter tout',
    filter: {
      language: 'Filtrer par langage ',
      tag: 'Filtrer par étiquette',
    },
    heading: 'Projets Enregistrés',
    import: 'Importer',
    lastModified: 'Dernière modification: {{modified}}',
    noData: {
      desc: 'Vous pouvez enregistrer un projet à partir de (settings&nbsp;menu&nbsp;&gt;&nbsp;Enregistrer ) ou par le raccourci clavier (Ctrl/Cmd&nbsp;+&nbsp;S).',
      heading: "Vous n'avez aucun projet enregistré.",
    },
    noMatch: 'Aucun projet ne correspond à ces filtres.',
    placeholder: {
      allLanguages: 'Tous les langages',
      filterByTags: 'Filtrer par étiquettes',
      search: 'Rechercher',
    },
    removeDefault: '(unset)',
    reset: 'Réinitialiser',
    setAsDefault: 'Définir modèle par défaut',
    sort: {
      heading: 'Trier par:',
      lastModified: 'Date',
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
    desc: 'Votre dernier projet comporte des modifications non enregistrées!',
    heading: 'Récupérer le projet non enregistré?',
    meta: 'Titre: <1></1> <2></2> Dernière modification : <3></3>',
    notShowAgain: 'Ne plus afficher ceci.',
    prompt: {
      discard: 'Supprimer le projet non enregistré',
      heading: '<1></1>Voulez-vous le récupérer maintenant?',
      recover: "Récupérer le projet dans l'éditeur",
      save: "Enregistrer sur l'appareil et continuer",
    },
  },
  resources: {
    browseOnJsDelivr: 'Parcourir les fichiers du package sur jsDelivr',
    cssPresets: {
      heading: 'CSS Presets',
      none: 'None',
      normalizeCss: 'Normalize.css',
      resetCss: 'Reset CSS',
    },
    error: {
      failedToLoadResults: 'Échec du chargement des résultats!',
      noResultsFound: 'Aucun résultat trouvé pour: ',
    },
    fonts: {
      add: 'Ajouter',
      heading: 'Polices <1>(powered by Google Fonts)</1>',
      select: 'Sélectionner la police ...',
    },
    heading: 'Ressources externes',
    scripts: 'Scripts externes',
    search: {
      heading: 'Rechercher des packages <1>(powered by jsDelivr)</1>',
      placeholder: 'e.g. jquery, lodash@4, bootstrap@5.2.3, ...',
    },
    stylesheets: 'Feuilles de style externes',
    urlDesc:
      'Ajoutez les URL de feuille de style/script et cliquez sur «Charger». Chaque URL doit figurer sur une ligne distincte.',
  },
  savePrompt: {
    heading: 'Modifications non enregistrées',
    prompt: {
      cancel: 'Annuler',
      discard: 'Supprimer',
      heading:
        'Les modifications ne sont peuvent peut-être pas être enregistrées. <1></1> Voulez-vous enregistrer maintenant?',
      save: 'Enregistrer',
    },
  },
  share: {
    characters: '{{urlLength}} characters',
    copy: {
      clickToCopy: 'Cliquez pour copier',
      copied: 'URL copiée dans le presse-papiers',
    },
    encodedURL: "Obtenir l'URL codée",
    error: {
      failedToCopy: 'La copie dans le presse-papiers a échoué!',
      failedToGenerateURL: "Échec de la génération de l'URL courte!",
    },
    expireInOneYear: 'Expire dans 1 an',
    generateURL: "Génération d'URL …",
    heading: 'Partager',
    permanentURL: 'URL Permanent',
    qrcode: {
      clickToDownload: 'Cliquez pour télécharger',
      generating: 'Générateur...',
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
      qrCode: 'QR code',
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
      all: 'Supprimer {{snippets}} extraits?',
      one: 'Supprimer extrait: {{snippet}}?',
    },
    deleteAll: 'Supprimer tout',
    error: {
      failedToCopy: "Échec de la copie de l'URL.",
      noTitle: "Veuillez ajouter un titre d'extrait.",
    },
    filter: {
      language: 'filtrer par langage',
    },
    heading: 'Extraits de code',
    lastModified: 'Dernière modification: {{modified}}',
    noMatch: 'Aucun extrait ne correspond à ces filtres.',
    noSavedSnippets: "Vous n'avez aucun extrait enregistré.",
    placeholder: {
      allLanguages: 'Touts les langages',
      search: 'Rechercher',
    },
    reset: 'Réinitialiser',
    save: {
      success: "Extrait enregistré localement sur l'appareil!",
    },
    sort: {
      date: 'Date',
      heading: 'Trier par:',
      title: 'Titre',
    },
    text: 'Texte brut',
  },
  splash: {
    loading: 'Chargement de LiveCodes…',
  },
  sync: {
    autoSync: 'Auto sync',
    create: {
      desc: 'Un nouveau dépôt <1>privé</1> sera créé. Vos données locales LiveCodes seront synchronisées avec la branche <2>principale</2>.',
      heading: 'Créer un nouveau dépôt',
      repoName: 'Nom du dépôt',
    },
    error: {
      generic: 'La synchronisation a échoué!',
      repoNameRequired: 'Le nom du dépôt est obligatoire',
    },
    existing: {
      desc: 'Vos données locales LiveCodes seront synchronisées avec la branche <1>principale</1>.',
      heading: 'Dépôt existant',
      repoName: 'Nom du dépôt',
    },
    heading: 'Synchroniser avec le dépôt GitHub',
    searchRepos: 'Search your repos...',
    success: 'Synchronisation terminée!',
    syncBtn: 'Synchroniser',
    syncInProgress: 'Synchronisation en cours...',
    syncStarted: 'Synchronisation démarrée...',
  },
  templates: {
    heading: 'Nouveau Projet',
    noUserTemplates: {
      desc: 'Vous pouvez enregistrer un projet en tant que modèle à partir de <1></1>(App&nbsp;menu&nbsp;&gt;&nbsp;Sauvegarder&nbsp;sous&nbsp;&gt; Modèle).',
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
      clear: 'Effacer console',
      title: 'Console',
    },
    test: {
      edit: 'Éditer',
      error: '<1><2>Erreur de test!</2></1>',
      loading: '<1>Chargement des tests...</1>',
      noTest: '<1>Aucun test pour ce projet!</1>',
      reset: 'Réinitialiser',
      run: {
        desc: 'Ctrl/Cmd + Alt + T',
        heading: 'Exécuter',
      },
      summary: {
        desc: 'Tests: {{failed}}\n       {{passed}}\n       {{skipped}}\n       {{total}}<1></1>\nTemps: {{duration}}s',
        failed: '{{failedNum}} échoué',
        passed: '{{passedNum}} passé',
        skipped: '{{skippedNum}} ignoré',
        total: '{{totalNum}} total',
      },
      title: 'Tests',
      watch: {
        desc: 'Exécuter des tests lorsque le code change',
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
      lastModified: 'Dernière modification: <1></1>',
      recover: 'Récupérer',
      save: 'Enregistrer',
      unsavedChanges: 'Votre dernier projet comportait des modifications non enregistrées:',
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
} as const satisfies I18nTranslationTemplate;

export default translation;
