import { Polsek } from "@/types";

export const dumaiPolsek: Polsek[] = [
  {
    id: 1,
    name: "Polsek Bukit Kapur",
    polres: "",
    villages: [
      {
        id: 1,
        name: "Bagan Besar",
        waktuTanam: "MEI 2025",
        achievement: 10,
        target: 2,
      },
      {
        id: 2,
        name: "Bagan Besar Timur",
        waktuTanam: "",
        achievement: 0,
        target: 2,
      },
      {
        id: 3,
        name: "Bukit Nenas",
        waktuTanam: "",
        achievement: 0,
        target: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Polsek Dumai Barat",
    polres: "",
    villages: [
      {
        id: 1,
        name: "Pangkalan Sesai",
        waktuTanam: "",
        achievement: 0,
        target: 2,
      },
      {
        id: 2,
        name: "Bukit Datuk",
        waktuTanam: "",
        achievement: 0,
        target: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Polsek Dumai Kota",
    polres: "",
    villages: [
      {
        id: 1,
        name: "Kel. Bintan",
        waktuTanam: "",
        achievement: 2,
        target: 2,
      },
      {
        id: 2,
        name: "Kel. Laksamana",
        waktuTanam: "",
        achievement: 1.3,
        target: 2,
      },
    ],
  },
];