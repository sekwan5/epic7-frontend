import { IOption, ISelectedOption } from ".";

export type OptionType =
  | "atk"
  | "atkPercentage"
  | "hp"
  | "hpPercentage"
  | "def"
  | "defPercentage"
  | "spd"
  | "chd"
  | "chc"
  | "eff"
  | "efr";

type MainOptionValues = {
  weapon: Pick<Record<OptionType, string>, "atk">;
  helm: Pick<Record<OptionType, string>, "hp">;
  armor: Pick<Record<OptionType, string>, "def">;
  neck: Pick<
    Record<OptionType, string>,
    | "atkPercentage"
    | "defPercentage"
    | "hpPercentage"
    | "chc"
    | "chd"
    | "atk"
    | "def"
    | "hp"
  >;
  ring: Pick<
    Record<OptionType, string>,
    | "atkPercentage"
    | "defPercentage"
    | "hpPercentage"
    | "eff"
    | "efr"
    | "atk"
    | "def"
    | "hp"
  >;
  boot: Pick<
    Record<OptionType, string>,
    | "atkPercentage"
    | "defPercentage"
    | "hpPercentage"
    | "spd"
    | "atk"
    | "def"
    | "hp"
  >;
};

// 옵션 라벨
export const optionLabels: Record<OptionType, string> = {
  atk: "공격력",
  atkPercentage: "공격력%",
  hp: "생명력",
  hpPercentage: "생명력%",
  def: "방어력",
  defPercentage: "방어력%",
  spd: "속도",
  chd: "치명피해",
  chc: "치명확률",
  eff: "효과적중",
  efr: "효과저항",
};
// 주 옵션의 고정 수치
const mainOptionValues: MainOptionValues = {
  weapon: { atk: "100" },
  helm: { hp: "540" },
  armor: { def: "60" },
  neck: {
    atk: "100",
    atkPercentage: "12%",
    def: "60",
    defPercentage: "12%",
    hp: "540",
    hpPercentage: "12%",
    chc: "11%",
    chd: "13%",
  },
  ring: {
    atkPercentage: "12%",
    defPercentage: "12%",
    hpPercentage: "12%",
    eff: "12%",
    efr: "12%",
    atk: "100",
    def: "60",
    hp: "540",
  },
  boot: {
    atkPercentage: "12%",
    defPercentage: "12%",
    hpPercentage: "12%",
    spd: "8",
    atk: "100",
    def: "60",
    hp: "540",
  },
};

// 무기의 부 옵션 등장 확률
const weaponSubOptionProbabilities: Record<OptionType, number> = {
  atk: 0,
  atkPercentage: 12.5,
  hp: 12.5,
  hpPercentage: 12.5,
  def: 0,
  defPercentage: 0,
  spd: 12.5,
  chc: 12.5,
  chd: 12.5,
  eff: 12.5,
  efr: 12.5,
};
// 투구의 부 옵션 등장 확률
const helmSubOptionProbabilities: Record<OptionType, number> = {
  atk: 12.5,
  atkPercentage: 12.5,
  hp: 0,
  hpPercentage: 12.5,
  def: 12.5,
  defPercentage: 12.5,
  spd: 12.5,
  chc: 0,
  chd: 12.5,
  eff: 12.5,
  efr: 12.5,
};

// 갑옷의 부 옵션 등장 확률
const armorSubOptionProbabilities: Record<OptionType, number> = {
  atk: 0,
  atkPercentage: 0,
  hp: 12.5,
  hpPercentage: 12.5,
  def: 0,
  defPercentage: 12.5,
  spd: 12.5,
  chc: 0,
  chd: 12.5,
  eff: 12.5,
  efr: 12.5,
};

// 목걸이의 주 능력치 등장 확률
const neckMainOptionProbabilities: Record<OptionType, number> = {
  atkPercentage: 12.5,
  defPercentage: 12.5,
  hpPercentage: 12.5,
  chc: 12.5,
  chd: 12.5,
  eff: 0,
  efr: 0,
  atk: 12.5,
  hp: 12.5,
  def: 12.5,
  spd: 0,
};

