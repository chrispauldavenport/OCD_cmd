'use strict';

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = {
  // Override the upload function
  async uploadFileAndPersist(fileData) {
    // First, use the default upload function to handle the upload
    await strapi.plugins.upload.services.upload.uploadFileAndPersist(fileData);

    // Define the path for the converted PNG image
    const pngImagePath = path.join(strapi.config.public.path, 'uploads', `${fileData.hash}.png`);

    // Convert the original image to PNG format
    sharp(fileData.path)
      .png()
      .toFile(pngImagePath, (err, info) => {
        if (err) {
          console.error('Error converting image to PNG:', err);
        } else {
          console.log('Image converted to PNG:', info);
        }
      });

    // Define the path for the resized image
    const resizedImagePath = path.join(strapi.config.public.path, 'uploads', `resized_${fileData.hash}.png`);

    // Create a resized version of the image
    sharp(fileData.path)
      .resize({ height: 100 }) // Resize the image to a height of 100px, maintaining aspect ratio
      .png() // Convert the resized image to PNG format
      .toFile(resizedImagePath, (err, info) => {
        if (err) {
          console.error('Error creating resized image:', err);
        } else {
          console.log('Resized image created:', info);
        }
      });
  },
};
