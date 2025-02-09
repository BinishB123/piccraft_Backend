import sharp from 'sharp'



async function sharpImages(image, imagesDatas) {
    try {

        const croppedImage = await sharp(image.buffer)
            .extract({
                left: imagesDatas.crop.x,
                top: imagesDatas.crop.y,
                width: imagesDatas.crop.width,
                height: imagesDatas.crop.height
            })
            .toBuffer();

        console.log('Image cropped successfully!', croppedImage.length);
        return { file: croppedImage };

    } catch (error) {
        console.error("Error cropping image:", error);
    }
}


export default sharpImages