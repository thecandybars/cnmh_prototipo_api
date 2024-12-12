const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = process.env.PINATA_APIKEY;
const pinFileToIPFS = async (src, filename) => {
  const formData = new FormData();

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: filename,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pinFileToIPFS;
