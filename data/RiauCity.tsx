import { City } from "../types";
import { bengkalisCompanies } from "./company/Bengkalis";
import { inhilCompanies } from "./company/Inhil";
import { inhuCompanies } from "./company/Inhu";
import { kamparCompanies } from "./company/Kampar";
import { kuansingCompanies } from "./company/Kuansing";
import { pekanbaruCompanies } from "./company/Pekanbaru";
import { pelalawanCompanies } from "./company/Pelalawan";
import { rohilCompanies } from "./company/Rohil";
import { rohulCompanies } from "./company/Rohul";
import { siakCompanies } from "./company/Siak";
import { bengkalisOtherCompanies } from "./other-company/Bengkalis";
import { dumaiOtherCompanies } from "./other-company/Dumai";
import { inhilOtherCompanies } from "./other-company/Inhil";
import { inhuOtherCompanies } from "./other-company/Inhu";
import { kamparOtherCompanies } from "./other-company/Kampar";
import { kuansingOtherCompanies } from "./other-company/Kuansing";
import { merantiOtherCompanies } from "./other-company/Meranti";
import { pekanbaruOtherCompanies } from "./other-company/Pekanbaru";
import { pelalawanOtherCompanies } from "./other-company/Pelalawan";
import { rohilOtherCompanies } from "./other-company/Rohil";
import { rohulOtherCompanies } from "./other-company/Rohul";
import { siakOtherCompanies } from "./other-company/Siak";
import { dumaiPolsek } from "./polsek/dumai-polsek";

export const riauCity: City[] = [
  {
    id: 1,
    nama: "INDRAGIRI HULU",
    coordinates: [-0.5062587626567405, 102.22070185428481],
    totalArea: 156157.69,
    otherTotalArea: 4142.06,
    monokulturTarget: 3123.15,
    tumpangSariTarget: 10931.04,
    totalTarget: 14054.19,
    companies: inhuCompanies,
    otherCompanies: inhuOtherCompanies,
    policestations: [],
  },
  {
    id: 2,
    nama: "KAMPAR",
    coordinates: [0.4068, 101.2181],
    totalArea: 142487.29,
    otherTotalArea: 13573.34,
    monokulturTarget: 2849.75,
    tumpangSariTarget: 9974.11,
    totalTarget: 12823.86,
    companies: kamparCompanies,
    otherCompanies: kamparOtherCompanies,
    policestations: [],
  },
  {
    id: 3,
    nama: "INDRAGIRI HILIR",
    coordinates: [-0.3432, 103.0304],
    totalArea: 360823.78,
    otherTotalArea: 81.7,
    monokulturTarget: 7216.48,
    tumpangSariTarget: 25257.66,
    totalTarget: 32474.14,
    companies: inhilCompanies,
    otherCompanies: inhilOtherCompanies,
    policestations: [],
  },
  {
    id: 4,
    nama: "PEKANBARU",
    coordinates: [0.5333, 101.45],
    totalArea: 132368.11,
    otherTotalArea: 4.07,
    monokulturTarget: 2647.36,
    tumpangSariTarget: 9265.77,
    totalTarget: 11913.13,
    companies: pekanbaruCompanies,
    otherCompanies: pekanbaruOtherCompanies,
    policestations: [],
  },
  {
    id: 5,
    nama: "BENGKALIS",
    coordinates: [1.4804, 102.1335],
    totalArea: 74903.62,
    otherTotalArea: 15.99,
    monokulturTarget: 1498.07,
    tumpangSariTarget: 5243.25,
    totalTarget: 6741.32,
    companies: bengkalisCompanies,
    otherCompanies: bengkalisOtherCompanies,
    policestations: [],
  },
  {
    id: 6,
    nama: "PELALAWAN",
    coordinates: [0.1952, 102.1654],
    totalArea: 173114.47,
    otherTotalArea: 37837.79,
    monokulturTarget: 3462.29,
    tumpangSariTarget: 12118.01,
    totalTarget: 15580.3,
    companies: pelalawanCompanies,
    otherCompanies: pelalawanOtherCompanies,
    policestations: [],
  },
  {
    id: 7,
    nama: "ROKAN HILIR",
    coordinates: [1.8648793362231944, 100.69519367611285],
    totalArea: 83209.98,
    otherTotalArea: 39958,
    monokulturTarget: 1664.2,
    tumpangSariTarget: 5824.7,
    totalTarget: 7488.9,
    companies: rohilCompanies,
    otherCompanies: rohilOtherCompanies,
    policestations: [],
  },
  {
    id: 8,
    nama: "SIAK",
    coordinates: [0.8691723690456171, 101.81940175928257],
    totalArea: 102105.66,
    otherTotalArea: 11322,
    monokulturTarget: 2042.11,
    tumpangSariTarget: 7147.4,
    totalTarget: 9189.51,
    companies: siakCompanies,
    otherCompanies: siakOtherCompanies,
    policestations: [],
  },
  {
    id: 9,
    nama: "KUANTAN SINGINGI",
    coordinates: [-0.524020536122323, 101.50946758486292],
    totalArea: 74304.86,
    otherTotalArea: 8368.17,
    monokulturTarget: 1486.1,
    tumpangSariTarget: 5201.34,
    totalTarget: 6687.44,
    companies: kuansingCompanies,
    otherCompanies: kuansingOtherCompanies,
    policestations: [],
  },
  {
    id: 10,
    nama: "ROKAN HULU",
    coordinates: [1.0717023015292773, 100.49848745055259],
    totalArea: 166485.98,
    otherTotalArea: 42.58,
    monokulturTarget: 3329.72,
    tumpangSariTarget: 11654.02,
    totalTarget: 14983.74,
    companies: rohulCompanies,
    otherCompanies: rohulOtherCompanies,
    policestations: [],
  },
  {
    id: 11,
    nama: "KEPULAUAN MERANTI",
    coordinates: [0.885, 102.65],
    totalArea: 0,
    otherTotalArea: 655.25,
    monokulturTarget: 721.11,
    tumpangSariTarget: 2523.89,
    totalTarget: 3245,
    companies: [],
    otherCompanies: merantiOtherCompanies,
    policestations: [],
  },
  {
    id: 12,
    nama: "DUMAI",
    coordinates: [1.6627197743147384, 101.39805017115371],
    totalArea: 0,
    otherTotalArea: 169.37,
    monokulturTarget: 63.89,
    tumpangSariTarget: 223.61,
    totalTarget: 287.5,
    companies: [],
    otherCompanies: dumaiOtherCompanies,
    policestations: dumaiPolsek,
  },
];
