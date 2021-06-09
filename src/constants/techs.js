import Tech30 from "../assets/3-0.png";
import Tech31 from "../assets/3-1.png";
import Tech32 from "../assets/3-2.png";
import Tech33 from "../assets/3-3.png";
import Tech34 from "../assets/3-4.png";
import Tech35 from "../assets/3-5.png";
import Tech36 from "../assets/3-6.png";
import Tech37 from "../assets/3-7.png";
import Tech38 from "../assets/3-8.png";
import Tech39 from "../assets/3-9.png";
import Tech310 from "../assets/3-10.png";
import Tech311 from "../assets/3-11.png";
import Tech312 from "../assets/3-12.png";
import Tech313 from "../assets/3-13.png";
import Tech314 from "../assets/3-14.png";
import Tech315 from "../assets/3-15.png";

export const TECH_COLOURS = ['B', 'R', 'G', 'Y'];

export const TECHS = {
    TIER3: [
        {image: Tech30, name: 'Transdimensional AI', colours: ['B']},
        {image: Tech31, name: 'Planetary-Scale Research', colours: ['B', 'R']},
        {image: Tech32, name: 'Metahuman Chambers', colours: ['B', 'G']},
        {image: Tech33, name: 'Hivemind Computing', colours: ['B', 'Y']},
        {image: Tech34, name: 'Deep Space Megastructures', colours: ['R', 'B']},
        {image: Tech35, name: 'Capital Ship', colours: ['R']},
        {image: Tech36, name: 'Android Armada', colours: ['R', 'G']},
        {image: Tech37, name: 'Mercenary Fleet', colours: ['R', 'Y']},
        {image: Tech38, name: 'Cerebral Implants', colours: ['G', 'B']},
        {image: Tech39, name: 'Manufacturing Orbitals', colours: ['G', 'R']},
        {image: Tech310, name: 'Android Rights Movement', colours: ['G']},
        {image: Tech311, name: 'Subatomic Fabrication', colours: ['G', 'Y']},
        {image: Tech312, name: 'Quantum Data Exchange', colours: ['Y', 'B']},
        {image: Tech313, name: 'Hyperdrive Boosters', colours: ['Y', 'R']},
        {image: Tech314, name: 'Wormhole Technology', colours: ['Y', 'G']},
        {image: Tech315, name: 'Stealth Terraformers', colours: ['Y']}
    ]
};

export const createTechDefaults = (tier = 3) => {
    return {
        a: [],
        b: [],
        c: [],
        d: [],
        unsorted: Array.from(TECHS["TIER" + tier].keys()),
        unavailable: []
    };
};
