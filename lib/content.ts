export type Locale = "en" | "fr";
export const localeOf = (locale: string): Locale =>
  locale === "fr" ? "fr" : "en";
export const personaSlugs = [
  "early-signs",
  "family-history",
  "active-living",
  "on-your-feet",
  "lifelong-movement",
] as const;
export type PersonaSlug = (typeof personaSlugs)[number];
export type Persona = {
  slug: PersonaSlug;
  image: string;
  label: string;
  short: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  insight: string;
  needs: [string, string][];
  question: string;
  answer: string;
  quote: string;
  name: string;
  context: string;
  cta: string;
};
export const personas: Record<Locale, Persona[]> = {
  en: [
    {
      slug: "early-signs",
      image: "lifestyle-wrap-woman",
      label: "The first signs",
      short: "A new chapter in foot care.",
      eyebrow: "FOR THE LITTLE CHANGES YOU NOTICE",
      title: "Listen to the",
      accent: "little things.",
      intro:
        "A change in the shape of your big toe. Shoes that feel different. When you start paying attention to your feet, it helps to understand what comes next.",
      insight:
        "You don’t need all the answers to start asking the right questions.",
      needs: [
        [
          "Understand your feet",
          "Learn about the muscle along the inner edge of your foot and the idea behind targeted stimulation.",
        ],
        [
          "Make room for care",
          "An open, lightweight wrap conceived to fit into a quiet moment at home.",
        ],
        [
          "Start a conversation",
          "Bring your questions to a foot specialist. A change in toe alignment deserves an individual assessment.",
        ],
      ],
      question: "Could Albea stop a bunion from developing?",
      answer:
        "That is an ambition to investigate, not an established benefit. Albea is in development and has not been shown to prevent or correct hallux valgus. A clinician can help you understand your own foot changes.",
      quote:
        "Bunions run in my family. I want to understand what I can do for my feet early on. The muscle-focused idea behind albea Pulse interests me, and I want to see the research on prevention.",
      name: "Claire",
      context: "The early-awareness persona",
      cta: "Discover a thoughtful first step",
    },
    {
      slug: "family-history",
      image: "family",
      label: "It runs in the family",
      short: "Curiosity is a good first step.",
      eyebrow: "FOR PEOPLE THINKING AHEAD",
      title: "A family story.",
      accent: "Your own path.",
      intro:
        "Maybe your mother has bunions. Maybe your grandmother did, too. Understanding your feet can be a positive way to look ahead, without assuming history will repeat itself.",
      insight:
        "An inherited tendency is a reason to be curious, not a reason to worry.",
      needs: [
        [
          "Know the background",
          "Inherited foot structure can contribute to hallux valgus. Family history is one part of a bigger picture.",
        ],
        [
          "Build an informed routine",
          "Explore the concept of targeted muscle stimulation alongside everyday attention to footwear and comfort.",
        ],
        [
          "Stay in the loop",
          "Follow our development journey and the evidence as it emerges, with no commitment to buy.",
        ],
      ],
      question: "If bunions run in my family, will I definitely develop one?",
      answer:
        "No. Family history may contribute to risk, but it does not determine an individual outcome. Albea has not been proven to change inherited risk. Ask a qualified clinician about your personal situation.",
      quote:
        "My mother’s experience made me curious. I want to understand my options and follow the research, without big promises.",
      name: "Sophie",
      context: "The family-history persona",
      cta: "Explore a more informed approach",
    },
    {
      slug: "active-living",
      image: "active",
      label: "Always in motion",
      short: "For the miles and the moments.",
      eyebrow: "FOR WALKERS, RUNNERS & WEEKEND EXPLORERS",
      title: "For the places",
      accent: "you’ll go.",
      intro:
        "The morning walk. The next trail. The long way home. Your feet are part of every adventure—and deserve a place in your care routine.",
      insight:
        "You think about your next adventure. We think about the feet that take you there.",
      needs: [
        [
          "Meet an overlooked muscle",
          "Get to know the abductor hallucis, which runs along the inner foot toward the big toe.",
        ],
        [
          "Find your quiet moment",
          "The concept is designed around a seated session at home, separate from your training.",
        ],
        [
          "Keep your perspective",
          "Foot care complements an active life. Performance, recovery and injury-prevention benefits are not established for Albea.",
        ],
      ],
      question: "Can I wear Albea while running or exercising?",
      answer:
        "The proposed routine is seated and at rest, not during sport. Final use instructions will depend on product testing. Albea is not currently available, and no athletic performance or recovery claims have been established.",
      quote:
        "I already make time for stretching. A simple way to pay attention to my feet would feel like a natural next step.",
      name: "Alex",
      context: "The active-lifestyle persona",
      cta: "Make room for your feet",
    },
    {
      slug: "on-your-feet",
      image: "work",
      label: "On your feet all day",
      short: "A moment that belongs to you.",
      eyebrow: "FOR THE PEOPLE WHO KEEP US MOVING",
      title: "You give all day.",
      accent: "Take a moment.",
      intro:
        "Caring for patients. Teaching a class. Welcoming one more customer. When your working day is spent standing, the end of the day should include a little time for you.",
      insight:
        "A thoughtful routine starts with making it easy to show up for yourself.",
      needs: [
        [
          "Designed for real life",
          "An open wrap with four integrated electrode positions, conceived to keep setup simple.",
        ],
        [
          "A pause after your shift",
          "A seated routine at home, with a lightweight design that leaves the toes free.",
        ],
        [
          "Care that starts with you",
          "Persistent pain deserves professional advice. Albea is a concept in development, not a proven solution for work-related foot pain.",
        ],
      ],
      question: "Will Albea relieve the pain after a long shift?",
      answer:
        "Pain relief has not been established for this product. The concept explores targeted muscle activation. For persistent or worsening pain, a healthcare professional can assess the cause and recommend appropriate care.",
      quote:
        "After a day on my feet, I want a routine that feels easy to keep. The open design looks simple to put on. I can picture a quiet moment at home, without another complicated task.",
      name: "Camille",
      context: "The standing-professional persona",
      cta: "Discover your after-work ritual",
    },
    {
      slug: "lifelong-movement",
      image: "lifestyle-wrap-man-coffee",
      label: "Moving through life",
      short: "More of what you love.",
      eyebrow: "FOR EVERY CHAPTER AHEAD",
      title: "Keep making",
      accent: "everyday plans.",
      intro:
        "A walk with a friend. A morning in the garden. A new city to explore. Looking after your feet is one small part of continuing to enjoy the life you love.",
      insight:
        "The best reason to care for your feet is everything you still want to do.",
      needs: [
        [
          "Simple by intention",
          "An easy-to-understand concept, with an open shape and a small controller. Final usability is still being evaluated.",
        ],
        [
          "Knowledge at your pace",
          "Clear explanations of the anatomy, the design and what the research does—and doesn’t—tell us.",
        ],
        [
          "A personal conversation",
          "Suitability depends on individual health and future product guidance. Discuss electrical stimulation with your clinician.",
        ],
      ],
      question: "Is Albea Pulse suitable for everyone as they get older?",
      answer:
        "No universal suitability can be assumed. Health conditions, implanted electronic devices, skin health and sensation may affect whether electrical stimulation is appropriate. A clinician and final product instructions will guide suitability once available.",
      quote:
        "Keeping my feet healthy is a long-term priority. I’m looking for a habit I could maintain over the months, alongside my walks. That is what I would want from albea Pulse.",
      name: "Paul",
      context: "The lifelong-movement persona",
      cta: "Look forward to the next chapter",
    },
  ],
  fr: [
    {
      slug: "early-signs",
      image: "lifestyle-wrap-woman",
      label: "Les premiers signes",
      short: "Un nouveau regard sur vos pieds.",
      eyebrow: "POUR LES PETITS CHANGEMENTS QUE VOUS REMARQUEZ",
      title: "À l’écoute des",
      accent: "petits signes.",
      intro:
        "Un gros orteil qui change de forme. Des chaussures qui semblent différentes. Quand on commence à faire attention à ses pieds, comprendre la suite fait du bien.",
      insight:
        "Pas besoin de tout savoir pour commencer à poser les bonnes questions.",
      needs: [
        [
          "Comprendre vos pieds",
          "Découvrez le muscle qui longe le bord interne du pied et le principe de la stimulation ciblée.",
        ],
        [
          "Faire une place au soin",
          "Un support ouvert et léger, imaginé pour accompagner un moment calme à la maison.",
        ],
        [
          "Ouvrir le dialogue",
          "Posez vos questions à un spécialiste du pied. Un changement d’alignement mérite une évaluation personnalisée.",
        ],
      ],
      question: "Albea peut-il empêcher l’apparition d’un hallux valgus ?",
      answer:
        "C’est une ambition à explorer, pas un bénéfice démontré. Albea est en développement ; sa capacité à prévenir ou à corriger l’hallux valgus n’est pas établie. Un professionnel pourra évaluer les changements de votre pied.",
      quote:
        "L’hallux valgus est présent dans ma famille. Je veux comprendre comment prendre soin de mes pieds en amont. L’approche musculaire d’albea Pulse m’intéresse ; j’attends les études sur la prévention.",
      name: "Claire",
      context: "Profil : premiers signes",
      cta: "Découvrir un premier pas attentionné",
    },
    {
      slug: "family-history",
      image: "family",
      label: "Une histoire de famille",
      short: "Comprendre pour mieux avancer.",
      eyebrow: "POUR CELLES ET CEUX QUI ANTICIPENT",
      title: "Une histoire de famille.",
      accent: "Votre propre chemin.",
      intro:
        "Votre mère a peut-être un hallux valgus. Votre grand-mère aussi. Comprendre vos pieds, c’est regarder vers l’avenir sans supposer que l’histoire se répétera.",
      insight:
        "Une prédisposition familiale invite à s’informer, pas à s’inquiéter.",
      needs: [
        [
          "Comprendre le contexte",
          "La morphologie du pied, en partie héréditaire, peut contribuer à l’hallux valgus. Ce n’est qu’un élément parmi d’autres.",
        ],
        [
          "S’informer au quotidien",
          "Explorez le principe de la stimulation musculaire ciblée, en complément d’une attention au chaussage et au confort.",
        ],
        [
          "Suivre les avancées",
          "Découvrez les étapes du développement et les résultats à venir, sans engagement d’achat.",
        ],
      ],
      question:
        "Un antécédent familial signifie-t-il que j’aurai un hallux valgus ?",
      answer:
        "Non. Les antécédents familiaux peuvent contribuer au risque, sans déterminer votre situation individuelle. Rien ne démontre qu’Albea modifie ce risque. Un professionnel de santé pourra vous conseiller.",
      quote:
        "L’expérience de ma mère m’a donné envie de m’informer. Je veux comprendre les possibilités et suivre la recherche, sans grandes promesses.",
      name: "Sophie",
      context: "Profil : antécédents familiaux",
      cta: "Avancer en étant mieux informé",
    },
    {
      slug: "active-living",
      image: "active",
      label: "Toujours en mouvement",
      short: "Pour les kilomètres et les instants.",
      eyebrow: "POUR LES MARCHEURS, COUREURS ET EXPLORATEURS",
      title: "Pour tous vos",
      accent: "prochains horizons.",
      intro:
        "La marche du matin. Le prochain sentier. Le chemin le plus long pour rentrer. Vos pieds vous accompagnent partout et méritent une place dans votre routine.",
      insight:
        "Vous pensez à la prochaine aventure. Nous pensons aux pieds qui vous y emmènent.",
      needs: [
        [
          "Rencontrer un muscle discret",
          "Découvrez l’abducteur de l’hallux, qui longe le bord interne du pied jusqu’au gros orteil.",
        ],
        [
          "Trouver un moment calme",
          "Le concept est pensé pour une séance assise à la maison, en dehors de l’activité sportive.",
        ],
        [
          "Garder du recul",
          "Aucun bénéfice sur la performance, la récupération ou la prévention des blessures n’est établi pour Albea.",
        ],
      ],
      question: "Puis-je porter Albea en courant ou pendant le sport ?",
      answer:
        "La routine envisagée se déroule assis, au repos, pas pendant le sport. Les instructions définitives dépendront des essais. Albea n’est pas encore disponible et aucun effet sur la performance ou la récupération n’est démontré.",
      quote:
        "Je prends déjà le temps de m’étirer. Accorder un peu d’attention à mes pieds serait une suite assez naturelle.",
      name: "Alex",
      context: "Profil : vie active",
      cta: "Faire une place à vos pieds",
    },
    {
      slug: "on-your-feet",
      image: "work",
      label: "Debout toute la journée",
      short: "Un moment rien que pour vous.",
      eyebrow: "POUR CEUX QUI FONT AVANCER NOS JOURNÉES",
      title: "Vous donnez beaucoup.",
      accent: "Prenez un instant.",
      intro:
        "Soigner des patients. Faire classe. Accueillir un dernier client. Après une journée passée debout, il devrait toujours rester un peu de temps pour vous.",
      insight:
        "Une routine attentionnée commence par un geste facile à intégrer.",
      needs: [
        [
          "Pensé pour la vraie vie",
          "Un support ouvert avec quatre positions d’électrodes intégrées, imaginé pour simplifier l’installation.",
        ],
        [
          "Une pause après le travail",
          "Un rituel assis, à la maison, avec un design léger qui laisse les orteils libres.",
        ],
        [
          "Votre santé d’abord",
          "Une douleur persistante mérite un avis médical. Albea est un concept en développement, pas une solution prouvée aux douleurs liées au travail.",
        ],
      ],
      question: "Albea soulagera-t-il mes douleurs après une longue journée ?",
      answer:
        "L’effet antalgique de ce produit n’est pas établi. Le concept explore l’activation musculaire ciblée. En cas de douleur persistante ou croissante, consultez un professionnel pour en évaluer la cause.",
      quote:
        "Après une journée debout, j’ai envie d’une routine facile à garder. Le support ouvert paraît simple à enfiler. Je m’imagine un moment au calme à la maison, sans une tâche compliquée de plus.",
      name: "Camille",
      context: "Profil : métier exercé debout",
      cta: "Découvrir votre rituel après le travail",
    },
    {
      slug: "lifelong-movement",
      image: "lifestyle-wrap-man-coffee",
      label: "Bouger à tout âge",
      short: "Profiter de ce que vous aimez.",
      eyebrow: "POUR TOUS LES CHAPITRES À VENIR",
      title: "Gardez le goût",
      accent: "des petits projets.",
      intro:
        "Une promenade entre amis. Une matinée au jardin. Une ville à découvrir. Prendre soin de vos pieds fait partie des petites attentions pour la vie que vous aimez.",
      insight:
        "La meilleure raison de prendre soin de vos pieds, c’est tout ce que vous avez encore envie de faire.",
      needs: [
        [
          "La simplicité comme intention",
          "Un concept facile à comprendre, une forme ouverte et un petit boîtier. L’ergonomie reste à évaluer.",
        ],
        [
          "Comprendre à votre rythme",
          "Des explications claires sur l’anatomie, le design et ce que la recherche permet, ou non, d’affirmer.",
        ],
        [
          "Un échange personnalisé",
          "La compatibilité dépend de votre santé et des futures recommandations. Parlez de l’électrostimulation avec votre médecin.",
        ],
      ],
      question:
        "Albea Pulse convient-il à toutes les personnes qui avancent en âge ?",
      answer:
        "On ne peut pas présumer d’une compatibilité universelle. Certaines pathologies, les dispositifs électroniques implantés, l’état de la peau et la sensibilité peuvent influer sur la pertinence de l’électrostimulation. L’avis médical et la notice définitive guideront son utilisation.",
      quote:
        "Garder mes pieds en bonne santé compte pour moi sur la durée. Je cherche une habitude que je pourrais conserver au fil des mois, en complément de mes promenades. C’est ce que j’aimerais trouver avec albea Pulse.",
      name: "Paul",
      context: "Profil : mobilité au fil des années",
      cta: "Imaginer le prochain chapitre",
    },
  ],
};
export const copy = {
  en: {
    announcement: "Free shipping and 30-day returns on all orders.",
    announcementLink: "Meet Albea Pulse",
    preview: "CONCEPT PREVIEW",
    nav: ["albea™ Pulse", "The science", "Questions"],
    join: "Pre-order",
    discover: "Discover Albea Pulse",
    how: "Explore the science",
    eyebrow: "A LITTLE MORE ATTENTION FOR YOUR FEET.",
    title: "Your feet",
    title2: "carry you.",
    accent: "Don’t wait for pain to care for them.",
    intro:
      "Your feet deserve attention today. Four targeted electrodes, one simple open wrap: albea Pulse explores muscle activation to support a future foot-strengthening routine. Its effect on bunion prevention has yet to be established.",
    launch: "In development for 2027 · France & United States",
    concept: "Product concept · Design may evolve",
    wornImageAlt: "Approved Albea Pulse open foot wrap with four round modules, shown on a foot",
    imageAlt:
      "Albea Pulse open ivory foot wrap with four electrode positions, a heel anchor, free instep and open big-toe loop",
    imageTitle: "Small by design.",
    imageSubtitle: "Thoughtful by nature.",
    trust: [
      "A muscle-focused approach",
      "4 targeted electrodes",
      "An open, lightweight design",
      "Made for moments at home",
    ],
    audienceEyebrow: "DIFFERENT DAYS. THE SAME FOUNDATION.",
    audienceTitle: "Life moves differently",
    audienceAccent: "for everyone.",
    audienceIntro: "Find the story that feels like yours.",
    explore: "Explore your journey",
    scienceEyebrow: "THE IDEA BEHIND ALBEA",
    scienceTitle: "A small muscle.",
    scienceAccent: "A thoughtful approach.",
    scienceIntro:
      "The abductor hallucis runs from the heel along the inner foot to the big toe. Albea is being developed to explore its activation through four carefully placed electrodes.",
    electrodes: [
      { title: "At the rear of the muscle", description: "A first electrode near the heel, at the rear of the abductor hallucis." },
      { title: "At the front of the muscle", description: "A second electrode at the front of the same muscle, toward the big toe." },
      { title: "Above the big toe", description: "A third electrode on the upper side of the big toe, near its base." },
      { title: "Below the big toe", description: "A fourth electrode on the underside of the big toe, near its base." },
    ],
    anatomy: "Abductor hallucis",
    diagramView: "MEDIAL VIEW · CONCEPT",
    diagramHeel: "HEEL",
    diagramToe: "BIG TOE",
    diagramMuscle: "Target muscle",
    diagramElectrodes: "4 electrodes",
    schematic:
      "Simplified medial view · Conceptual placement, not a fitting guide",
    clickExplore: "Select an electrode to explore",
    evidence:
      "Our ambition is to investigate a role in hallux valgus care. Prevention, correction and clinical benefits have not been established for Albea.",
    evidenceLink: "Understand the research",
    routineEyebrow: "CARE THAT FITS INTO YOUR DAY",
    routineTitle: "Your quiet moment.",
    routineAccent: "Reimagined.",
    routineIntro:
      "A considered design for a simple idea: make space for your feet, without putting life on hold.",
    routineSteps: [
      {
        title: "Slip into something thoughtful.",
        body: "An open wrap that leaves your toes and the top of your foot free.",
      },
      {
        title: "Connect with your routine.",
        body: "Four integrated electrode positions and a compact controller, conceived for simplicity.",
      },
      {
        title: "Take a seat. Take a moment.",
        body: "A routine at rest. Session settings and duration will be defined through testing.",
      },
    ],
    heroLifestyleAlt:
      "Woman reading in a sunlit home, wearing Albea Pulse open foot wraps",
    routineImage:
      "Man reading in a linen armchair, wearing Albea Pulse open foot wraps",
    coffeeImage:
      "Older man enjoying a coffee at home, wearing Albea Pulse open foot wraps",
    reviewsEyebrow: "THE ROUTINES WE’RE DESIGNING FOR",
    reviewsTitle: "A little care.",
    reviewsAccent: "A very personal reason.",
    reviewsNote:
      "Illustrative testimonials for this concept demo. Quotes and portraits represent fictional personas, not customers or product results.",
    sample: "ILLUSTRATIVE VOICE",
    storyEyebrow: "FROM A CLINICAL QUESTION TO EVERYDAY CARE",
    storyTitle: "Good ideas begin",
    storyAccent: "with listening.",
    storyBody:
      "Albea began with a surgeon’s question: could targeted activation of an often-overlooked foot muscle become part of a simpler care routine? We’re bringing together that clinical curiosity and a considered textile design to explore the answer.",
    storyFoot: "Led by a surgeon. Guided by questions. Built with care.",
    faqEyebrow: "A LITTLE MORE CLARITY",
    faqTitle: "Good questions.",
    faqAccent: "Thoughtful answers.",
    faqs: [
      {
        q: "What exactly is Albea?",
        a: "Albea Pulse is an open foot-wrap concept with four electrode positions: at the rear and front of the abductor hallucis, then above and below the big toe. It is designed to explore electrical activation of the abductor hallucis muscle. The final product and use instructions are still in development.",
      },
      {
        q: "Can Albea prevent or correct hallux valgus?",
        a: "This is a research ambition, not a proven benefit. Albea has not been shown to prevent, correct or treat hallux valgus. A published randomized trial of additional neuromuscular stimulation did not find an added benefit over its comparison conservative treatment. Product-specific studies are still needed.",
      },
      {
        q: "When and where will it be available?",
        a: "The team is targeting 2027 and exploring launches in France and the United States. Timing and availability depend on development, validation and applicable market requirements. There are no orders or payments in this demo.",
      },
      {
        q: "How long is a session?",
        a: "The intended experience is a seated session at home. Session duration, intensity settings, frequency, sizing and care instructions will be established through testing; this preview does not prescribe a regimen.",
      },
      {
        q: "Can I try the shopping experience?",
        a: "Yes. Open the product page, choose a demo size and add it to your bag. The bag and checkout preview are interactive, but no order is placed, no payment is taken and nothing is sent to Shopify.",
      },
    ],
    joinEyebrow: "THE NEXT CHAPTER STARTS HERE",
    joinTitle: "Good things",
    joinAccent: "are afoot.",
    joinIntro:
      "Follow the idea as it takes shape. A more thoughtful approach to foot care, coming in 2027.",
    email: "Your email address",
    country: "Your market",
    consent: "I’d like to hear about Albea’s development and launch.",
    submit: "Keep me in the loop",
    formNote: "Demo only. Your details are not saved or sent.",
    successTitle: "You’re part of the idea.",
    successBody:
      "That’s how the sign-up will feel. This is a preview, so your email hasn’t been saved or subscribed.",
    reset: "Try another email",
    footerTag: "A little care. A lifetime of movement.",
    footerExplore: "Explore",
    footerLearn: "Good to know",
    faq: "Your questions",
    research: "Research & transparency",
    demo: "About this preview",
    footerNote:
      "Albea is in development. Images show a design concept. Clinical benefits and market authorizations are not established. Planned availability in France and the United States is subject to validation.",
    rights: "© 2026 Albea. A concept for the way we move.",
    privacy: "Demo privacy: no form data collected.",
    back: "All journeys",
    needsTitle: "Made with your",
    needsAccent: "everyday in mind.",
    nextJourney: "Another story to explore",
    productTitle: "Albea Pulse",
    productSub: "An open design. A precise intention.",
    productLabel: "THE ALBEA CONCEPT · 2027",
    galleryNote:
      "Concept imagery. Final materials, fit and accessories may change.",
    sizeGuide: "Size guide",
    sizeNote:
      "Illustrative EU sizes only. Final fit and US sizing will be validated before launch.",
    productFaq: "The details, thoughtfully considered",
    researchTitle: "Curiosity, with clarity.",
    researchIntro:
      "The science informs the question. It does not yet validate the product.",
    researchSections: [
      {
        title: "The anatomy",
        body: "The abductor hallucis is an intrinsic foot muscle running along the medial side of the foot, from the heel toward the big toe. It contributes to big-toe movement. The four-position electrode layout is a product concept, not a clinically validated placement protocol.",
      },
      {
        title: "What published research tells us",
        body: "A randomized trial involving 28 women (48 feet) compared orthoses and exercise with the same care plus neuromuscular electrical stimulation. Over one month, adding stimulation did not provide additional benefit in the primary outcomes. This was not a study of Albea and does not establish prevention.",
      },
      {
        title: "What remains to be established",
        body: "The wrap needs product-specific testing of safety, electrode placement, usability and effectiveness. No prevention, deformity-correction, pain-relief or athletic-performance benefit is claimed in this preview.",
      },
    ],
    sourceLabel: "Read the source",
    aboutTitle: "A preview of what’s next.",
    aboutBody:
      "This is a demonstration of the Albea brand and shopping experience for a product planned for 2027. Photography is AI-generated concept imagery. Audience quotations are fictional, clearly labeled examples. The €150 price and size options are illustrative. No personal data is submitted by the sign-up form, no checkout payment is possible, and the store is not connected to Shopify.",
    aboutSecond:
      "The five audience pages are hypotheses informed by published information about hallux valgus and everyday foot-care needs. They are not validated customer research or statements of suitability.",
  },
  fr: {
    announcement: "Livraison offerte et retours sous 30 jours sur toutes les commandes.",
    announcementLink: "Découvrir Albea Pulse",
    preview: "APERÇU DU CONCEPT",
    nav: ["albea™ Pulse", "La science", "Questions"],
    join: "Précommander",
    discover: "Découvrir Albea Pulse",
    how: "Explorer la science",
    eyebrow: "UNE NOUVELLE ATTENTION POUR VOS PIEDS.",
    title: "Vos pieds",
    title2: "vous portent.",
    accent: "N’attendez pas les douleurs pour en prendre soin.",
    intro:
      "Vos pieds méritent votre attention dès aujourd’hui. Quatre électrodes ciblées, un support simple et ouvert : albea Pulse explore l’activation musculaire pour une future routine de renforcement. Son effet sur la prévention de l’hallux valgus reste à établir.",
    launch: "En développement pour 2027 · France & États-Unis",
    concept: "Visuel de concept · Design susceptible d’évoluer",
    wornImageAlt: "Design Albea Pulse de référence : support ouvert à quatre modules ronds, porté sur un pied",
    imageAlt:
      "Support Albea Pulse ivoire ouvert à quatre électrodes, avec maintien du talon, cou-de-pied libre et ouverture pour le gros orteil",
    imageTitle: "Discret par nature.",
    imageSubtitle: "Attentionné par intention.",
    trust: [
      "Une approche musculaire",
      "4 électrodes ciblées",
      "Un design ouvert et léger",
      "Pensé pour la maison",
    ],
    audienceEyebrow: "DES VIES DIFFÉRENTES. UNE MÊME BASE.",
    audienceTitle: "À chacun",
    audienceAccent: "son mouvement.",
    audienceIntro: "Trouvez l’histoire qui vous ressemble.",
    explore: "Explorer votre parcours",
    scienceEyebrow: "L’IDÉE DERRIÈRE ALBEA",
    scienceTitle: "Un petit muscle.",
    scienceAccent: "Une grande attention.",
    scienceIntro:
      "L’abducteur de l’hallux relie le talon au gros orteil en longeant le bord interne du pied. Albea explore son activation grâce à quatre électrodes positionnées avec soin.",
    electrodes: [
      { title: "À l’arrière du muscle", description: "Une première électrode près du talon, à l’arrière de l’abducteur de l’hallux." },
      { title: "À l’avant du muscle", description: "Une deuxième électrode à l’avant du même muscle, en direction du gros orteil." },
      { title: "Au-dessus du gros orteil", description: "Une troisième électrode sur le dessus du gros orteil, près de sa base." },
      { title: "En dessous du gros orteil", description: "Une quatrième électrode sous le gros orteil, près de sa base." },
    ],
    anatomy: "Abducteur de l’hallux",
    diagramView: "VUE MÉDIALE · CONCEPT",
    diagramHeel: "TALON",
    diagramToe: "GROS ORTEIL",
    diagramMuscle: "Muscle ciblé",
    diagramElectrodes: "4 électrodes",
    schematic:
      "Vue médiale simplifiée · Positionnement conceptuel, pas un guide de pose",
    clickExplore: "Sélectionnez une électrode pour l’explorer",
    evidence:
      "Notre ambition : explorer une place dans la prise en charge de l’hallux valgus. La prévention, la correction et les bénéfices cliniques d’Albea ne sont pas établis.",
    evidenceLink: "Comprendre la recherche",
    routineEyebrow: "LE SOIN TROUVE SA PLACE",
    routineTitle: "Votre moment calme.",
    routineAccent: "Réinventé.",
    routineIntro:
      "Un design réfléchi pour une idée simple : accorder du temps à vos pieds, sans mettre votre vie entre parenthèses.",
    routineSteps: [
      {
        title: "Enfilez une petite attention.",
        body: "Un support ouvert qui laisse vos orteils et le dessus du pied libres.",
      },
      {
        title: "Retrouvez votre rituel.",
        body: "Quatre positions d’électrodes intégrées et un boîtier compact, pensés pour la simplicité.",
      },
      {
        title: "Asseyez-vous. Prenez un instant.",
        body: "Une routine au repos. Les réglages et la durée seront définis lors des essais.",
      },
    ],
    heroLifestyleAlt:
      "Femme lisant chez elle au soleil, portant les supports ouverts Albea",
    routineImage:
      "Homme lisant dans un fauteuil en lin, portant les supports ouverts Albea",
    coffeeImage:
      "Homme aux cheveux gris prenant un café chez lui, portant les supports ouverts Albea",
    reviewsEyebrow: "LES ROUTINES QUI NOUS INSPIRENT",
    reviewsTitle: "Une petite attention.",
    reviewsAccent: "De grandes raisons.",
    reviewsNote:
      "Témoignages illustratifs pour cette démonstration. Propos et portraits représentent des profils fictifs, pas des clients ni des résultats du produit.",
    sample: "TÉMOIGNAGE ILLUSTRATIF",
    storyEyebrow: "D’UNE QUESTION CLINIQUE AU SOIN QUOTIDIEN",
    storyTitle: "Les bonnes idées",
    storyAccent: "commencent par l’écoute.",
    storyBody:
      "Albea est né d’une question de chirurgien : l’activation ciblée d’un muscle discret du pied pourrait-elle s’intégrer à une routine plus simple ? Nous associons cette curiosité clinique à un design textile réfléchi pour explorer la réponse.",
    storyFoot:
      "Porté par un chirurgien. Guidé par la curiosité. Conçu avec soin.",
    faqEyebrow: "POUR Y VOIR PLUS CLAIR",
    faqTitle: "Vos questions.",
    faqAccent: "Nos réponses.",
    faqs: [
      {
        q: "Qu’est-ce qu’Albea, exactement ?",
        a: "Albea Pulse est un concept de support textile ouvert avec quatre positions d’électrodes : à l’arrière et à l’avant de l’abducteur de l’hallux, puis au-dessus et en dessous du gros orteil. Il explore l’activation électrique de l’abducteur de l’hallux. Le produit et ses instructions restent en développement.",
      },
      {
        q: "Albea peut-il prévenir ou corriger l’hallux valgus ?",
        a: "Il s’agit d’une ambition de recherche, pas d’un bénéfice démontré. Albea n’a pas démontré d’effet préventif, correctif ou thérapeutique sur l’hallux valgus. Un essai randomisé publié n’a pas montré de bénéfice additionnel de la stimulation neuromusculaire par rapport au traitement conservateur comparé. Des études spécifiques au produit restent nécessaires.",
      },
      {
        q: "Quand et où sera-t-il disponible ?",
        a: "L’équipe vise 2027 et étudie un lancement en France et aux États-Unis. Le calendrier dépend du développement, de la validation et des exigences applicables à chaque marché. Cette démonstration ne permet ni commande ni paiement.",
      },
      {
        q: "Combien de temps dure une séance ?",
        a: "L’expérience envisagée est une séance assise à la maison. La durée, l’intensité, la fréquence, les tailles et les consignes d’entretien seront établies lors des essais. Cet aperçu ne prescrit aucun protocole.",
      },
      {
        q: "Puis-je essayer le parcours d’achat ?",
        a: "Oui. Ouvrez la page produit, choisissez une taille de démonstration et ajoutez-la au panier. Le panier est interactif, mais aucune commande n’est passée, aucun paiement n’est prélevé et rien n’est envoyé à Shopify.",
      },
    ],
    joinEyebrow: "LE PROCHAIN CHAPITRE COMMENCE ICI",
    joinTitle: "L’avenir se dessine",
    joinAccent: "à vos pieds.",
    joinIntro:
      "Suivez l’idée qui prend forme. Une nouvelle attention pour vos pieds, imaginée pour 2027.",
    email: "Votre adresse e-mail",
    country: "Votre marché",
    consent: "Je souhaite suivre le développement et le lancement d’Albea.",
    submit: "Me tenir au courant",
    formNote:
      "Démonstration : vos coordonnées ne sont ni enregistrées ni envoyées.",
    successTitle: "Vous faites partie de l’idée.",
    successBody:
      "Voilà à quoi ressemblera l’inscription. Ceci est un aperçu : votre e-mail n’a été ni enregistré ni inscrit à une liste.",
    reset: "Essayer une autre adresse",
    footerTag: "Un peu de soin. Une vie en mouvement.",
    footerExplore: "Explorer",
    footerLearn: "Bon à savoir",
    faq: "Vos questions",
    research: "Recherche & transparence",
    demo: "À propos de cet aperçu",
    footerNote:
      "Albea est en développement. Les images présentent un concept. Les bénéfices cliniques et les autorisations de mise sur le marché ne sont pas établis. La disponibilité prévue en France et aux États-Unis reste soumise à validation.",
    rights: "© 2026 Albea. Un concept pour le mouvement.",
    privacy: "Confidentialité : aucune donnée de formulaire collectée.",
    back: "Tous les parcours",
    needsTitle: "Pensé pour",
    needsAccent: "votre quotidien.",
    nextJourney: "Une autre histoire à découvrir",
    productTitle: "Albea Pulse",
    productSub: "Un design ouvert. Une intention précise.",
    productLabel: "LE CONCEPT ALBEA · 2027",
    galleryNote:
      "Visuels de concept. Matières, ajustement et accessoires peuvent évoluer.",
    sizeGuide: "Guide des tailles",
    sizeNote:
      "Tailles européennes illustratives. L’ajustement définitif et les équivalences américaines seront validés avant le lancement.",
    productFaq: "Les détails, en toute clarté",
    researchTitle: "La curiosité, en toute clarté.",
    researchIntro:
      "La science nourrit la question. Elle ne valide pas encore le produit.",
    researchSections: [
      {
        title: "L’anatomie",
        body: "L’abducteur de l’hallux est un muscle intrinsèque qui longe le bord interne du pied, du talon vers le gros orteil. Il contribue au mouvement de celui-ci. Le schéma à quatre électrodes est un concept de produit, pas un protocole de placement cliniquement validé.",
      },
      {
        title: "Ce que dit la recherche publiée",
        body: "Un essai randomisé portant sur 28 femmes (48 pieds) a comparé orthèses et exercices au même accompagnement avec stimulation électrique neuromusculaire. Après un mois, l’ajout de stimulation n’a pas apporté de bénéfice additionnel sur les critères principaux. Cette étude ne portait pas sur Albea et ne démontre pas de prévention.",
      },
      {
        title: "Ce qu’il reste à établir",
        body: "Le support nécessite des essais spécifiques sur la sécurité, le placement des électrodes, l’ergonomie et l’efficacité. Aucun bénéfice sur la prévention, la correction de la déformation, le soulagement de la douleur ou la performance sportive n’est revendiqué dans cet aperçu.",
      },
    ],
    sourceLabel: "Lire la source",
    aboutTitle: "Un aperçu de la suite.",
    aboutBody:
      "Ce site présente la marque Albea et un parcours d’achat de démonstration pour un produit envisagé en 2027. Les photographies sont des visuels de concept générés par IA. Les témoignages sont fictifs et clairement identifiés. Le prix de 150 € et les tailles sont illustratifs. Aucune donnée personnelle n’est transmise par le formulaire, aucun paiement n’est possible et le site n’est pas connecté à Shopify.",
    aboutSecond:
      "Les cinq parcours sont des hypothèses de profils, inspirées d’informations publiées sur l’hallux valgus et les besoins quotidiens de soin des pieds. Ils ne constituent ni une étude de marché validée ni une confirmation de compatibilité individuelle.",
  },
} as const;
