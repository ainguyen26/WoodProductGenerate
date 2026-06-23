import type { OptionKey, OptionRow } from "../repositories/optionsRepository.js";
import { eeeeOptions } from "./eeeeOptions.js";

export const defaultOptions: Record<OptionKey, OptionRow[]> = {
  aa: [
    { code: "EV", name: "HM.PL.EV.SZ", description: null },
    { code: "HG", name: "HM.PL.HG.NZ", description: null },
    { code: "LU", name: "SL.PL.LU.NZ", description: null },
    { code: "MM", name: "SL.PL.MM.NZ", description: null },
    { code: "PL", name: "HM.PL.PL.SZ", description: null },
    { code: "RL", name: "SL.PL.RL.NZ", description: null },
    { code: "SH", name: "HM.PL.SH.NZ", description: null },
    { code: "TO", name: "HM.PL.T.NZ", description: null },
    { code: "WL", name: "SL.PL.WL.SZ", description: null },
    { code: "ZN", name: "SL.PL.ZN.SZ", description: null }
  ],
  bbb: [
    { code: "M01", name: "MF-MR12", description: null },
    { code: "M02", name: "MF-MR15", description: null },
    { code: "M03", name: "MF-MR17", description: null },
    { code: "M04", name: "MF-HR9-E1", description: null },
    { code: "M05", name: "MF-HR12-E1", description: null },
    { code: "M06", name: "MF-HR17-E1", description: null },
    { code: "H01", name: "HF-HR9-E1", description: null },
    { code: "H02", name: "HF-HR12-E1", description: null },
    { code: "H03", name: "HF-HR15-E1", description: null },
    { code: "H04", name: "HF-HR17-E1", description: null }
  ],
  cc: [
    { code: "E0", name: "E0", description: null },
    { code: "E1", name: "E1", description: null },
    { code: "E2", name: "E2", description: null }
  ],
  d: [
    { code: "M", name: "Melamine", description: null },
    { code: "L", name: "Laminate", description: null },
    { code: "A", name: "Acrylic", description: null }
  ],
  eeee: eeeeOptions,
  ff: [
    { code: "BB", name: "Backer den", description: null },
    { code: "BG", name: "Backer xam", description: null },
    { code: "BW", name: "Backer trang", description: null },
    { code: "00", name: "Van chi co 1 mat", description: null },
    { code: "DM", name: "Dong mau, 2 mat cung mau", description: null }
  ],
  gg: [
    { code: "01", name: "1220 x 2440 x 3", description: null },
    { code: "02", name: "1220 x 2440 x 6", description: null },
    { code: "03", name: "1220 x 2440 x 9", description: null },
    { code: "04", name: "1220 x 2440 x 12", description: null },
    { code: "05", name: "1220 x 2440 x 15", description: null },
    { code: "06", name: "1220 x 2440 x 17", description: null },
    { code: "07", name: "1220 x 2440 x 18", description: null },
    { code: "08", name: "1220 x 2440 x 21", description: null },
    { code: "09", name: "1220 x 2440 x 25", description: null },
    { code: "10", name: "1220 x 2440 x 32", description: null }
  ],
  hh: [
    { code: "01", name: "MF", description: null },
    { code: "02", name: "UF", description: null },
    { code: "03", name: "PUR", description: null }
  ]
};
