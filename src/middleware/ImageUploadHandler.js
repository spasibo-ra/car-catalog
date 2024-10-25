import path from 'node:path';
import fs from 'node:fs';
import formidable from 'formidable';

const __dirname = path.resolve();


export const imageUploadHandler = (imagePath) => async (req, res, next) => {
  try {

      const uploadDir = path.join(__dirname, `public/uploads/${imagePath}`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      } 

    const form = formidable({
      multiples: false,
      uploadDir: path.join(__dirname, `public/uploads/${imagePath}`),
      keepExtensions: true,
      allowEmptyFiles: true
    });

    let imageUrl = '';
    let formData = {};

    form.parse(req, async (err, fields, files) => {
      if (Object.keys(files).length && err) {
        console.error('Formidable error:', err);
        // return res.status(500).render('error', { title: 'Error', message: 'Failed to upload image' });
      }
      Object
        .entries(fields)
        .forEach(([key, [value]]) => formData[key] = value)

      if (Object.keys(files).length) {
      const [imageFile] = files.image;
        const oldPath = imageFile.filepath;
        const newFileName = Date.now() + path.extname(imageFile.originalFilename);
        const newPath = path.join(form.uploadDir, newFileName);
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).render('error', { title: 'Error', message: 'Failed to move uploaded image' });
          }
        });
        imageUrl = `/uploads/${imagePath}/${newFileName}`;

      }
      res.locals = Object.assign({}, res.locals, { formData, imageUrl });
      next()
    })
  } catch (err) {
    next(err)
  }
}