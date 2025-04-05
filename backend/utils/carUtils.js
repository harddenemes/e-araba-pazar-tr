
exports.calculateBatteryHealth = (km, newRange) => {
  // Calculate battery health as a percentage
  // Formula: 100 - ((usedKm / newRange) * 20)
  const batteryHealth = Math.round(100 - ((km / newRange) * 20));
  
  // Ensure the value is between 0 and 100
  return Math.max(0, Math.min(100, batteryHealth));
};
