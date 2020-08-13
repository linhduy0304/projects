export const getDayOptions = (data) => {
  // 初始化天数数据
  const dayOptions = [];

  for (let i = 1; i < 32; i++) {
    dayOptions.push({
      label: `${i}`,
      value: i.toString(),
      enabled: false
    });
  }

  if (data) {
    const date = data.split('-');
    const days = new Date(date[0], date[1], 0).getDate();
    for (let k = 0; k < days; k++){
      dayOptions[k].enabled = true;
    }
  }
  return dayOptions;
};

export const getDayOptionsLunar = (data) => {
  // 初始化天数数据
  const dayOptions = [];

  for (let i = 1; i < 31; i++) {
    dayOptions.push({
      label: `${i}`,
      value: i.toString(),
      enabled: false
    });
  }

  if (data) {
    const date = data.split('-');
    const days = new Date(date[0], date[1], 0).getDate();
    for (let k = 0; k < days; k++){
      dayOptions[k].enabled = true;
    }
  }
  return dayOptions;
};
