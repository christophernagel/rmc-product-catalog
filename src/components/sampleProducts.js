const sampleProducts = [
  // Conduit Products
  {
    id: "SR6CT",
    name: "SS316 Rigid Conduit",
    pageUrl: "/index.php/home/products/rigid-conduit/",
    category: "Conduit",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Conduit_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Conduit Type": "Rigid",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 6A", "CSA C22.1:21"],
    },
  },
  {
    id: "SR4CT",
    name: "SS304 Rigid Conduit",
    pageUrl: "/index.php/home/products/rigid-conduit/",
    category: "Conduit",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Conduit_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "304",
      "Conduit Type": "Rigid",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 6A", "CSA C22.1:21"],
    },
  },

  // Conduit Bodies
  {
    id: "SR6LB",
    name: "LB Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LB-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "LB",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6LL",
    name: "LL Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LL-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "LL",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6LR",
    name: "LR Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LR-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "LR",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6C",
    name: "C Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/C-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "C",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6T",
    name: "T Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/T-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "T",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6XB",
    name: "XB Conduit Body",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/XB-Conduit-Body_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "X",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },

  // Conduit Boxes
  {
    id: "SR6FD",
    name: "FD Device Box",
    category: "Conduit Boxes",
    image: "/wp-content/uploads/2024/12/SS-Device-Box_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"'],
      "Material Grade": "316",
      "Box Style": "FDC",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },
  {
    id: "SR6FDT",
    name: "FD Device Box with Threaded Hubs",
    category: "Conduit Boxes",
    image: "/wp-content/uploads/2024/12/SS-Device-Box_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"'],
      "Material Grade": "316",
      "Box Style": "FDCT",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514A", "CSA C22.2 NO 18.1"],
    },
  },

  // Hubs
  {
    id: "SR6HUB",
    name: "Line Terminating Hub",
    category: "Hubs",
    image: "/wp-content/uploads/2024/12/Grounding-Locknut-Hub.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Hub Configuration": "Line Terminating",
      "Hub Style": "Standard",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },
  {
    id: "SR6GHB",
    name: "Grounding Hub",
    category: "Hubs",
    image: "/wp-content/uploads/2024/12/Grounding-Hub.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Hub Configuration": "Grounding",
      "Hub Style": "Standard",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },
  {
    id: "SR6ORH",
    name: "O-Ring/Locknut Hub",
    category: "Hubs",
    image: "/wp-content/uploads/2024/12/Grounding-Locknut-Hub.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Hub Configuration": "Line Terminating",
      "Hub Style": "O-Ring/Locknut",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },

  // Strut
  {
    id: "STR-12G-158-158-EHO",
    name: "Strut Channel with Elongated Holes",
    category: "Strut",
    image: "/wp-content/uploads/2024/12/shallow-strut.png",
    specifications: {
      "Strut Properties": ["12 Gauge", '1⅝" x 1⅝"'],
      "Strut Pattern": "Elongated Holes",
      "Material Grade": "316",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
    },
  },
  {
    id: "STR-14G-1316-158-SLD",
    name: "Strut Channel Solid",
    category: "Strut",
    image: "/wp-content/uploads/2024/12/shallow-strut.png",
    specifications: {
      "Strut Properties": ["14 Gauge", '13/16" x 1⅝"'],
      "Strut Pattern": "Solid",
      "Material Grade": "316",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
    },
  },
  {
    id: "STR-12G-158-158-EHO-BB",
    name: "Deep Strut Channel with Elongated Holes",
    category: "Strut",
    image: "/wp-content/uploads/2024/12/deep-strut.png",
    specifications: {
      "Strut Properties": ["12 Gauge", '1⅝" x 1⅝"'],
      "Strut Pattern": "Elongated Holes",
      "Material Grade": "316",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
    },
  },

  // Couplings
  {
    id: "SR6CPL",
    name: "Standard Coupling",
    category: "Couplings",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Coupling_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Coupling Style": "Standard",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },
  {
    id: "SR6CPL3P",
    name: "3-Piece Coupling",
    category: "Couplings",
    image: "/wp-content/uploads/2024/12/3pc-Couplings.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Coupling Style": "3-Piece",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },

  // Elbows
  {
    id: "SR6EL45",
    name: "45° Elbow",
    category: "Elbows",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Conduit_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Elbow Angle": "45°",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },
  {
    id: "SR6EL90",
    name: "90° Elbow",
    category: "Elbows",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Conduit_v1-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Elbow Angle": "90°",
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B"],
    },
  },
];

export default sampleProducts;
