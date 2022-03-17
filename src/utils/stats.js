export const calculateTopDays = (data, numberOfDays = 3) => {
  return data
    .sort((day1, day2) => day2.views - day1.views)
    .slice(0, numberOfDays);
}
