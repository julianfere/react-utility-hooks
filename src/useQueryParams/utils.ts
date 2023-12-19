export const castValue = <T>(value: string) => {
  let castedValue;

  if (value === "true") castedValue = true;
  if (value === "false") castedValue = false;
  if (value === "null") castedValue = null;
  if (value === "undefined") castedValue = undefined;
  if (value === "") castedValue = undefined;

  try {
    if (JSON.parse(value)) castedValue = JSON.parse(value);
  } catch (e) {}

  if (!isNaN(Number(value))) castedValue = Number(value);

  return (castedValue ?? value) as T;
};