// 목걸이의 부 능력치 등장 확률
const neckSubOptionProbabilities: Record<OptionType, number> = {
  atk: 9.09,
  atkPercentage: 9.09,
  def: 9.09,
  defPercentage: 9.09,
  hp: 9.09,
  hpPercentage: 9.09,
  spd: 9.09,
  chc: 9.09,
  chd: 9.09,
  eff: 9.09,
  efr: 9.09,
};
// 반지의 주 능력치 등장 확률
const ringMainOptionProbabilities: Record<OptionType, number> = {
  atkPercentage: 12.5,
  defPercentage: 12.5,
  hpPercentage: 12.5,
  chc: 0,
  chd: 0,
  eff: 12.5,
  efr: 12.5,
  atk: 12.5,
  hp: 12.5,
  def: 12.5,
  spd: 0,
};

// 반지의 부 능력치 등장 확률
const ringSubOptionProbabilities: Record<OptionType, number> = {
  atk: 9.09,
  atkPercentage: 9.09,
  def: 9.09,
  defPercentage: 9.09,
  hp: 9.09,
  hpPercentage: 9.09,
  spd: 9.09,
  chc: 9.09,
  chd: 9.09,
  eff: 9.09,
  efr: 9.09,
};

// 신발의 주 능력치 등장 확률
const bootMainOptionProbabilities: Record<OptionType, number> = {
  atkPercentage: 14.28,
  defPercentage: 14.28,
  hpPercentage: 14.28,
  chc: 0,
  chd: 0,
  eff: 0,
  efr: 0,
  atk: 14.28,
  hp: 14.28,
  def: 14.28,
  spd: 14.28,
};

// 신발의 부 능력치 등장 확률
const bootSubOptionProbabilities: Record<OptionType, number> = {
  atk: 9.09,
  atkPercentage: 9.09,
  def: 9.09,
  defPercentage: 9.09,
  hp: 9.09,
  hpPercentage: 9.09,
  spd: 9.09,
  chc: 9.09,
  chd: 9.09,
  eff: 9.09,
  efr: 9.09,
};

// 랜덤 부 옵션 생성 함수 (무기용)
const generateRandomWeaponSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(weaponSubOptionProbabilities).filter(
    (key) =>
      !usedOptions.includes(key as OptionType) &&
      weaponSubOptionProbabilities[key as OptionType] > 0,
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + weaponSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += weaponSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key,
        label: optionLabels[key],
        value: generateRandomValue(key),
      };
    }
  }

  throw new Error("옵션 생성 실패");
};

// 랜덤 부 옵션 생성 함수 (투구용)
const generateRandomHelmSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(helmSubOptionProbabilities).filter(
    (key) =>
      !usedOptions.includes(key as OptionType) &&
      helmSubOptionProbabilities[key as OptionType] > 0,
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + helmSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += helmSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key,
        label: optionLabels[key],
        value: generateRandomValue(key),
      };
    }
  }

  throw new Error("옵션 생성 실패");
};

// 랜덤 부 옵션 생성 함수 (갑옷용)
const generateRandomArmorSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(armorSubOptionProbabilities).filter(
    (key) =>
      !usedOptions.includes(key as OptionType) &&
      armorSubOptionProbabilities[key as OptionType] > 0,
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + armorSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += armorSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key,
        label: optionLabels[key],
        value: generateRandomValue(key),
      };
    }
  }

  throw new Error("옵션 생성 실패");
};

// 랜덤 부 능력치 생성 함수 (목걸이용)
const generateRandomneckSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(neckSubOptionProbabilities).filter(
    (key) => !usedOptions.includes(key as OptionType),
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + neckSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += neckSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: generateRandomValue(key as OptionType),
      };
    }
  }

  throw new Error("부 능력치 생성 실패");
};

