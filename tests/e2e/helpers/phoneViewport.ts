export const phoneViewport = {
  width: 390,
  height: 844
};

export function setPhoneViewport() {
  Object.defineProperty(window, "innerWidth", { value: phoneViewport.width, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: phoneViewport.height, configurable: true });
  window.dispatchEvent(new Event("resize"));
}