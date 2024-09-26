export const geOptionValueToName = (value: string) => {
  if (!value) return "";
  if (
    value.includes("공격력") ||
    value.includes("공격") ||
    value.includes("격력")
  )
    return "atk";
  if (
    value.includes("생명력") ||
    value.includes("생명") ||
    value.includes("명력")
  )
    return "hp";
  if (
    value.includes("방어력") ||
    value.includes("방어") ||
    value.includes("어력")
  )
    return "def";
  if (value.includes("속도")) return "spd";
  if (
    value.includes("치명확률") ||
    value.includes("치명") ||
    value.includes("명확") ||
    value.includes("확률")
  )
    return "chc";
  if (
    value.includes("치명피해") ||
    value.includes("치명") ||
    value.includes("명피") ||
    value.includes("피해")
  )
    return "chd";
  if (
    value.includes("효과적중") ||
    value.includes("효과적") ||
    value.includes("과적") ||
    value.includes("적중")
  )
    return "eff";
  if (
    value.includes("효과저항") ||
    value.includes("효과저") ||
    value.includes("과저") ||
    value.includes("저항")
  )
    return "efr";
  // const optionName = {
  //   공격력: "atk",
  //   생명력: "hp",
  //   방어력: "def",
  //   속도: "spd",
  //   치명확률: "chc",
  //   치명피해: "chd",
  //   효과적중: "eff",
  //   효과저항: "efr",
  // };

  // return optionName[value as keyof typeof optionName] || "";
};
export const geSetValueToName = (value: string) => {
  if (!value) return "";
  if (value.includes("속도")) return "set_speed";

  if (value.includes("분노")) return "set_rage";

  if (value.includes("흡혈")) return "set_vampire";

  if (value.includes("복수")) return "set_revenge";

  if (value.includes("치명")) return "set_cri";

  if (value.includes("협공")) return "set_coop";

  if (value.includes("상처")) return "set_scar";

  if (value.includes("저항")) return "set_res";

  if (value.includes("적중")) return "set_acc";

  if (value.includes("반격")) return "set_counter";

  if (value.includes("면역")) return "set_immune";

  if (value.includes("수호")) return "set_shield";

  if (value.includes("공격")) return "set_att";

  if (value.includes("격류")) return "set_torrent";

  if (value.includes("파멸")) return "set_cri_dmg";

  if (value.includes("방어")) return "set_def";

  if (value.includes("체력")) return "set_max_hp";

  if (value.includes("관통")) return "set_penetrate";

  return "";
};

export const options1 = [
  {
    label: "선택",
    value: "",
    set_qty: 0,
    set_desc: "",
  },
  {
    label: "흡혈의 세트",
    value: "set_vampire",
    set_qty: 4,
    set_desc: "공격 시 피해량의 20%만큼 생명력을 회복합니다.",
  },
  {
    label: "분노의 세트",
    value: "set_rage",
    set_qty: 4,
    set_desc: "공격 시 대상에게 약화효과가 있을경우 피해량이 30% 증가합니다.",
  },
  {
    label: "속도의 세트",
    value: "set_speed",
    set_qty: 4,
    set_desc: "속도가 25% 증가합니다.",
  },
  {
    label: "복수의 세트",
    value: "set_revenge",
    set_qty: 4,
    set_desc: "속도가 12% 증가하고, 잃은 생명력 1%당 0.5%씩 추가로 증가합니다.",
  },
  {
    label: "치명의 세트",
    value: "set_cri",
    set_qty: 2,
    set_desc: "치명확률이 12% 증가합니다.",
  },
  {
    label: "협공의 세트",
    value: "set_coop",
    set_qty: 2,
    set_desc: "협공 확률이 8% 증가합니다.",
  },

  {
    label: "상처의 세트",
    value: "set_scar",
    set_qty: 4,
    set_desc:
      "공격 후 피해량의 대상의 최대 생명력을 6%(단일 공격 시 12%) 까지 감소시킵니다.",
  },
  {
    label: "저항의 세트",
    value: "set_res",
    set_qty: 2,
    set_desc: "효과저항이 20% 증가합니다.",
  },
  {
    label: "적중의 세트",
    value: "set_acc",
    set_qty: 2,
    set_desc: "효과적중이 20% 증가합니다.",
  },
  {
    label: "반격의 세트",
    value: "set_counter",
    set_qty: 4,
    set_desc: "피격 시 30%의 확률로 반격합니다.",
  },
  {
    label: "수호의 세트",
    value: "set_shield",
    set_qty: 4,
    set_desc:
      "전투 시작 시 자신의 최대 생명력의 12%만큼 아군 전체에게 2턴간 보호막을 발생시킵니다.",
  },
  {
    label: "면역의 세트",
    value: "set_immune",
    set_qty: 2,
    set_desc:
      "전투 시작 시 자신에게 1턴간 면역 효과를 발생시킵니다. 동일한 세트효과와 중복되지 않습니다.",
  },
  {
    label: "격류의 세트",
    value: "set_torrent",
    set_qty: 2,
    set_desc: "생명력이 10% 감소하고 공격 시 피해량이 10% 증가합니다.",
  },
  {
    label: "공격의 세트",
    value: "set_att",
    set_qty: 4,
    set_desc: "공격력이 45% 증가합니다.",
  },
  {
    label: "파멸의 세트",
    value: "set_cri_dmg",
    set_qty: 4,
    set_desc: "치명피해가 60% 증가합니다.",
  },
  {
    label: "방어의 세트",
    value: "set_def",
    set_qty: 2,
    set_desc: "방어력이 20% 증가합니다.",
  },
  {
    label: "체력의 세트",
    value: "set_max_hp",
    set_qty: 2,
    set_desc: "생명력이 20% 증가합니다.",
  },
  {
    label: "관통의 세트",
    value: "set_penetrate",
    set_qty: 2,
    set_desc:
      "단일 공격 시 대상의 방어력을 15% 관통합니다. 동일한 세트효과와 중복되지 않습니다.",
  },
];
export const options2 = [
  {
    value: "",
    name_en: "select",
    label: "선택",
  },
  {
    value: "atk",
    name_en: "attack_valid ",
    label: "공격력",
  },
  {
    value: "hp",
    name_en: "health_valid",
    label: "생명력",
  },
  {
    value: "def",
    name_en: "defense_valid",
    label: "방어력",
  },
  {
    value: "spd",
    name_en: "speed_valid",
    label: "속도",
  },
  {
    value: "chd",
    name_en: "critical_damage_valid",
    label: "치명피해",
  },
  {
    value: "chc",
    name_en: "critical_chance_valid",
    label: "치명확률",
  },
  {
    value: "eff",

    name_en: "effectiveness_valid",
    label: "효과적중",
  },
  {
    value: "efr",
    name_en: "effect_registance_valid",
    label: "효과저항",
  },
];

