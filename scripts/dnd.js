Hooks.on("init", () => {
  if (game.system.id === "dnd5e") {
    console.log("LMJE | Initializing enrichers for dnd5e");

    CONFIG.TextEditor.enrichers.push({
      pattern: /@Character\[([a-zA-Z0-9]+)\](\{(((attr|bio)\s?)+)\})?/g,
      enricher: async (match, options) => {
        var char = game.characters.get(match[1])
        var charOptions = match[3].split(/\s/g)

        var html = "<p>testing</p>";
        return $(html)[0];
      },
    });
  }
});
/*
game.characters.get(id)
/* JSON 
dndCharacter = {
  name: "New Actor",
  type: "character",
  _id: "gKH34kbx0TvVQtQf",
  img: "icons/svg/mystery-man.svg",
  system: {
    abilities: {
      str: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
      dex: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
      con: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
      int: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
      wis: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
      cha: {
        value: 10,
        proficient: 0,
        bonuses: {
          check: "",
          save: "",
        },
      },
    },
    attributes: {
      ac: {
        flat: null,
        calc: "default",
        formula: "",
      },
      hp: {
        value: 20,
        max: 20,
        temp: null,
        tempmax: null,
        bonuses: {
          level: "",
          overall: "",
        },
      },
      init: {
        ability: "dex",
        bonus: "",
      },
      movement: {
        burrow: 0,
        climb: 0,
        fly: 0,
        swim: 0,
        walk: 30,
        units: "ft",
        hover: false,
      },
      attunement: {
        max: 3,
      },
      senses: {
        darkvision: 0,
        blindsight: 0,
        tremorsense: 0,
        truesight: 0,
        units: "ft",
        special: "",
      },
      spellcasting: "int",
      death: {
        success: 0,
        failure: 0,
      },
      exhaustion: 0,
      inspiration: false,
    },
    details: {
      biography: {
        value: "",
        public: "",
      },
      alignment: "",
      race: "",
      background: "",
      originalClass: "",
      xp: {
        value: 0,
      },
      appearance: "",
      trait: "",
      ideal: "",
      bond: "",
      flaw: "",
    },
    traits: {
      size: "med",
      di: {
        value: ["psychic"],
        bypasses: ["mgc"],
        custom: "",
      },
      dr: {
        value: [],
        bypasses: [],
        custom: "",
      },
      dv: {
        value: [],
        bypasses: [],
        custom: "",
      },
      ci: {
        value: [],
        custom: "",
      },
      languages: {
        value: ["common"],
        custom: "",
      },
      weaponProf: {
        value: [],
        custom: "",
      },
      armorProf: {
        value: [],
        custom: "",
      },
    },
    currency: {
      pp: 0,
      gp: 0,
      ep: 0,
      sp: 0,
      cp: 0,
    },
    skills: {
      acr: {
        value: 0,
        ability: "dex",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      ani: {
        value: 0,
        ability: "wis",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      arc: {
        value: 0,
        ability: "int",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      ath: {
        value: 0,
        ability: "str",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      dec: {
        value: 0,
        ability: "cha",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      his: {
        value: 0,
        ability: "int",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      ins: {
        value: 0,
        ability: "wis",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      itm: {
        value: 0,
        ability: "cha",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      inv: {
        value: 0,
        ability: "int",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      med: {
        value: 0,
        ability: "wis",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      nat: {
        value: 0,
        ability: "int",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      prc: {
        value: 0,
        ability: "wis",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      prf: {
        value: 0,
        ability: "cha",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      per: {
        value: 0,
        ability: "cha",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      rel: {
        value: 0,
        ability: "int",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      slt: {
        value: 0,
        ability: "dex",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      ste: {
        value: 0,
        ability: "dex",
        bonuses: {
          check: "",
          passive: "",
        },
      },
      sur: {
        value: 0,
        ability: "wis",
        bonuses: {
          check: "",
          passive: "",
        },
      },
    },
    tools: {},
    spells: {
      spell1: {
        value: 0,
        override: null,
      },
      spell2: {
        value: 0,
        override: null,
      },
      spell3: {
        value: 0,
        override: null,
      },
      spell4: {
        value: 0,
        override: null,
      },
      spell5: {
        value: 0,
        override: null,
      },
      spell6: {
        value: 0,
        override: null,
      },
      spell7: {
        value: 0,
        override: null,
      },
      spell8: {
        value: 0,
        override: null,
      },
      spell9: {
        value: 0,
        override: null,
      },
      pact: {
        value: 0,
        override: null,
      },
    },
    bonuses: {
      mwak: {
        attack: "",
        damage: "",
      },
      rwak: {
        attack: "",
        damage: "",
      },
      msak: {
        attack: "",
        damage: "",
      },
      rsak: {
        attack: "",
        damage: "",
      },
      abilities: {
        check: "",
        save: "",
        skill: "",
      },
      spell: {
        dc: "",
      },
    },
    resources: {
      primary: {
        value: null,
        max: null,
        sr: false,
        lr: false,
        label: "",
      },
      secondary: {
        value: null,
        max: null,
        sr: false,
        lr: false,
        label: "",
      },
      tertiary: {
        value: null,
        max: null,
        sr: false,
        lr: false,
        label: "",
      },
    },
  },
  prototypeToken: {
    name: "New Actor",
    displayName: 0,
    actorLink: true,
    appendNumber: false,
    prependAdjective: false,
    texture: {
      src: "icons/svg/mystery-man.svg",
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
    },
    width: 1,
    height: 1,
    lockRotation: false,
    rotation: 0,
    alpha: 1,
    disposition: 1,
    displayBars: 0,
    bar1: {
      attribute: "attributes.hp",
    },
    bar2: {
      attribute: null,
    },
    light: {
      alpha: 0.5,
      angle: 360,
      bright: 0,
      coloration: 1,
      dim: 0,
      attenuation: 0.5,
      luminosity: 0.5,
      saturation: 0,
      contrast: 0,
      shadows: 0,
      animation: {
        type: null,
        speed: 5,
        intensity: 5,
        reverse: false,
      },
      darkness: {
        min: 0,
        max: 1,
      },
    },
    sight: {
      enabled: true,
      range: 0,
      angle: 360,
      visionMode: "basic",
      attenuation: 0.1,
      brightness: 0,
      saturation: 0,
      contrast: 0,
    },
    detectionModes: [],
    flags: {},
    randomImg: false,
  },
  items: [],
  effects: [],
  folder: null,
  sort: 0,
  ownership: {
    default: 0,
    vHns02qqy1nzi1Gg: 3,
  },
  flags: {
    dnd5e: {},
  },
  _stats: {
    systemId: "dnd5e",
    systemVersion: "2.2.1",
    coreVersion: "11.302",
    createdTime: 1687657183315,
    modifiedTime: 1687657433774,
    lastModifiedBy: "vHns02qqy1nzi1Gg",
  },
};
*/
