const sampleProducts = [
  // Conduit Products
  {
    id: "SR6CT",
    name: "Rigid Conduit",
    pageUrl: "/index.php/home/products/rigid-conduit/",
    category: "Conduit",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Conduit_v2-min.png",
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
    description:
      "Impact- and crush-resistant conduit providing maximum protection for conductors.",
  },

  // Conduit Bodies
  {
    id: "SR6LB",
    name: "LB Conduit Body",
    pageUrl: "/index.php/home/products/lb-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LB-Conduit-Body_v2-min.png",
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
    description:
      "LB conduit bodies allow for 90-degree bends while providing pull access for wire installation.",
  },
  {
    id: "SR6LL",
    name: "LL Conduit Body",
    pageUrl: "/index.php/home/products/ll-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LL-Conduit-Body_v2-min.png",
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
    description:
      "LL conduit bodies provide left-side 90-degree turns with pull access.",
  },
  {
    id: "SR6LR",
    name: "LR Conduit Body",
    pageUrl: "/index.php/home/products/lr-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/LR-Conduit-Body_v2-min.png",
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
    description:
      "LR conduit bodies provide right-side 90-degree turns with pull access.",
  },
  {
    id: "SR6C",
    name: "C Conduit Body",
    pageUrl: "/index.php/home/products/c-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/C-Conduit-Body_v2-min.png",
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
    description:
      "C conduit bodies provide straight-through wire access and pulling points.",
  },
  {
    id: "SR6T",
    name: "T Conduit Body",
    pageUrl: "/index.php/home/products/t-conduit-body//",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/T-Conduit-Body_v2-min.png",
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
    description:
      "T conduit bodies allow for three-way connections and wire access.",
  },
  {
    id: "SR6TB",
    name: "TB Conduit Body",
    pageUrl: "/index.php/home/products/tb-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/TB-Conduit-Body_v2-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "TB",
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
    description:
      "TB conduit bodies allow for three-way connections and wire access.",
  },
  {
    id: "SR6XB",
    name: "XB Conduit Body",
    pageUrl: "/index.php/home/products/xb-conduit-body/",
    category: "Conduit Bodies",
    image: "/wp-content/uploads/2024/12/XB-Conduit-Body_v2-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Body Style": "XB",
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
    description:
      "XB conduit bodies allow for four-way connections with inspection access.",
  },

  // Device Box
  {
    id: "SR6FD",
    name: "Device Box",
    pageUrl: "/index.php/home/products/device-box/",
    category: "Device Box",
    image: "/wp-content/uploads/2024/12/SS-Device-Box_v2-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"'],
      "Material Grade": "316",
      "Box Style": "Single Gang",
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
    description: "Standard device box for single gang applications.",
  },

  // Hubs
  {
    id: "SSTH",
    name: "Terminator Hub",
    pageUrl: "/index.php/home/products/terminator-hub/",
    category: "Conduit Hubs", // Changed from "Conduit Boxes" to "Hubs"
    image: "/wp-content/uploads/2024/12/SS-Terminator-Hub-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Hub Style": "Line Terminating", // Added Hub Style specification
      Environment: [
        "Indoor",
        "Outdoor",
        "Corrosive",
        "Marine",
        "Chemical",
        "Food Processing",
        "Wet Location",
      ],
      Certification: ["UL 514B", "CSA C22.1:21"], // Updated certifications from spec sheet
    },
    description:
      "These hubs provide liquid-tight connections between conduit and enclosures.",
  },

  // Liquid Tight
  {
    id: "LT-STR",
    name: "Liquid Tight Straight Connector",
    pageUrl: "/index.php/home/products/liquid-tight-straight-connector/",
    category: "Liquid Tight Connectors",
    image: "/wp-content/uploads/2024/12/SS-LT-Straight-Connector-min.png",
    specifications: {
      "Material Grade": "316",
      "Connection Type": "Straight",
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
    description: "Direct connection for flexible conduit applications.",
  },

  {
    id: "LT-90",
    name: "Liquid Tight 90° Connector",
    pageUrl: "/index.php/home/products/liquid-tight-90-connector/",
    category: "Liquid Tight Connectors",
    image: "/wp-content/uploads/2024/12/SS-LT-90-Connector-min.png",
    specifications: {
      "Material Grade": "316",
      "Connection Type": "90°",
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
    description: "90-degree angled connection for right-angle turns.",
  },

  {
    id: "LT-45",
    name: "Liquid Tight 45° Connector",
    pageUrl: "/index.php/home/products/liquid-tight-45-connector/",
    category: "Liquid Tight Connectors",
    image: "/wp-content/uploads/2024/12/SS-LT-45-Connector-min.png",
    specifications: {
      "Material Grade": "316",
      "Connection Type": "45°",
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
    description: "45-degree angled connection for gradual direction changes.",
  },

  // Elbows
  {
    id: "SR6EL45",
    name: "45° Elbow",
    pageUrl: "/index.php/home/products/45-elbow/",
    category: "Conduit Fittings",
    image: "/wp-content/uploads/2024/12/SS-45°-Elbow-min.png",
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
    description: "Provides gradual directional changes in conduit runs.",
  },
  {
    id: "SR6EL90",
    name: "90° Elbow",
    pageUrl: "/index.php/home/products/90-elbow/",
    category: "Conduit Fittings",
    image: "/wp-content/uploads/2024/12/SS-90°-Elbow-min.png",
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
    description:
      "Enables right-angle turns while maintaining proper bend radius.",
  },

  // Couplings
  {
    id: "SR6CPL",
    name: "Rigid Coupling",
    pageUrl: "/index.php/home/products/rigid-coupling/",
    category: "Conduit Fittings",
    image: "/wp-content/uploads/2024/12/SS-Rigid-Coupling_v2-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "316",
      "Coupling Style": "Rigid",
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
    description: "Basic connection between conduit sections.",
  },
  {
    id: "SR6CPL3P",
    name: "3-Piece Coupling",
    pageUrl: "/index.php/home/products/3-piece-coupling/",
    category: "Conduit Fittings",
    image: "/wp-content/uploads/2024/12/3-Piece-Coupling-min.png",
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
    description:
      "Allows for easier installation and removal in tight spaces and retrofit applications.",
  },
  // Nipples
  {
    id: "SSN",
    name: "Standard Nipple",
    pageUrl: "/index.php/home/products/nipples/",
    category: "Conduit Fittings",
    image: "/wp-content/uploads/2024/12/SS-Nipple-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "304",
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
    description: "Pre-cut threaded conduit section for connections.",
  },

  // Plugs & Bushings
  {
    id: "SSRP",
    name: "Recessed Plug",
    pageUrl: "/index.php/home/products/recessed-plug/",
    category: "Plugs & Bushings",
    image: "/wp-content/uploads/2024/12/SS-Recessed-Plug_v2-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "304",
      "Plug Type": "Recessed Plug",
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
    description: "Sealing plug for unused openings.",
  },

  {
    id: "SSFB",
    name: "Face Bushing",
    pageUrl: "/index.php/home/products/face-bushing/",
    category: "Plugs & Bushings",
    image: "/wp-content/uploads/2024/12/SS_Face-Bushing-min.png",
    specifications: {
      "Trade Size": ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      "Material Grade": "304",
      "Bushing Type": "Face Bushing",
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
    description: "Protection for wire entry points.",
  },

  // Strut
  {
    id: "STR-DEEP",
    name: "Deep Channel Slotted Strut",
    pageUrl: "/index.php/home/products/deep-strut-elongated-holes/",
    category: "Strut",
    image: "/wp-content/uploads/2024/12/SS-Deep-Strut-Slotted-min.png",
    specifications: {
      "Strut Properties": "Deep Profile",
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
    description:
      "Mounting support for electrical equipment and conduit systems.",
  },
  {
    id: "STR-SHALLOW",
    name: "Shallow Channel Slotted Strut",
    pageUrl: "/index.php/home/products/shallow-strut-elongated-holes/",
    category: "Strut",
    image: "/wp-content/uploads/2024/12/SS-Shallow-Strut-Slotted-min.png",
    specifications: {
      "Strut Properties": "Shallow Profile",
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
    description:
      "Mounting support for electrical equipment and conduit systems.",
  },
];

export default sampleProducts;
