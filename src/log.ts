let enabled = false;

export const enableLogger = () => {
  enabled = true;
}

export const disableLogger = () => {
  enabled = false;
}

export const log = (message: string): void => {
  if (enabled) {
    console.log(message);
  }
}
