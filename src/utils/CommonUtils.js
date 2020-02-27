/**
 * Math.random deve ser único devido ao seu algoritmo de propagação.
 * Converta-o na base 36 (números + letras) e pegue os 9 primeiros caracteres após o decimal.
 */

export const generateUniqueId = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const validateEmail = email => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * This function waits for a specified time and returns.
 * @param {*} timeout
 */
export const wait = timeout => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout);
  });
};