// 랜덤 부 능력치 생성 함수 (반지용)
const generateRandomringSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(ringSubOptionProbabilities).filter(
    (key) => !usedOptions.includes(key as OptionType),
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + ringSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += ringSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: generateRandomValue(key as OptionType),
      };
    }
  }

  throw new Error("부 능력치 생성 실패");
};

// 랜덤 부 능력치 생성 함수 (신발용)
const generateRandomBootSubOption = (usedOptions: OptionType[]): IOption => {
  const availableOptions = Object.keys(bootSubOptionProbabilities).filter(
    (key) => !usedOptions.includes(key as OptionType),
  ) as OptionType[];

  const totalProbability = availableOptions.reduce(
    (sum, key) => sum + bootSubOptionProbabilities[key],
    0,
  );
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const key of availableOptions) {
    cumulativeProbability += bootSubOptionProbabilities[key];
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: generateRandomValue(key as OptionType),
      };
    }
  }

  throw new Error("부 능력치 생성 실패");
};
// 자동 생성 함수 (무기용)
const generateWeaponOption = (): ISelectedOption => {
  const mainOption = { key: "atk", label: "공격력", value: "100" };
  const usedOptions: OptionType[] = [];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomWeaponSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "weapon",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};

// 자동 생성 함수 (투구용)
const generateHelmOption = (): ISelectedOption => {
  const mainOption = { key: "hp", label: "생명력", value: "540" };

  const usedOptions: OptionType[] = [];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomHelmSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "helm",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};

// 자동 생성 함수 (갑옷용)
const generateArmorOption = (): ISelectedOption => {
  const mainOption = { key: "def", label: "방어력", value: "60" };

  const usedOptions: OptionType[] = [];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomArmorSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "armor",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};
// 능력치 생성 함수 (목걸이용)
const generateRandomNeckMainOption = (): IOption => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const [key, probability] of Object.entries(
    neckMainOptionProbabilities,
  )) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: (mainOptionValues.neck as Record<OptionType, string>)[
          key as OptionType
        ],
      };
    }
  }

  throw new Error("주 능력치 생성 실패");
};

// 자동 생성 함수 (목걸이용)
const generateneckOption = (): ISelectedOption => {
  const mainOption = generateRandomNeckMainOption();
  const usedOptions: OptionType[] = [mainOption.key as OptionType];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomneckSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "neck",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};
// 능력치 생성 함수 (반지용)
const generateRandomRingMainOption = (): IOption => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const [key, probability] of Object.entries(
    ringMainOptionProbabilities,
  )) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: (mainOptionValues.ring as Record<OptionType, string>)[
          key as OptionType
        ],
      };
    }
  }

  throw new Error("주 능력치 생성 실패");
};

// 자동 생성 함수 (반지용)
const generateRingOption = (): ISelectedOption => {
  const mainOption = generateRandomRingMainOption();
  const usedOptions: OptionType[] = [mainOption.key as OptionType];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomringSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "ring",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};

// 능력치 생성 함수 (신발용)
const generateRandomBootMainOption = (): IOption => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const [key, probability] of Object.entries(
    bootMainOptionProbabilities,
  )) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return {
        key: key as OptionType,
        label: optionLabels[key as OptionType],
        value: (mainOptionValues.boot as Record<OptionType, string>)[
          key as OptionType
        ],
      };
    }
  }

  throw new Error("주 능력치 생성 실패");
};

// 자동 생성 함수 (신발용)
const generateBootOption = (): ISelectedOption => {
  const mainOption = generateRandomBootMainOption();
  const usedOptions: OptionType[] = [mainOption.key as OptionType];
  const subOptions = Array.from({ length: 4 }, () => {
    const option = generateRandomBootSubOption(usedOptions);
    usedOptions.push(option.key as OptionType);
    return option;
  });

  return {
    parts: "boot",
    mainOption: mainOption,
    subOption1: subOptions[0],
    subOption2: subOptions[1],
    subOption3: subOptions[2],
    subOption4: subOptions[3],
  };
};