export const mock = {
  recommendations: [
    {
      hero_id: "c2106",
      name: "용의 반려 셰나",
      score: 34.8,
      grade: "5",
    },
    {
      hero_id: "c2012",
      name: "어둠의 코르부스",
      score: 33.2,
      grade: "5",
    },
    {
      hero_id: "c1131",
      name: "율하",
      score: 31.2,
      grade: "5",
    },
    {
      hero_id: "c2002",
      name: "나락의 세실리아",
      score: 29.9,
      grade: "5",
    },
    {
      hero_id: "c1156",
      name: "알베도",
      score: 28.5,
      grade: "5",
    },
    {
      hero_id: "c2070",
      name: "라스트 라이더 크라우",
      score: 28.2,
      grade: "5",
    },
    {
      hero_id: "c1070",
      name: "크라우",
      score: 27.6,
      grade: "5",
    },
    {
      hero_id: "c1159",
      name: "라이아",
      score: 27.4,
      grade: "5",
    },
    {
      hero_id: "c2042",
      name: "야심가 타이윈",
      score: 26.5,
      grade: "5",
    },
    {
      hero_id: "c5149",
      name: "레테",
      score: 26.4,
      grade: "5",
    },
    {
      hero_id: "c1042",
      name: "타이윈",
      score: 25.6,
      grade: "5",
    },
    {
      hero_id: "c2073",
      name: "조율자 카웨릭",
      score: 25.6,
      grade: "5",
    },
    {
      hero_id: "c1102",
      name: "로앤나",
      score: 25.3,
      grade: "5",
    },
    {
      hero_id: "c1022",
      name: "빛의 루엘",
      score: 24.2,
      grade: "5",
    },
    {
      hero_id: "c2022",
      name: "데스티나",
      score: 24,
      grade: "5",
    },
    {
      hero_id: "c2019",
      name: "화란의 라비",
      score: 23.7,
      grade: "5",
    },
    {
      hero_id: "c1100",
      name: "알렌시아",
      score: 23.4,
      grade: "5",
    },
    {
      hero_id: "c1036",
      name: "크로제",
      score: 27.7,
      grade: "4",
    },
    {
      hero_id: "c2036",
      name: "무법자 크로제",
      score: 27.3,
      grade: "4",
    },
    {
      hero_id: "c2035",
      name: "대장 퍼지스",
      score: 26.9,
      grade: "4",
    },
    {
      hero_id: "c1062",
      name: "안젤리카",
      score: 26.3,
      grade: "4",
    },
    {
      hero_id: "c1107",
      name: "키즈나 아이",
      score: 24.1,
      grade: "4",
    },
    {
      hero_id: "c1017",
      name: "아카테스",
      score: 23.4,
      grade: "4",
    },
    {
      hero_id: "c3002",
      name: "타라노르 왕궁병사",
      score: 30.5,
      grade: "3",
    },
    {
      hero_id: "c4004",
      name: "자유기사 아로웰",
      score: 29.9,
      grade: "3",
    },
    {
      hero_id: "c5001",
      name: "모험가 라스",
      score: 26.2,
      grade: "3",
    },
    {
      hero_id: "c3004",
      name: "아로웰",
      score: 25.9,
      grade: "3",
    },
    {
      hero_id: "c4044",
      name: "마법학자 도리스",
      score: 25.4,
      grade: "3",
    },
    {
      hero_id: "c1001",
      name: "라스",
      score: 24.8,
      grade: "3",
    },
    {
      hero_id: "c3104",
      name: "소니아",
      score: 23.5,
      grade: "3",
    },
  ],
  total_recommendations: 30,
};
