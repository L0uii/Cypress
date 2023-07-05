export const PENDING = `AND (fiduSign:statut:'MAIL_ENVOYE' OR fiduSign:statut:'MAIL_SEND' OR fiduSign:statut:'MAIL_RENVOYE' OR fiduSign:statut:'DOCUMENT_LU' OR fiduSign:statut:'SIGNATURE_EC_*')`;
export const CANCELLED = `AND (fiduSign:statut:'DEMANDE_ANNULEE' OR fiduSign:statut:'DEMANDE_EXPIREE')`;

export const CLASSEMENT = [
  {
    labelFamille: 'Flotte automobile',
    famille: 'Flotte_automobile',
    list: [
      {
        sousFamille: "Location_longue_duree",
        labelSousFamille: "Location longue durée",
      },
      {
        sousFamille: "Location_courte_duree",
        labelSousFamille: "Location courte durée",
      },
      {
        sousFamille: "Cartes_petrolieres_services",
        labelSousFamille: "Cartes pétrolières et prestations de services associés",
      },
      {
        sousFamille: "Autres_prestations",
        labelSousFamille: "Autres prestataires (flotte auto)",
      },
    ]
  },
  {
    labelFamille: 'Immobilier',
    famille: 'Immobilier',
    list: [
      {
        sousFamille: "Securite",
        labelSousFamille: "Sécurité (Immobilier)",
      },
      {
        sousFamille: "Nettoyage_Dechets",
        labelSousFamille: "Nettoyage et gestion des déchets",
      },
      {
        sousFamille: "Entretien_maintenance",
        labelSousFamille: "Entretien, maintenance et travaux",
      },
      {
        sousFamille: "Energie",
        labelSousFamille: "Énergie",
      },
      {
        sousFamille: "Amenagement",
        labelSousFamille: "Aménagement des bureaux",
      },
    ]
  },
  {
    labelFamille: 'Logistique',
    famille: 'Logistique',
    list: [
      {
        sousFamille: "Transport",
        labelSousFamille: "Transport",
      },
      {
        sousFamille: "Equipement_entrepot",
        labelSousFamille: "Équipements entrepôt",
      },
      {
        sousFamille: "Emballages",
        labelSousFamille: "Emballages",
      },
    ]
  },
  {
    labelFamille: 'Marketing Communication',
    famille: 'Marketing_Communication',
    list: [
      {
        sousFamille: "Publicite",
        labelSousFamille: "Publicité",
      },
      {
        sousFamille: "Goodies_cadeaux",
        labelSousFamille: "Goodies et cadeaux publicitaires",
      },
      {
        sousFamille: "Evenementiel",
        labelSousFamille: "Événementiel",
      },
      {
        sousFamille: "Communication",
        labelSousFamille: "Communication (relation presse, enseigne, pub...)",
      },
    ]
  },
  {
    labelFamille: 'Moyens généraux',
    famille: 'Moyens_generaux',
    list: [
      {
        sousFamille: "Voyage_deplacement",
        labelSousFamille: "Voyages et déplacements",
      },
      {
        sousFamille: "Transport_express",
        labelSousFamille: "Transport express",
      },
      {
        sousFamille: "Restauration",
        labelSousFamille: "Restauration",
      },
      {
        sousFamille: "Fourniture_informations",
        labelSousFamille: "Fourniture d'informations",
      },
      {
        sousFamille: "Fourniture",
        labelSousFamille: "Fournitures de bureaux et produits personnalisés",
      },
      {
        sousFamille: "Courrier_affranchissement",
        labelSousFamille: "Courrier et affranchissement",
      },
    ]
  },
  {
    labelFamille: 'Prestations intellectuelles',
    famille: 'Prestations_intellectuelles',
    list: [
      {
        sousFamille: "Recrutement",
        labelSousFamille: "Recrutement",
      },
      {
        sousFamille: "Interim",
        labelSousFamille: "Intérim",
      },
      {
        sousFamille: "Formation",
        labelSousFamille: "Formation",
      },
    ]
  },
  {
    labelFamille: 'Sécurité',
    famille: 'Securite',
    list: [
      {
        sousFamille: "Tenue_travail",
        labelSousFamille: "Tenues de travail",
      },
    ]
  },
  {
    labelFamille: 'Systèmes Informations',
    famille: 'Systemes_Informations',
    list: [
      {
        sousFamille: "Prestation",
        labelSousFamille: "Prestation (SI)",
      },
      {
        sousFamille: "Logiciel",
        labelSousFamille: "Logiciel",
      },
    ]
  },
  {
    labelFamille: 'Télécoms',
    famille: 'Telecoms',
    list: [
      {
        sousFamille: "Tel_mobile",
        labelSousFamille: "Téléphonie mobile",
      },
      {
        sousFamille: "Tel_fixe",
        labelSousFamille: "Téléphonie fixe",
      },
      {
        sousFamille: "Internet",
        labelSousFamille: "Internet (data)",
      },
      {
        sousFamille: "Materiel",
        labelSousFamille: "Matériel",
      },
    ]
  }
];

export const SIGNATAIRES = [
  {
    fullName: 'Benoît MILLOT',
    name: 'Benoît ',
    surname: 'MILLOT',
    email: 'benoit.millot@fiducial.net',
    phone: ''
  },
  {
    fullName: 'José PINTO RIBEIRO',
    name: 'José',
    surname: 'PINTO RIBEIRO',
    email: 'jose.pinto.ribeiro@fiducial.net',
    phone: ''
  },
  {
    fullName: 'Christian LATOUCHE',
    name: 'Christian',
    surname: 'LATOUCHE',
    email: 'contact.presidence@fiducial.net',
    phone: ''
  },
  {
    fullName: 'Sylvain LOISY',
    name: 'Sylvain',
    surname: 'LOISY',
    email: 'sylvain.loisy@fiducial.net',
    phone: ''
  },
];
