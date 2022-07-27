import crypto from 'crypto-js';

const encrypt = async () => {
  const key = 'abcdefgh';
  const secret = '';
  const ciphertext = '';

  const getCiphertext = crypto.AES.encrypt(secret, key).toString();
  const byte = crypto.AES.decrypt(ciphertext, key);
  const getSecret = byte.toString(crypto.enc.Utf8);

  return {
    getCiphertext,
    getSecret,
  };
};

encrypt()
  .then((res) => {
    console.log({ res });
  })
  .catch((er) => {
    console.error(er);
    process.exit(-1);
  })
  .finally(async () => {
    process.exit();
  });