// 랜덤 값 생성 함수 수정
const generateRandomValue = (optionType: OptionType): string => {
  let values, probabilities;

  switch (optionType) {
    case "atk":
      values = atkValues.values;
      probabilities = atkValues.probabilities;
      break;
    case "atkPercentage":
      values = atkPercentageValues.values;
      probabilities = atkPercentageValues.probabilities;
      break;
    case "def":
      values = defValues.values;
      probabilities = defValues.probabilities;
      break;
    case "defPercentage":
      values = defPercentageValues.values;
      probabilities = defPercentageValues.probabilities;
      break;
    case "hp":
      values = hpValues.values;
      probabilities = hpValues.probabilities;
      break;
    case "hpPercentage":
      values = hpPercentageValues.values;
      probabilities = hpPercentageValues.probabilities;
      break;
    case "spd":
      values = spdValues.values;
      probabilities = spdValues.probabilities;
      break;
    case "eff":
      values = effValues.values;
      probabilities = effValues.probabilities;
      break;
    case "efr":
      values = efrValues.values;
      probabilities = efrValues.probabilities;
      break;
    case "chc":
      values = chcValues.values;
      probabilities = chcValues.probabilities;
      break;
    case "chd":
      values = chdValues.values;
      probabilities = chdValues.probabilities;
      break;
    default:
      throw new Error("알 수 없는 옵션 타입");
  }

  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (let i = 0; i < values.length; i++) {
    cumulativeProbability += probabilities[i];
    if (random <= cumulativeProbability) {
      // 고정 수치 옵션과 퍼센트 옵션을 구분하여 처리
      if (["atk", "def", "hp", "spd"].includes(optionType)) {
        return values[i].toString();
      } else {
        return `${values[i]}%`;
      }
    }
  }

  throw new Error("값 생성 실패");
};

// 부위에 따른 자동 생성 함수 수정
export const generateAutoOption = (part: string): ISelectedOption => {
  switch (part) {
    case "weapon":
      return generateWeaponOption();
    case "helm":
      return generateHelmOption();
    case "armor":
      return generateArmorOption();
    case "neck":
      return generateneckOption();
    case "ring":
      return generateRingOption();
    case "boot":
      return generateBootOption();
    default:
      throw new Error("지원하지 않는 부위입니다.");
  }
};

const atkValues = {
  values: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
  probabilities: [
    6.103, 7.353, 7.353, 7.353, 7.353, 7.353, 7.353, 7.353, 7.353, 7.353, 7.353,
    7.353, 7.353, 5.662,
  ],
};

const atkPercentageValues = {
  values: [4, 5, 6, 7, 8],
  probabilities: [20, 20, 20, 20, 20],
};

const defValues = {
  values: [28, 29, 30, 31, 32, 33, 34, 35],
  probabilities: [
    14.265, 14.265, 14.265, 14.265, 14.265, 14.265, 14.265, 0.143,
  ],
};

const defPercentageValues = {
  values: [4, 5, 6, 7, 8],
  probabilities: [20, 20, 20, 20, 20],
};

const hpValues = {
  values: [
    157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
    172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186,
    187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201,
    202,
  ],
  probabilities: [
    1.133, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221,
    2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221,
    2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221,
    2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221, 2.221,
    2.221, 1.133,
  ],
};

const hpPercentageValues = {
  values: [4, 5, 6, 7, 8],
  probabilities: [20, 20, 20, 20, 20],
};

const spdValues = {
  values: [2, 3, 4, 5],
  probabilities: [33.223, 33.223, 33.223, 0.332],
};

const effValues = {
  values: [4, 5, 6, 7, 8],
  probabilities: [20, 20, 20, 20, 20],
};

const efrValues = {
  values: [4, 5, 6, 7, 8],
  probabilities: [20, 20, 20, 20, 20],
};

const chcValues = {
  values: [3, 4, 5],
  probabilities: [33.333, 33.333, 33.333],
};

const chdValues = {
  values: [4, 5, 6, 7],
  probabilities: [25, 25, 25, 25],
};
